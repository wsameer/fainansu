interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeType?: "increase" | "decrease";
  icon?: React.ReactNode;
}

export const StatCard = ({ title, value, change, changeType, icon }: StatCardProps) => {
  const changeColor = changeType === "increase" ? "text-green-600" : "text-red-600";
  const changeSymbol = changeType === "increase" ? "↑" : "↓";

  return (
    <div className="bg-secondary rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
          {change !== undefined && (
            <p className={`text-sm mt-2 ${changeColor}`}>
              {changeSymbol} {Math.abs(change)}%
            </p>
          )}
        </div>
        {icon && (
          <div className="ml-4 shrink-0">
            <div className="w-8 h-8 text-gray-400">{icon}</div>
          </div>
        )}
      </div>
    </div>
  );
};
