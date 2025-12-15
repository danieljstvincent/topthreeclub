import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeatMeter from '@/components/dashboard/HeatMeter';

export default function Landing() {
  const [streak, setStreak] = useState(0);
  const [momentumHours, setMomentumHours] = useState(0);
  const [totalXP, setTotalXP] = useState(0);
  const [heatLevel, setHeatLevel] = useState(0);
  const [quests, setQuests] = useState(['', '', '']);
  const [completed, setCompleted] = useState([false, false, false]);
  const [errors, setErrors] = useState(['', '', '']);

  const STORAGE_KEY = 'topthree_data';
  const QUESTS_KEY = 'topthree_quests';

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

  function getTodayKey() {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  }

  function calculateHeatLevel(data: any, currentStreak: number): number {
    if (currentStreak > 0) {
      return Math.min(currentStreak, 5);
    }

    const today = new Date();
    let peakStreak = 0;
    let daysSincePeak = 0;

    for (let i = 1; i <= 10; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      const dateKey = `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, '0')}-${String(checkDate.getDate()).padStart(2, '0')}`;

      if (data[dateKey]) {
        const completedCount = data[dateKey].completed.filter((c: boolean) => c).length;
        if (completedCount === 3) {
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

    if (peakStreak >= 5) {
      return Math.max(0, 5 - daysSincePeak);
    }

    return 0;
  }

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
  };

  const handleQuestTextChange = (questIndex: number, text: string) => {
    const newQuests = [...quests];
    newQuests[questIndex] = text;
    setQuests(newQuests);

    // Clear error when user types
    if (errors[questIndex]) {
      const newErrors = [...errors];
      newErrors[questIndex] = '';
      setErrors(newErrors);
    }

    saveQuests(newQuests);
  };

  useEffect(() => {
    const loadedQuests = loadQuests();
    setQuests(loadedQuests);
    const data = loadData();
    const todayKey = getTodayKey();
    const todayData = data[todayKey] || { completed: [false, false, false] };
    setCompleted(todayData.completed);
    updateStats();
  }, [updateStats]);

  return (
    <>
      <Head>
        <title>3 Top Three Club - Build Better Habits, One Day at a Time</title>
        <meta name="description" content="Track your top three daily goals and build lasting habits. Simple, beautiful, and effective habit tracking." />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <span>✨</span>
              <span>Designed for ADHD brains</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Your Brain on
              <br />
              <span className="gradient-text">Three Tasks</span>
            </h1>

            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Focus on what matters. Forget the rest.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/dashboard?openBrainDump=true"
                className="btn-primary btn-lg text-base font-semibold"
              >
                Capture your thougts
              </Link>
              <Link
                href="/dashboard"
                className="btn-secondary btn-lg text-base font-semibold"
              >
                Start Now
              </Link>
            </div>

            <p className="text-sm text-gray-500 mt-6">No overwhelm. No guilt. Just three things.</p>
          </div>
        </section>

        {/* Top Three Dashboard Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="section-container">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Momentum</p>
                    <p className="text-3xl font-bold text-gray-900">{momentumHours}</p>
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
            <div className="card p-4 sm:p-6 lg:p-8 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Your Top 3 Today
                </h2>
              </div>

              {completed.filter(c => c).length === 3 ? (
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
                        <input
                          type="text"
                          value={quests[index]}
                          onChange={(e) => handleQuestTextChange(index, e.target.value)}
                          placeholder={
                            index === 0 ? "What's the most important thing today?" :
                            index === 1 ? "What's the second-most important?" :
                            "What's the third?"
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

              <div className="mt-6 text-center">
                <Link
                  href="/dashboard"
                  className="btn-primary inline-block px-6 py-3"
                >
                  Go to Full Dashboard
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="section-container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Work with your brain, not against it
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Designed specifically for ADHD and executive dysfunction
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="card p-8">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">The Wall of Awful Stops Here</h3>
                <p className="text-gray-600">
                  Standard to-do lists are overwhelming. We hide the noise and show you exactly three things. That&apos;s it. Your ADHD brain will thank you.
                </p>
              </div>

              <div className="card p-8">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Built for Executive Dysfunction</h3>
                <p className="text-gray-600">
                  Forget willpower. Forget motivation. This isn&apos;t about being better—it&apos;s about working with your brain, not against it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-700">
          <div className="section-container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-white mb-4">
                Three things. That&apos;s it.
              </h2>
              <p className="text-xl text-primary-100 mb-8">
                No overwhelm. No shame. No guilt. Just progress.
              </p>
              <Link
                href="/dashboard?openBrainDump=true"
                className="inline-block bg-white text-primary-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors shadow-lg"
              >
                Start Your Top 3 Today
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}







