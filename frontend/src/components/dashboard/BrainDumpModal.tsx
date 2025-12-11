import { useState, useEffect, useCallback } from 'react';
import { apiClient, BrainDumpIdea } from '@/lib/api';
import VoiceInput from './VoiceInput';

interface BrainDumpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectIdea: (text: string) => void;
  isAuthenticated: boolean;
}

export default function BrainDumpModal({
  isOpen,
  onClose,
  onSelectIdea,
  isAuthenticated,
}: BrainDumpModalProps) {
  const [ideas, setIdeas] = useState<BrainDumpIdea[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [showArchived, setShowArchived] = useState(false);

  const STORAGE_KEY = 'topthree_brain_dump';

  // Load ideas from localStorage or API
  const loadIdeas = useCallback(async () => {
    if (isAuthenticated) {
      // Load from API
      setLoading(true);
      const result = await apiClient.getBrainDumpIdeas(showArchived);
      setLoading(false);
      if (result.data) {
        setIdeas(result.data);
        // Sync to localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(result.data));
      }
    } else {
      // Load from localStorage
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          setIdeas(JSON.parse(stored));
        } catch (e) {
          setIdeas([]);
        }
      }
    }
  }, [isAuthenticated, showArchived]);

  useEffect(() => {
    if (isOpen) {
      loadIdeas();
    }
  }, [isOpen, loadIdeas]);

  const addIdea = async () => {
    if (!inputText.trim()) return;

    const newIdea: BrainDumpIdea = {
      id: Date.now(), // Temporary ID for localStorage
      text: inputText.trim(),
      is_archived: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (isAuthenticated) {
      // Save to API
      const result = await apiClient.createBrainDumpIdea(newIdea.text);
      if (result.data) {
        setIdeas([result.data, ...ideas]);
        localStorage.setItem(STORAGE_KEY, JSON.stringify([result.data, ...ideas]));
      }
    } else {
      // Save to localStorage only
      const updatedIdeas = [newIdea, ...ideas];
      setIdeas(updatedIdeas);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedIdeas));
    }

    setInputText('');
  };

  const deleteIdea = async (id: number) => {
    if (isAuthenticated) {
      await apiClient.deleteBrainDumpIdea(id);
    }

    const updatedIdeas = ideas.filter((idea) => idea.id !== id);
    setIdeas(updatedIdeas);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedIdeas));
  };

  const handleSelectIdea = (idea: BrainDumpIdea) => {
    onSelectIdea(idea.text);
    // Optional: Could mark as "used" instead of deleting
  };

  const handleVoiceTranscript = (transcript: string) => {
    setInputText(transcript);
    // Auto-add after voice input
    setTimeout(() => {
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      document.dispatchEvent(event);
    }, 100);
  };

  const formatTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} min ago`;
    return 'Just now';
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Brain Dump</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Input Area */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addIdea();
                  }
                }}
                placeholder="What's on your mind?"
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-400 focus:outline-none transition-colors"
                autoFocus
              />
              <VoiceInput onTranscript={handleVoiceTranscript} />
              <button
                onClick={addIdea}
                disabled={!inputText.trim()}
                className="btn-primary px-6"
              >
                Add
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              This is your scratch pad. Messy is okay. Pick 3 ideas for your Top 3 anytime.
            </p>
          </div>

          {/* Ideas List */}
          <div className="overflow-y-auto p-6" style={{ maxHeight: 'calc(90vh - 280px)' }}>
            {loading ? (
              <div className="text-center py-12 text-gray-500">Loading...</div>
            ) : ideas.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-2">
                  Your brain dump is empty.
                </p>
                <p className="text-sm text-gray-400">
                  Tap the mic or start typing to capture ideas.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-700">
                    Your Ideas ({ideas.filter((i) => !i.is_archived).length})
                  </h3>
                </div>

                <div className="space-y-3">
                  {ideas
                    .filter((i) => !i.is_archived)
                    .map((idea) => (
                      <div
                        key={idea.id}
                        className="group flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all cursor-pointer border-2 border-transparent hover:border-primary-200"
                        onClick={() => handleSelectIdea(idea)}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-900 break-words">{idea.text}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatTimeAgo(idea.created_at)}
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteIdea(idea.id);
                          }}
                          className="flex-shrink-0 text-gray-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
                          aria-label="Delete idea"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
