interface HeatMeterProps {
  heatLevel: number;      // 0-5
  currentStreak: number;  // For context
  questHistory?: Array<{ date: string; completed: boolean }>;
  accountCreatedDate?: string;
  className?: string;
}

export default function HeatMeter({ heatLevel, currentStreak, questHistory, accountCreatedDate, className = '' }: HeatMeterProps) {
  // Color mapping for each heat level
  const HEAT_COLORS = {
    0: 'bg-gray-200 border border-gray-300',  // Empty/cold
    1: 'bg-yellow-400',                       // Day 1 - Yellow
    2: 'bg-yellow-500',                       // Day 2 - Yellow-Orange
    3: 'bg-orange-500',                       // Day 3 - Orange
    4: 'bg-orange-600',                       // Day 4 - Orange-Red
    5: 'bg-red-600',                          // Day 5+ - Red/Hot
  };

  // Helper function to format date as YYYY-MM-DD
  const formatDateString = (year: number, month: number, day: number): string => {
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  // Consider today complete if quest history marks today as completed,
  // otherwise fall back to heatLevel > 0 (streak implies today done).
  const isTodayCompleted = (() => {
    const today = new Date();
    const todayKey = formatDateString(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate()
    );
    const todayInHistory = questHistory?.find((q) => q.date === todayKey);
    if (todayInHistory) return todayInHistory.completed;
    return heatLevel > 0;
  })();

  // Determine color for each box based on quest history and position
  const getBoxColor = (index: number): string => {
    const dateInfo = getDateForBox(index);
    const monthNumber = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(dateInfo.month) + 1;
    const dateString = formatDateString(dateInfo.year, monthNumber, dateInfo.day);

    // Future days (after today) are always gray
    if (index > 5) {
      return HEAT_COLORS[0];
    }

    // Current day (index 5)
    if (index === 5) {
      return heatLevel > 0 ? HEAT_COLORS[heatLevel as keyof typeof HEAT_COLORS] : HEAT_COLORS[0];
    }

    // Past days (index 0-4)
    // Check if account existed on this date
    if (accountCreatedDate && new Date(dateString) < new Date(accountCreatedDate)) {
      return HEAT_COLORS[0]; // Gray if account didn't exist yet
    }

    // Check quest history for this date
    const questForDate = questHistory?.find(q => q.date === dateString);
    if (questForDate?.completed) {
      // Show colored based on current heat level if completed
      return HEAT_COLORS[heatLevel as keyof typeof HEAT_COLORS];
    }

    // No submission on this date - gray
    return HEAT_COLORS[0];
  };

  // Status text based on heat level
  const getStatusText = (): string => {
    if (heatLevel === 0) return "Day 1. You got this.";
    if (heatLevel < 5) return `${heatLevel} days rolling`;
    return "🔥 You're on fire!";
  };

  // Get the date for each box (5 days before to 5 days after)
  const getDateForBox = (index: number): { day: number; month: string; year: number } => {
    const date = new Date();
    date.setDate(date.getDate() - (5 - index)); // Box 0 = 5 days ago, Box 5 = today, Box 10 = 5 days future

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return {
      day: date.getDate(),
      month: monthNames[date.getMonth()],
      year: date.getFullYear()
    };
  };

  return (
    <div className={`card p-6 ${className}`}>
      {/* Title and Status */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-gray-600 mb-1">Streak Heat Meter</p>
          <p className="text-xs text-gray-500">
            {getStatusText()}
          </p>
        </div>
      </div>

      {/* Heat boxes with dates */}
      <div className="flex gap-2">
        {Array.from({ length: 11 }, (_, index) => {
          const dateInfo = getDateForBox(index);
          const dayDescriptor = index === 5 ? 'Today' : index < 5 ? `${5 - index} days ago` : `${index - 5} days from now`;
          return (
            <div key={index} className="flex-1 flex flex-col items-center relative">
              <div
                className={`w-full h-12 rounded ${getBoxColor(index)} transition-all duration-300 relative overflow-hidden`}
                title={dayDescriptor}
                aria-label={dayDescriptor}
              >
                {index === 5 && (
                  <div
                    className="absolute inset-0 bg-white/20"
                    style={{
                      transformOrigin: 'left center',
                      transform: isTodayCompleted ? 'scaleX(1)' : 'scaleX(0)',
                      transition: 'transform 2500ms ease-out',
                      pointerEvents: 'none',
                    }}
                  />
                )}
              </div>
              {index === 5 && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full" />
                </div>
              )}
              <div className="mt-2 text-center">
                <p className="text-xs font-semibold text-gray-700">{dateInfo.day}</p>
                <p className="text-xs text-gray-500">{dateInfo.month}</p>
                <p className="text-xs text-gray-400">{dateInfo.year}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
