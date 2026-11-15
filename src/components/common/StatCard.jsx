
import Card from '../ui/Card';

export default function StatCard({ label, value, icon, trend, trendLabel }) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            {label}
          </p>
          <p className="text-3xl font-bold text-[#0A192F]">{value}</p>
          {trendLabel && (
            <p className="text-xs text-gray-500 mt-1">{trendLabel}</p>
          )}
        </div>
        {icon && (
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}
