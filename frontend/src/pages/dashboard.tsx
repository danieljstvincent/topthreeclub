import Head from 'next/head';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeatMeter from '@/components/dashboard/HeatMeter';
import BrainDumpModal from '@/components/dashboard/BrainDumpModal';
import BrainDumpFAB from '@/components/dashboard/BrainDumpFAB';
import { apiClient } from '@/lib/api';

interface User {
  id: number;
  username: string;
  email: string;
}

interface QuestProgress {
  date: string;
  quest_1_text: string;
  quest_2_text: string;
  quest_3_text: string;
  quest_1_completed: boolean;
  quest_2_completed: boolean;
  quest_3_completed: boolean;
  submitted?: boolean;
  submitted_at?: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [streak, setStreak] = useState(0);
  const [totalXP, setTotalXP] = useState(0);
  const [heatLevel, setHeatLevel] = useState(0);
  const [quests, setQuests] = useState(['', '', '']);
  const [completed, setCompleted] = useState([false, false, false]);
  const [syncing, setSyncing] = useState(false);
  const [submittedToday, setSubmittedToday] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [brainDumpOpen, setBrainDumpOpen] = useState(false);
  const [viewingTomorrow, setViewingTomorrow] = useState(false);

  const STORAGE_KEY = 'topthree_data';
  const QUESTS_KEY = 'topthree_quests';
  const QUESTS_TOMORROW_KEY = 'topthree_quests_tomorrow';
  const SUBMISSION_KEY = 'topthree_submission';

  function loadData() {
    if (typeof window === 'undefined') return {};
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  }

  function saveData(data: any) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function loadQuests() {
    if (typeof window === 'undefined') return ['', '', ''];
    const stored = localStorage.getItem(QUESTS_KEY);
    return stored ? JSON.parse(stored) : ['', '', ''];
  }

