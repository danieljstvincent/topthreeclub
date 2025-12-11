interface HeatMeterProps {
  heatLevel: number;      // 0-5
  currentStreak: number;  // For context
  className?: string;
}

export default function HeatMeter({ heatLevel, currentStreak, className = '' }: HeatMeterProps) {
  // Color mapping for each heat level
  const HEAT_COLORS = {
    0: 'bg-gray-200 border border-gray-300',  // Empty/cold
    1: 'bg-yellow-400',                       // Day 1 - Yellow
    2: 'bg-yellow-500',                       // Day 2 - Yellow-Orange
    3: 'bg-orange-500',                       // Day 3 - Orange
    4: 'bg-orange-600',                       // Day 4 - Orange-Red
    5: 'bg-red-600',                          // Day 5+ - Red/Hot
  };

  // Determine color for each box (index 0-4 represents boxes 1-5)
  const getBoxColor = (index: number): string => {
    if (index < heatLevel) {
      // All active boxes use the current heat level's color
      return HEAT_COLORS[heatLevel as keyof typeof HEAT_COLORS];
    }
    // Inactive boxes are grey
    return HEAT_COLORS[0];
  };

  // Status text based on heat level
  const getStatusText = (): string => {
    if (heatLevel === 0) return "Day 1. You got this.";
    if (heatLevel < 5) return `${heatLevel} days rolling`;
    return "🔥 You're on fire!";
  };

  // Get the date for each box (counting back from today)
  const getDateForBox = (index: number): { day: number; month: string; year: number } => {
    const date = new Date();
    date.setDate(date.getDate() - (4 - index)); // Box 0 = 4 days ago, Box 4 = today

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
        {Array.from({ length: 5 }, (_, index) => {
          const dateInfo = getDateForBox(index);
          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className={`w-full h-12 rounded ${getBoxColor(index)} transition-all duration-300`}
                title={`Level ${index + 1}`}
                aria-label={`Heat level ${index + 1}${index < heatLevel ? ' - active' : ' - inactive'}`}
              />
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
