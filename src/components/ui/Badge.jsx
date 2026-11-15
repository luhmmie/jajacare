
const COLORS = {
  gray: 'bg-gray-100 text-gray-700',
  blue: 'bg-blue-100 text-blue-700',
  green: 'bg-green-100 text-green-700',
  amber: 'bg-amber-100 text-amber-700',
  red: 'bg-red-100 text-red-700',
  teal: 'bg-teal-100 text-teal-700',
  purple: 'bg-purple-100 text-purple-700',
};

export default function Badge({ children, color = 'gray', className = '' }) {
  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full
        text-xs font-semibold
        ${COLORS[color]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}


export const STATUS_MAP = {
  scheduled: { color: 'blue', label: 'Scheduled' },
  checked_in: { color: 'amber', label: 'Checked In' },
  in_consultation: { color: 'purple', label: 'In Consultation' },
  completed: { color: 'green', label: 'Completed' },
  cancelled: { color: 'red', label: 'Cancelled' },
  no_show: { color: 'gray', label: 'No Show' },
};
