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
  date_joined?: string;
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
  choices_locked?: boolean;
  choices_locked_at?: string;
}

interface QuestHistoryEntry {
  date: string;
  completed: boolean;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [streak, setStreak] = useState(0);
  const [momentumHours, setMomentumHours] = useState(0);
  const [displayedMomentumHours, setDisplayedMomentumHours] = useState(0);
  const [isAnimatingMomentum, setIsAnimatingMomentum] = useState(false);
  const [totalXP, setTotalXP] = useState(0);
  const [displayedTotalXP, setDisplayedTotalXP] = useState(0);
  const [isAnimatingXP, setIsAnimatingXP] = useState(false);
  const [heatLevel, setHeatLevel] = useState(0);
  const [quests, setQuests] = useState(['', '', '']);
  const [completed, setCompleted] = useState([false, false, false]);
  const [errors, setErrors] = useState(['', '', '']);
  const [syncing, setSyncing] = useState(false);
  const [submittedToday, setSubmittedToday] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [brainDumpOpen, setBrainDumpOpen] = useState(false);
  const [viewingTomorrow, setViewingTomorrow] = useState(false);
  const [questHistory, setQuestHistory] = useState<QuestHistoryEntry[]>([]);
  const [accountCreatedDate, setAccountCreatedDate] = useState<string>('');
  const [choicesLocked, setChoicesLocked] = useState(false);
  const [lockingChoices, setLockingChoices] = useState(false);

  const STORAGE_KEY = 'topthree_data';
  const QUESTS_KEY = 'topthree_quests';
  const QUESTS_TOMORROW_KEY = 'topthree_quests_tomorrow';
  const SUBMISSION_KEY = 'topthree_submission';
  const CHOICES_LOCKED_KEY = 'topthree_choices_locked';

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

  function loadChoicesLocked() {
    if (typeof window === 'undefined') return false;
    const stored = localStorage.getItem(CHOICES_LOCKED_KEY);
    if (!stored) return false;
    const data = JSON.parse(stored);
    const todayKey = getTodayKey();
    return data.date === todayKey && data.locked === true;
  }

