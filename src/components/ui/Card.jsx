
export default function Card({ children, className = '', padded = true }) {
  return (
    <div
      className={`
        bg-white rounded-xl border border-gray-200 shadow-sm
        ${padded ? 'p-6' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, action }) {
  return (
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="font-bold text-[#0A192F]">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
