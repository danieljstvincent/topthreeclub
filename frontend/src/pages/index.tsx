import Head from 'next/head';
import { useEffect, useState, useCallback } from 'react';
import { apiClient } from '../lib/api';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

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

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [streak, setStreak] = useState(0);
  const [totalXP, setTotalXP] = useState(0);
  const [quests, setQuests] = useState(['', '', '']);
  const [completed, setCompleted] = useState([false, false, false]);
  const [syncing, setSyncing] = useState(false);
  const [submittedToday, setSubmittedToday] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const STORAGE_KEY = 'topthree_data';
  const QUESTS_KEY = 'topthree_quests';
  const SUBMISSION_KEY = 'topthree_submission';

  // Load data from localStorage
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

  // Check authentication status (non-blocking)
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const result = await apiClient.getCurrentUser();
      if (result.data) {
        setUser(result.data);
        setIsAuthenticated(true);
        // Don't auto-sync on page load - let user choose when to sync
        // syncFromServer();
      }
    } catch (error) {
      // Not authenticated, continue with localStorage
      setIsAuthenticated(false);
    }
  };

  // Check if already submitted today
  function checkSubmittedToday() {
    if (typeof window === 'undefined') return false;
    const submissionData = localStorage.getItem(SUBMISSION_KEY);
    if (!submissionData) return false;
    
    const submission = JSON.parse(submissionData);
    const todayKey = getTodayKey();
    return submission.date === todayKey && submission.submitted === true;
  }

  // Load initial data from localStorage
  useEffect(() => {
    const loadedQuests = loadQuests();
    setQuests(loadedQuests);

    const data = loadData();
    const todayKey = getTodayKey();
    const todayData = data[todayKey] || { completed: [false, false, false] };
    setCompleted(todayData.completed);

    // Check if already submitted today
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

    // Sync to server if authenticated
    if (isAuthenticated) {
      syncToServer();
    }
  };

  const handleQuestTextChange = (questIndex: number, text: string) => {
    const newQuests = [...quests];
    newQuests[questIndex] = text;
    setQuests(newQuests);
    saveQuests(newQuests);

    // Sync to server if authenticated
    if (isAuthenticated) {
      syncToServer();
    }
  };

  // Sync local data to server
  const syncToServer = async () => {
    if (!isAuthenticated) return;

    try {
      const todayKey = getTodayKey();
      const data = loadData();
      const todayData = data[todayKey] || { completed: [false, false, false] };

      await apiClient.saveTodayQuest({
        quest_1_text: quests[0],
        quest_2_text: quests[1],
        quest_3_text: quests[2],
        quest_1_completed: todayData.completed[0] || false,
        quest_2_completed: todayData.completed[1] || false,
        quest_3_completed: todayData.completed[2] || false,
      });
    } catch (error) {
      console.error('Failed to sync to server:', error);
    }
  };

  // Sync all local data to server
  const syncAllToServer = async () => {
    if (!isAuthenticated) return;

    setSyncing(true);
    try {
      const data = loadData();
      const loadedQuests = loadQuests();

      // Prepare all data for bulk sync
      const bulkData: Array<{
        date: string;
        quest_1_text: string;
        quest_2_text: string;
        quest_3_text: string;
        quest_1_completed: boolean;
        quest_2_completed: boolean;
        quest_3_completed: boolean;
      }> = [];

      // Add today's data with quest texts
      const todayKey = getTodayKey();
      const todayData = data[todayKey] || { completed: [false, false, false] };
      bulkData.push({
        date: todayKey,
        quest_1_text: loadedQuests[0],
        quest_2_text: loadedQuests[1],
        quest_3_text: loadedQuests[2],
        quest_1_completed: todayData.completed[0] || false,
        quest_2_completed: todayData.completed[1] || false,
        quest_3_completed: todayData.completed[2] || false,
      });

      // Add all historical data
      for (const [dateKey, dateData] of Object.entries(data)) {
        if (dateKey !== todayKey) {
          bulkData.push({
            date: dateKey,
            quest_1_text: '',
            quest_2_text: '',
            quest_3_text: '',
            quest_1_completed: (dateData as any).completed[0] || false,
            quest_2_completed: (dateData as any).completed[1] || false,
            quest_3_completed: (dateData as any).completed[2] || false,
          });
        }
      }

      const result = await apiClient.bulkSyncQuests(bulkData);
      if (result.data) {
        alert(`Successfully synced ${result.data.synced_count || bulkData.length} days to cloud!`);
      } else {
        alert('Progress synced to cloud!');
      }
    } catch (error) {
      console.error('Failed to sync:', error);
      alert('Failed to sync. Please try again.');
    } finally {
      setSyncing(false);
    }
  };

  // Sync from server to local (merge strategy: server wins)
  const syncFromServer = async () => {
    if (!isAuthenticated) return;

    try {
      const historyResult = await apiClient.getQuestHistory();
      if (historyResult.data) {
        const history = historyResult.data as QuestProgress[];
        const data: any = {};
        
        history.forEach(item => {
          const dateKey = item.date;
          data[dateKey] = {
            completed: [
              item.quest_1_completed,
              item.quest_2_completed,
              item.quest_3_completed,
            ]
          };
        });

        // Merge with local data (server data takes precedence)
        const localData = loadData();
        const mergedData = { ...localData, ...data };
        saveData(mergedData);

        // Load today's quests from server
        const todayResult = await apiClient.getTodayQuest();
        if (todayResult.data) {
          const today = todayResult.data as QuestProgress;
          setQuests([
            today.quest_1_text || '',
            today.quest_2_text || '',
            today.quest_3_text || '',
          ]);
          setCompleted([
            today.quest_1_completed || false,
            today.quest_2_completed || false,
            today.quest_3_completed || false,
          ]);
          saveQuests([
            today.quest_1_text || '',
            today.quest_2_text || '',
            today.quest_3_text || '',
          ]);

          // Check if submitted on server
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

        updateStats();
      }

      // Update stats from server
      const statsResult = await apiClient.getQuestStats();
      if (statsResult.data) {
        setStreak(statsResult.data.streak || 0);
        setTotalXP(statsResult.data.total_xp || 0);
      }
    } catch (error) {
      console.error('Failed to sync from server:', error);
    }
  };

  const handleLoginSuccess = async () => {
    const result = await apiClient.getCurrentUser();
    if (result.data) {
      setUser(result.data);
      setIsAuthenticated(true);
      setShowLoginModal(false);
      
      // Ask user if they want to sync
      const shouldSync = confirm('Would you like to sync your local progress to the cloud?');
      if (shouldSync) {
        await syncAllToServer();
      } else {
        // Still sync from server to get any cloud data
        await syncFromServer();
      }
    }
  };

  const handleLogout = async () => {
    await apiClient.logout();
    setUser(null);
    setIsAuthenticated(false);
    // Keep local data, just stop syncing
  };

  const handleSubmit = async () => {
    if (submittedToday) {
      alert('You have already submitted today!');
      return;
    }

    setSubmitting(true);
    
    try {
      // If authenticated, submit via backend
      if (isAuthenticated) {
        // First sync current data
        await syncToServer();
        
        // Then submit
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

      // Mark as submitted in localStorage
      const todayKey = getTodayKey();
      localStorage.setItem(SUBMISSION_KEY, JSON.stringify({
        date: todayKey,
        submitted: true,
        timestamp: new Date().toISOString()
      }));

      setSubmittedToday(true);
      alert('Successfully submitted! Great job completing your habits today! 🎉');
      updateStats();
    } catch (error) {
      console.error('Failed to submit:', error);
      alert('Failed to submit. Please try again.');
      // Remove submission mark on error
      localStorage.removeItem(SUBMISSION_KEY);
    } finally {
      setSubmitting(false);
    }
  };

  const resetData = () => {
    if (confirm('Reset all progress? This cannot be undone.')) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(QUESTS_KEY);
        localStorage.removeItem(SUBMISSION_KEY);
        setQuests(['', '', '']);
        setCompleted([false, false, false]);
        setStreak(0);
        setTotalXP(0);
        setSubmittedToday(false);
        
        // Also reset on server if authenticated
        if (isAuthenticated) {
          apiClient.saveTodayQuest({
            quest_1_text: '',
            quest_2_text: '',
            quest_3_text: '',
            quest_1_completed: false,
            quest_2_completed: false,
            quest_3_completed: false,
          });
        }
      }
    }
  };

  // Generate heatmap from localStorage
  useEffect(() => {
    const heatmap = document.getElementById('heatmap');
    if (!heatmap) return;

    heatmap.innerHTML = '';

    const today = new Date();
    const currentWeekStart = new Date(today);
    currentWeekStart.setDate(today.getDate() - today.getDay());

    const startDate = new Date(currentWeekStart);
    startDate.setDate(currentWeekStart.getDate() - (51 * 7));

    const data = loadData();

    for (let i = 0; i < 364; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      const cell = document.createElement('div');
      cell.className = 'day-cell';
      const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      cell.dataset.date = dateKey;

      if (date.toDateString() === today.toDateString()) {
        cell.style.border = '2px solid #ffff00';
        cell.style.boxShadow = '0 0 10px rgba(255, 255, 0, 0.8)';
      }

      const dayData = data[dateKey];
      if (dayData && dayData.completed) {
        const completedCount = dayData.completed.filter((c: boolean) => c).length;
        cell.dataset.level = String(completedCount);
      } else {
        cell.dataset.level = '0';
      }

      heatmap.appendChild(cell);
    }
  }, [completed, totalXP]);

  return (
    <>
      <Head>
        <title>TopThree.club - Daily Quest Tracker</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <style jsx global>{`
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: #fafafa;
            color: #1a1a1a;
            min-height: 100vh;
            padding: 40px 20px;
            line-height: 1.6;
        }
        
        .container {
            max-width: 900px;
            margin: 0 auto;
        }
        
        .header {
            text-align: center;
            margin-bottom: 60px;
        }
        
        h1 {
            font-size: 2.5em;
            font-weight: 300;
            color: #1a1a1a;
            margin-bottom: 8px;
            letter-spacing: -0.02em;
        }
        
        .subtitle {
            font-size: 0.95em;
            color: #666;
            font-weight: 400;
            margin-top: 8px;
        }
        
        .score {
            font-size: 0.9em;
            color: #888;
            margin-top: 16px;
            font-weight: 400;
        }
        
        .user-info {
            font-size: 0.85em;
            color: #666;
            margin-top: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            flex-wrap: wrap;
        }
        
        .auth-button, .sync-button, .logout-button {
            background: transparent;
            border: 1px solid #e5e5e5;
            color: #666;
            padding: 6px 12px;
            border-radius: 4px;
            font-size: 0.85em;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        
        .auth-button:hover, .sync-button:hover, .logout-button:hover {
            background: #f8f9fa;
            border-color: #ccc;
        }
        
        .sync-button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }
        
        .modal-content {
            background: #fff;
            border-radius: 8px;
            padding: 0;
            max-width: 500px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
        }
        
        .daily-quests {
            background: #fff;
            border: 1px solid #e5e5e5;
            border-radius: 8px;
            padding: 40px;
            margin-bottom: 40px;
        }
        
        .daily-quests h2 {
            color: #1a1a1a;
            font-size: 1.1em;
            font-weight: 500;
            margin-bottom: 24px;
            letter-spacing: -0.01em;
        }
        
        .quest-item {
            background: #fff;
            border: 1px solid #e5e5e5;
            border-radius: 6px;
            padding: 16px;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            gap: 16px;
            transition: all 0.2s ease;
            cursor: pointer;
        }
        
        .quest-item:hover {
            border-color: #ccc;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }
        
        .quest-item.completed {
            background: #f8f9fa;
            border-color: #d1d1d1;
        }
        
        .checkbox {
            width: 20px;
            height: 20px;
            border: 2px solid #d1d1d1;
            border-radius: 4px;
            background: #fff;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
        }
        
        .quest-item:hover .checkbox {
            border-color: #999;
        }
        
        .quest-item.completed .checkbox {
            background: #1a1a1a;
            border-color: #1a1a1a;
        }
        
        .quest-item.completed .checkbox::after {
            content: '✓';
            color: #fff;
            font-size: 0.85em;
            font-weight: 600;
        }
        
        .quest-content {
            flex-grow: 1;
        }
        
        .quest-input {
            background: transparent;
            border: none;
            color: #1a1a1a;
            font-family: 'Inter', sans-serif;
            font-size: 0.95em;
            font-weight: 400;
            width: 100%;
            outline: none;
        }
        
        .quest-input::placeholder {
            color: #aaa;
        }
        
        .quest-item.completed .quest-input {
            text-decoration: line-through;
            color: #888;
        }
        
        .heatmap-section {
            background: #fff;
            border: 1px solid #e5e5e5;
            border-radius: 8px;
            padding: 40px;
        }
        
        .heatmap-section h2 {
            color: #1a1a1a;
            font-size: 1.1em;
            font-weight: 500;
            margin-bottom: 32px;
            letter-spacing: -0.01em;
        }
        
        .heatmap-container {
            overflow-x: auto;
            padding: 20px 0;
        }
        
        .heatmap {
            display: inline-grid;
            grid-template-rows: repeat(7, 1fr);
            grid-auto-flow: column;
            gap: 3px;
            min-width: 100%;
        }
        
        .day-cell {
            width: 12px;
            height: 12px;
            background: #ebedf0;
            border-radius: 2px;
            transition: all 0.15s ease;
        }
        
        .day-cell:hover {
            outline: 2px solid #999;
            outline-offset: 1px;
        }
        
        .day-cell[data-level="0"] {
            background: #ebedf0;
        }
        
        .day-cell[data-level="1"] {
            background: #c6e48b;
        }
        
        .day-cell[data-level="2"] {
            background: #7bc96f;
        }
        
        .day-cell[data-level="3"] {
            background: #239a3b;
        }
        
        .day-label {
            font-size: 0.75em;
            color: #666;
            margin-right: 8px;
            display: flex;
            align-items: center;
            font-weight: 400;
        }
        
        .heatmap-grid {
            display: flex;
            gap: 8px;
        }
        
        .days-column {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            gap: 3px;
        }
        
        .legend {
            display: flex;
            gap: 12px;
            justify-content: flex-end;
            align-items: center;
            margin-top: 24px;
            font-size: 0.8em;
            color: #666;
        }
        
        .legend-item {
            display: flex;
            align-items: center;
            gap: 6px;
        }
        
        .legend-box {
            width: 12px;
            height: 12px;
            border-radius: 2px;
        }
        
        .reset-button {
            background: #fff;
            color: #666;
            border: 1px solid #e5e5e5;
            border-radius: 6px;
            padding: 10px 20px;
            font-family: 'Inter', sans-serif;
            font-size: 0.85em;
            font-weight: 500;
            cursor: pointer;
            margin-top: 24px;
            transition: all 0.2s ease;
            display: block;
            margin-left: auto;
            margin-right: auto;
        }
        
        .reset-button:hover {
            background: #f8f9fa;
            border-color: #ccc;
        }
        
        .reset-button:active {
            transform: scale(0.98);
        }
        
        .submit-button {
            background: #239a3b;
            color: #fff;
            border: none;
            border-radius: 6px;
            padding: 14px 32px;
            font-family: 'Inter', sans-serif;
            font-size: 1em;
            font-weight: 600;
            cursor: pointer;
            margin-top: 24px;
            transition: all 0.2s ease;
            display: block;
            width: 100%;
            letter-spacing: 0.01em;
        }
        
        .submit-button:hover:not(:disabled) {
            background: #1d7d2f;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(35, 154, 59, 0.3);
        }
        
        .submit-button:active:not(:disabled) {
            transform: translateY(0);
        }
        
        .submit-button:disabled {
            background: #7bc96f;
            cursor: not-allowed;
            opacity: 0.7;
        }
        
        .submit-button.submitted {
            background: #7bc96f;
        }
        
        @media (max-width: 768px) {
            body {
                padding: 24px 16px;
            }
            
            h1 {
                font-size: 1.8em;
            }
            
            .daily-quests, .heatmap-section {
                padding: 24px;
            }
            
            .day-cell {
                width: 10px;
                height: 10px;
            }
            
            .legend {
                justify-content: center;
            }
        }
      `}</style>
      <div className="container">
        <div className="header">
          <h1>topthree.club</h1>
          <div className="subtitle">Three daily habits, tracked simply</div>
          <div className="score">
            Streak: <span id="streak">{streak}</span> days · Total completed: <span id="total-xp">{totalXP}</span>
          </div>
          <div className="user-info">
            {isAuthenticated ? (
              <>
                <span>Synced as {user?.username}</span>
                <button className="sync-button" onClick={syncAllToServer} disabled={syncing}>
                  {syncing ? 'Syncing...' : 'Sync to Cloud'}
                </button>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <span style={{ color: '#999' }}>Using local storage</span>
                <button className="auth-button" onClick={() => setShowLoginModal(true)}>
                  Login to Sync
                </button>
              </>
            )}
          </div>
        </div>
        
        <div className="daily-quests">
          <h2>Today&apos;s habits</h2>
          {[0, 1, 2].map((index) => (
            <div 
              key={index}
              className={`quest-item ${completed[index] ? 'completed' : ''}`}
              onClick={(e) => {
                if ((e.target as HTMLElement).classList.contains('quest-input')) return;
                toggleQuest(index);
              }}
            >
              <div className="checkbox"></div>
              <div className="quest-content">
                <input
                  type="text"
                  className="quest-input"
                  placeholder={index === 0 ? 'First habit' : index === 1 ? 'Second habit' : 'Third habit'}
                  value={quests[index]}
                  onChange={(e) => handleQuestTextChange(index, e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          ))}
          <button
            className={`submit-button ${submittedToday ? 'submitted' : ''}`}
            onClick={handleSubmit}
            disabled={submittedToday || submitting}
          >
            {submitting ? 'Submitting...' : submittedToday ? '✓ Submitted Today' : 'Submit'}
          </button>
          {submittedToday && (
            <p style={{
              textAlign: 'center',
              marginTop: '12px',
              fontSize: '0.85em',
              color: '#666',
              fontStyle: 'italic'
            }}>
              You've already submitted today. Come back tomorrow!
            </p>
          )}
        </div>
        
        <div className="heatmap-section">
          <h2>Completion history</h2>
          <div className="heatmap-container">
            <div className="heatmap-grid">
              <div className="days-column">
                <div className="day-label">Sun</div>
                <div className="day-label">Mon</div>
                <div className="day-label">Tue</div>
                <div className="day-label">Wed</div>
                <div className="day-label">Thu</div>
                <div className="day-label">Fri</div>
                <div className="day-label">Sat</div>
              </div>
              <div className="heatmap" id="heatmap"></div>
            </div>
          </div>
          <div className="legend">
            <span>Less</span>
            <div className="legend-item">
              <div className="legend-box" style={{ background: '#ebedf0' }}></div>
            </div>
            <div className="legend-item">
              <div className="legend-box" style={{ background: '#c6e48b' }}></div>
            </div>
            <div className="legend-item">
              <div className="legend-box" style={{ background: '#7bc96f' }}></div>
            </div>
            <div className="legend-item">
              <div className="legend-box" style={{ background: '#239a3b' }}></div>
            </div>
            <span>More</span>
          </div>
          <button className="reset-button" onClick={resetData}>Reset today&apos;s data</button>
        </div>
      </div>

      {showLoginModal && (
        <div className="modal-overlay" onClick={() => setShowLoginModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {showRegister ? (
              <RegisterForm
                onSuccess={handleLoginSuccess}
                onSwitchToLogin={() => setShowRegister(false)}
              />
            ) : (
              <LoginForm
                onSuccess={handleLoginSuccess}
                onSwitchToRegister={() => setShowRegister(true)}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