  function saveQuests(quests: string[]) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(QUESTS_KEY, JSON.stringify(quests));
  }

  function loadTomorrowQuests() {
    if (typeof window === 'undefined') return ['', '', ''];
    const stored = localStorage.getItem(QUESTS_TOMORROW_KEY);
    return stored ? JSON.parse(stored) : ['', '', ''];
  }

  function saveTomorrowQuests(quests: string[]) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(QUESTS_TOMORROW_KEY, JSON.stringify(quests));
  }

  function getTodayKey() {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  }

  function getTomorrowKey() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, '0')}-${String(tomorrow.getDate()).padStart(2, '0')}`;
  }

  function calculateHeatLevel(data: any, currentStreak: number): number {
    // If actively building streak: cap at level 5
    if (currentStreak > 0) {
      return Math.min(currentStreak, 5);
    }

    // If no streak: check for cooldown regression
    const today = new Date();
    let peakStreak = 0;
    let daysSincePeak = 0;

    // Look back up to 10 days to find peak streak
    for (let i = 1; i <= 10; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      const dateKey = `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, '0')}-${String(checkDate.getDate()).padStart(2, '0')}`;

      if (data[dateKey]) {
        const completedCount = data[dateKey].completed.filter((c: boolean) => c).length;
        if (completedCount === 3) {
          // Found completed day, count consecutive streak from there
          let tempStreak = 0;
          for (let j = i; j <= 10; j++) {
            const streakDate = new Date(today);
            streakDate.setDate(today.getDate() - j);
            const streakKey = `${streakDate.getFullYear()}-${String(streakDate.getMonth() + 1).padStart(2, '0')}-${String(streakDate.getDate()).padStart(2, '0')}`;
            if (data[streakKey]?.completed.filter((c: boolean) => c).length === 3) {
              tempStreak++;
            } else {
              break;
            }
          }
          peakStreak = Math.max(peakStreak, tempStreak);
          daysSincePeak = i;
          break;
        }
      }
    }

    // Apply cooldown: if reached level 5, cool down by 1 level per missed day
    if (peakStreak >= 5) {
      return Math.max(0, 5 - daysSincePeak);
    }

    return 0;
  }

  useEffect(() => {
    checkAuth();

    // Check if we should auto-open brain dump from URL parameter
    const params = new URLSearchParams(window.location.search);
    if (params.get('openBrainDump') === 'true') {
      setBrainDumpOpen(true);
      // Clean up URL parameter
      window.history.replaceState({}, '', '/dashboard');
    }
  }, []);

  const checkAuth = async () => {
    try {
      const result = await apiClient.getCurrentUser();
      if (result.data) {
        setUser(result.data);
        setIsAuthenticated(true);
        syncFromServer();
      }
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  function checkSubmittedToday() {
    if (typeof window === 'undefined') return false;
    const submissionData = localStorage.getItem(SUBMISSION_KEY);
    if (!submissionData) return false;
    const submission = JSON.parse(submissionData);
    const todayKey = getTodayKey();
    return submission.date === todayKey && submission.submitted === true;
  }

  useEffect(() => {
    const loadedQuests = loadQuests();
    setQuests(loadedQuests);
    const data = loadData();
    const todayKey = getTodayKey();
    const todayData = data[todayKey] || { completed: [false, false, false] };
    setCompleted(todayData.completed);
    const submitted = checkSubmittedToday();
    setSubmittedToday(submitted);
    updateStats();
  }, []);

  const updateStats = useCallback(() => {
    const data = loadData();
    const dates = Object.keys(data).sort().reverse();
    let newTotalXP = 0;
    const today = new Date();

    for (const dateKey of dates) {
      const completedCount = data[dateKey].completed.filter((c: boolean) => c).length;
      newTotalXP += completedCount;
    }

    let newStreak = 0;
    for (let i = 0; i < dates.length; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      const dateKey = `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, '0')}-${String(checkDate.getDate()).padStart(2, '0')}`;

      if (data[dateKey]) {
        const completedCount = data[dateKey].completed.filter((c: boolean) => c).length;
        if (completedCount === 3) {
          newStreak++;
        } else {
          break;
        }
      } else {
        break;
      }
    }

    // Calculate heat level
    const calculatedHeatLevel = calculateHeatLevel(data, newStreak);
    setHeatLevel(calculatedHeatLevel);

    setStreak(newStreak);
    setTotalXP(newTotalXP);
  }, []);

  const toggleQuest = (questIndex: number) => {
    const data = loadData();
    const todayKey = getTodayKey();

    if (!data[todayKey]) {
      data[todayKey] = { completed: [false, false, false] };
    }

    const newCompleted = [...completed];
    newCompleted[questIndex] = !newCompleted[questIndex];
    data[todayKey].completed[questIndex] = newCompleted[questIndex];
    
    setCompleted(newCompleted);
    saveData(data);
    updateStats();

    if (isAuthenticated) {
      syncToServer();
    }
  };

  const toggleView = () => {
    if (viewingTomorrow) {
      // Switch to today
      saveTomorrowQuests(quests); // Save current edits to tomorrow
      setQuests(loadQuests()); // Load today's quests
      setCompleted([false, false, false]); // Reset completed for today's view
      setViewingTomorrow(false);
    } else {
      // Switch to tomorrow
      saveQuests(quests); // Save current edits to today
      setQuests(loadTomorrowQuests()); // Load tomorrow's quests
      setCompleted([false, false, false]); // Tomorrow hasn't been completed yet
      setViewingTomorrow(true);
    }
  };

  const handleQuestTextChange = (questIndex: number, text: string) => {
    const newQuests = [...quests];
    newQuests[questIndex] = text;
    setQuests(newQuests);

    // Save to appropriate storage based on view
    if (viewingTomorrow) {
      saveTomorrowQuests(newQuests);
    } else {
      saveQuests(newQuests);
    }

    if (isAuthenticated) {
      syncToServer();
    }
  };

  const syncToServer = async () => {
    if (!isAuthenticated) return;
    try {
      const todayKey = getTodayKey();
      await apiClient.saveTodayQuest({
        date: todayKey,
        quest_1_text: quests[0],
        quest_2_text: quests[1],
        quest_3_text: quests[2],
        quest_1_completed: completed[0],
        quest_2_completed: completed[1],
        quest_3_completed: completed[2],
      });
    } catch (error) {
      console.error('Failed to sync to server:', error);
    }
  };

  const syncFromServer = async () => {
    if (!isAuthenticated) return;
    try {
      const todayResult = await apiClient.getTodayQuest();
      if (todayResult.data) {
        const today = todayResult.data as QuestProgress;
        setQuests([today.quest_1_text || '', today.quest_2_text || '', today.quest_3_text || '']);
        setCompleted([today.quest_1_completed || false, today.quest_2_completed || false, today.quest_3_completed || false]);
        saveQuests([today.quest_1_text || '', today.quest_2_text || '', today.quest_3_text || '']);
        if (today.submitted) {
          const todayKey = getTodayKey();
          localStorage.setItem(SUBMISSION_KEY, JSON.stringify({
            date: todayKey,
            submitted: true,
            timestamp: today.submitted_at || new Date().toISOString()
          }));
          setSubmittedToday(true);
        }
      }
      const statsResult = await apiClient.getQuestStats();
      if (statsResult.data) {
        setStreak(statsResult.data.streak || 0);
        setTotalXP(statsResult.data.total_xp || 0);
      }
    } catch (error) {
      console.error('Failed to sync from server:', error);
    }
  };

  const handleLogout = async () => {
    await apiClient.logout();
    setUser(null);
    setIsAuthenticated(false);
    router.push('/');
  };

  const handleSelectBrainDumpIdea = (text: string) => {
    // Find first empty quest slot
    const emptyIndex = quests.findIndex((q) => !q.trim());
    if (emptyIndex !== -1) {
      const newQuests = [...quests];
      newQuests[emptyIndex] = text;
      setQuests(newQuests);

      // Save to appropriate storage based on view
      if (viewingTomorrow) {
        saveTomorrowQuests(newQuests);
      } else {
        saveQuests(newQuests);

        if (isAuthenticated) {
          syncToServer();
        }
      }

      // If all 3 are now filled, close brain dump
      if (newQuests.every((q) => q.trim())) {
        setBrainDumpOpen(false);
      }
    } else {
      // All slots filled - notify user
      const dayLabel = viewingTomorrow ? "tomorrow's" : "today's";
      alert(`Your Top 3 for ${dayLabel} are full! Complete or clear one first.`);
    }
  };

  const handleSubmit = async () => {
    if (submittedToday) {
      alert('You have already submitted today!');
      return;
    }

    setSubmitting(true);
    try {
      if (isAuthenticated) {
        await syncToServer();
        const result = await apiClient.submitQuest();
        if (result.error) {
          if (result.error.includes('already submitted')) {
            setSubmittedToday(true);
            alert('You have already submitted today!');
            return;
          }
          throw new Error(result.error);
        }
      }

      const todayKey = getTodayKey();
      localStorage.setItem(SUBMISSION_KEY, JSON.stringify({
        date: todayKey,
        submitted: true,
        timestamp: new Date().toISOString()
      }));

      setSubmittedToday(true);
      alert('Locked in! You did it. That\'s enough for today. 🎉');
      updateStats();
    } catch (error) {
      console.error('Failed to submit:', error);
      alert('Failed to submit. Please try again.');
      localStorage.removeItem(SUBMISSION_KEY);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Dashboard - 3 Top Three Club</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Navbar user={user} isAuthenticated={isAuthenticated} onLogout={handleLogout} />

        <div className="pt-20 pb-12">
          <div className="section-container">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Momentum</p>
                    <p className="text-3xl font-bold text-gray-900">{streak}</p>
                    <p className="text-xs text-gray-500 mt-1">days rolling</p>
                  </div>
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🔥</span>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Wins</p>
                    <p className="text-3xl font-bold text-gray-900">{totalXP}</p>
                    <p className="text-xs text-gray-500 mt-1">tasks crushed</p>
                  </div>
                  <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">✓</span>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Today&apos;s Score</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {completed.filter(c => c).length}/3
                    </p>
                    <p className="text-xs text-gray-500 mt-1">done today</p>
                  </div>
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📊</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Heat Meter */}
            <HeatMeter
              heatLevel={heatLevel}
              currentStreak={streak}
              className="mb-8"
            />

            {/* Your Top 3 */}
            <div className="card p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {viewingTomorrow ? 'Your Top 3 Tomorrow' : 'Your Top 3 Today'}
                  </h2>
                  {viewingTomorrow && (
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full">
                      Planning Ahead
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleView}
                    className="btn-secondary py-2 px-4 text-sm"
                  >
                    {viewingTomorrow ? '← Back to Today' : 'Plan Tomorrow →'}
                  </button>
                  {isAuthenticated && !viewingTomorrow && (
                    <button
                      onClick={syncFromServer}
                      disabled={syncing}
                      className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                    >
                      {syncing ? 'Syncing...' : 'Sync'}
                    </button>
                  )}
                </div>
              </div>

              {!viewingTomorrow && completed.filter(c => c).length === 3 ? (
                // Completion message when all 3 are done (only for today)
                <div className="text-center py-12">
                  <div className="mb-6">
                    <span className="text-6xl">🎉</span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-3">You did it!</h3>
                  <p className="text-lg text-gray-600 mb-8">
                    Your Top 3 are done. That&apos;s enough.
                  </p>
                  <p className="text-sm text-gray-500">
                    Tomorrow&apos;s a new day. Three new things.
                  </p>
                </div>
              ) : (
                // Show habit list when not all completed
                <div className="space-y-4">
                  {[0, 1, 2].map((index) => (
                    <div
                      key={index}
                      className={`flex items-center space-x-4 p-4 rounded-lg border-2 transition-all ${
                        completed[index]
                          ? 'bg-success-50 border-success-200'
                          : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {!viewingTomorrow && (
                        <button
                          onClick={() => toggleQuest(index)}
                          className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                            completed[index]
                              ? 'bg-success-500 border-success-500'
                              : 'bg-white border-gray-300 hover:border-primary-400'
                          }`}
                        >
                          {completed[index] && (
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                      )}
                      <input
                        type="text"
                        value={quests[index]}
                        onChange={(e) => handleQuestTextChange(index, e.target.value)}
                        placeholder={
                          viewingTomorrow
                            ? (index === 0 ? "What's the most important thing tomorrow?" :
                               index === 1 ? "What's the second-most important?" :
                               "What's the third?")
                            : (index === 0 ? "What's the most important thing today?" :
                               index === 1 ? "What's the second-most important?" :
                               "What's the third?")
                        }
                        className={`flex-1 bg-transparent border-none outline-none text-gray-900 placeholder-gray-400 ${
                          completed[index] ? 'line-through text-gray-500' : ''
                        }`}
                      />
                    </div>
                  ))}
                </div>
              )}

              {!viewingTomorrow && (
                <button
                  onClick={handleSubmit}
                  disabled={submitting || submittedToday || completed.filter(c => c).length < 3}
                  className={`mt-6 w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                    submittedToday
                      ? 'bg-success-500 text-white cursor-not-allowed'
                      : completed.filter(c => c).length === 3
                      ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-md hover:shadow-lg'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {submitting
                    ? 'Locking in...'
                    : submittedToday
                    ? '✓ Locked In'
                    : completed.filter(c => c).length === 3
                    ? 'Lock It In'
                    : 'Pick your 3 first'}
                </button>
              )}
              {viewingTomorrow && (
                <div className="mt-6 p-4 bg-primary-50 rounded-lg text-center">
                  <p className="text-sm text-primary-700">
                    ✨ Planning ahead reduces tomorrow's decision fatigue
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <Footer />

        {/* Brain Dump Modal */}
        <BrainDumpModal
          isOpen={brainDumpOpen}
          onClose={() => setBrainDumpOpen(false)}
          onSelectIdea={handleSelectBrainDumpIdea}
          isAuthenticated={isAuthenticated}
        />

        {/* Floating Action Button */}
        <BrainDumpFAB onClick={() => setBrainDumpOpen(true)} />
      </div>
    </>
  );
}