  function saveChoicesLocked(locked: boolean) {
    if (typeof window === 'undefined') return;
    const todayKey = getTodayKey();
    localStorage.setItem(CHOICES_LOCKED_KEY, JSON.stringify({
      date: todayKey,
      locked: locked,
      timestamp: new Date().toISOString()
    }));
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

  const fetchQuestHistory = useCallback(async () => {
    try {
      const historyResult = await apiClient.getQuestHistory();
      if (historyResult.data) {
        setQuestHistory(historyResult.data);
      }
    } catch (error) {
      // If quest history fails, leave defaults; dashboard still functions
    }

    if (user?.date_joined) {
      setAccountCreatedDate(user.date_joined);
    }
  }, [user]);

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
    const locked = loadChoicesLocked();
    setChoicesLocked(locked);
    updateStats();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchQuestHistory();
    }
  }, [isAuthenticated, fetchQuestHistory]);

  const updateStats = useCallback(() => {
    const data = loadData();
    const dates = Object.keys(data).sort().reverse();
    let newTotalXP = 0;
    const today = new Date();
    let streakStartDate: Date | null = null;

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
          streakStartDate = new Date(checkDate);
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
    if (newStreak > 0 && streakStartDate) {
      const startOfDay = new Date(streakStartDate);
      startOfDay.setHours(0, 0, 0, 0);
      const hours = Math.max(
        0,
        Math.floor((Date.now() - startOfDay.getTime()) / (1000 * 60 * 60))
      );
      setMomentumHours(hours);
    } else {
      setMomentumHours(0);
    }
    setTotalXP(newTotalXP);
  }, []);

  // Slot machine animation effect for momentum hours
  useEffect(() => {
    if (momentumHours === 0) {
      setDisplayedMomentumHours(0);
      setIsAnimatingMomentum(false);
      return;
    }

    // Only animate on first load or when value significantly changes
    const shouldAnimate = displayedMomentumHours === 0 && momentumHours > 0;

    if (!shouldAnimate) {
      setDisplayedMomentumHours(momentumHours);
      return;
    }

    setIsAnimatingMomentum(true);
    let currentValue = 0;
    const targetValue = momentumHours;

    const animate = () => {
      currentValue++;
      const remaining = targetValue - currentValue;

      setDisplayedMomentumHours(currentValue);

      if (currentValue >= targetValue) {
        setIsAnimatingMomentum(false);
        return;
      }

      // Slow down when 7 or fewer numbers away
      let delay;
      if (remaining <= 7) {
        // Progressively slower as we get closer
        delay = 100 + (7 - remaining) * 50; // 100ms to 450ms
      } else {
        // Fast scrolling when more than 7 away
        delay = 30;
      }

      setTimeout(animate, delay);
    };

    // Start the animation
    setTimeout(animate, 30);
  }, [momentumHours]);

  // Slot machine animation effect for total XP
  useEffect(() => {
    if (totalXP === 0) {
      setDisplayedTotalXP(0);
      setIsAnimatingXP(false);
      return;
    }

    // Only animate on first load or when value significantly changes
    const shouldAnimate = displayedTotalXP === 0 && totalXP > 0;

    if (!shouldAnimate) {
      setDisplayedTotalXP(totalXP);
      return;
    }

    setIsAnimatingXP(true);
    let currentValue = 0;
    const targetValue = totalXP;

    const animate = () => {
      currentValue++;
      const remaining = targetValue - currentValue;

      setDisplayedTotalXP(currentValue);

      if (currentValue >= targetValue) {
        setIsAnimatingXP(false);
        return;
      }

      // Slow down when 7 or fewer numbers away
      let delay;
      if (remaining <= 7) {
        // Progressively slower as we get closer
        delay = 100 + (7 - remaining) * 50; // 100ms to 450ms
      } else {
        // Fast scrolling when more than 7 away
        delay = 30;
      }

      setTimeout(animate, delay);
    };

    // Start the animation
    setTimeout(animate, 30);
  }, [totalXP]);

  const toggleQuest = (questIndex: number) => {
    const questText = quests[questIndex].trim();

    // If trying to CHECK a task (currently unchecked)
    if (!completed[questIndex]) {
      // Validate: must have at least 1 character
      if (questText.length === 0) {
        // Show error
        const newErrors = [...errors];
        newErrors[questIndex] = 'Please enter a task before checking it off';
        setErrors(newErrors);
        return; // Don't toggle
      }
    }

    // Clear any error for this task
    const newErrors = [...errors];
    newErrors[questIndex] = '';
    setErrors(newErrors);

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
      const locked = loadChoicesLocked();
      setChoicesLocked(locked);
      setViewingTomorrow(false);
    } else {
      // Switch to tomorrow
      saveQuests(quests); // Save current edits to today
      setQuests(loadTomorrowQuests()); // Load tomorrow's quests
      setCompleted([false, false, false]); // Tomorrow hasn't been completed yet
      setChoicesLocked(false); // Tomorrow never has locked state
      setViewingTomorrow(true);
    }
  };

  const handleQuestTextChange = (questIndex: number, text: string) => {
    const newQuests = [...quests];
    const oldText = newQuests[questIndex];
    newQuests[questIndex] = text;
    setQuests(newQuests);

    // Clear error when user types
    if (errors[questIndex]) {
      const newErrors = [...errors];
      newErrors[questIndex] = '';
      setErrors(newErrors);
    }

    // If text changed and choices were locked, unlock them
    if (choicesLocked && oldText !== text) {
      setChoicesLocked(false);
      saveChoicesLocked(false);
    }

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

        // Sync choices locked state
        const locked = today.choices_locked || false;
        setChoicesLocked(locked);
        saveChoicesLocked(locked);

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
        const serverMomentumHours = statsResult.data.momentum_hours;
        if (typeof serverMomentumHours === 'number') {
          setMomentumHours(serverMomentumHours);
        } else if (statsResult.data.streak) {
          setMomentumHours(statsResult.data.streak * 24);
        } else {
          setMomentumHours(0);
        }
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

  const handleLockChoices = async () => {
    setLockingChoices(true);
    try {
      if (isAuthenticated) {
        // First sync current quests to server
        await syncToServer();

        // Then lock the choices
        const result = await apiClient.lockChoices();
        if (result.error) {
          throw new Error(result.error);
        }
      }

      // Update local state
      setChoicesLocked(true);
      saveChoicesLocked(true);

    } catch (error) {
      console.error('Failed to lock choices:', error);
      alert('Failed to lock in choices. Please try again.');
    } finally {
      setLockingChoices(false);
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
                    <p
                      key={displayedMomentumHours}
                      className={`text-3xl font-bold text-gray-900 ${isAnimatingMomentum ? 'animate-slot-roll' : ''}`}
                    >
                      {displayedMomentumHours}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">hours rolling</p>
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
                    <p
                      key={displayedTotalXP}
                      className={`text-3xl font-bold text-gray-900 ${isAnimatingXP ? 'animate-slot-roll' : ''}`}
                    >
                      {displayedTotalXP}
                    </p>
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
              questHistory={questHistory}
              accountCreatedDate={accountCreatedDate}
              className="mb-8"
            />

            {/* Perfect Days - All 3 Tasks Completed */}
            {questHistory.filter(q => q.completed).length > 0 && (
              <div className="card p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      Perfect Days
                    </h3>
                    <p className="text-sm text-gray-600">
                      Days you completed all three tasks
                    </p>
                  </div>
                  <div className="text-3xl font-bold text-success-600">
                    {questHistory.filter(q => q.completed).length}
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {questHistory
                    .filter(q => q.completed)
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((entry) => {
                      const date = new Date(entry.date);
                      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

                      return (
                        <div
                          key={entry.date}
                          className="bg-success-50 border-2 border-success-200 rounded-lg p-3 text-center hover:bg-success-100 transition-colors"
                        >
                          <div className="text-xs text-success-700 font-medium mb-1">
                            {dayNames[date.getDay()]}
                          </div>
                          <div className="text-2xl font-bold text-success-900">
                            {date.getDate()}
                          </div>
                          <div className="text-xs text-success-700">
                            {monthNames[date.getMonth()]}
                          </div>
                          <div className="text-xs text-success-600">
                            {date.getFullYear()}
                          </div>
                          <div className="mt-2 text-lg">
                            ✓
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {/* Your Top 3 */}
            <div className="card p-4 sm:p-6 lg:p-8 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {viewingTomorrow ? 'Your Top 3 Tomorrow' : 'Your Top 3 Today'}
                  </h2>
                  {viewingTomorrow && (
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full w-fit">
                      Planning Ahead
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <button
                    onClick={toggleView}
                    className="btn-secondary py-2 px-4 text-sm whitespace-nowrap"
                  >
                    {viewingTomorrow ? '← Back to Today' : 'Plan Tomorrow →'}
                  </button>
                  {isAuthenticated && !viewingTomorrow && (
                    <button
                      onClick={syncFromServer}
                      disabled={syncing}
                      className="text-sm text-primary-600 hover:text-primary-700 font-medium whitespace-nowrap"
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
                    <div key={index}>
                      <div
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
                      {errors[index] && (
                        <div className="text-red-600 text-xs mt-1 px-1">
                          {errors[index]}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {!viewingTomorrow && (
                <>
                  {/* Lock In Choices Button */}
                  {!submittedToday && !choicesLocked && (
                    <button
                      onClick={handleLockChoices}
                      disabled={lockingChoices || quests.filter(q => q.trim()).length < 3}
                      className={`mt-6 w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                        quests.filter(q => q.trim()).length === 3
                          ? 'bg-success-600 hover:bg-success-700 text-white shadow-md hover:shadow-lg'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {lockingChoices
                        ? 'Locking in...'
                        : quests.filter(q => q.trim()).length === 3
                        ? 'Lock In My Choices'
                        : 'Fill all 3 to lock in'}
                    </button>
                  )}

                  {/* Success State - Choices Locked */}
                  {!submittedToday && choicesLocked && (
                    <div className="mt-6 w-full py-3 px-6 rounded-lg font-semibold bg-success-500 text-white cursor-default shadow-md text-center">
                      ✓ Choices Locked
                    </div>
                  )}

                  {/* Final Lock It In Button */}
                  <button
                    onClick={handleSubmit}
                    disabled={submitting || submittedToday || completed.filter(c => c).length < 3}
                    className={`mt-6 w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                      submittedToday
                        ? 'bg-success-500 text-white cursor-not-allowed'
                        : completed.filter(c => c).length === 3
                        ? 'bg-success-600 hover:bg-success-700 text-white shadow-md hover:shadow-lg'
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
                </>
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






