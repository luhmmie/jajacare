
export default function Tabs({ tabs, active, onChange }) {
  return (
    <div className="border-b border-gray-200 mb-6">
      <div className="flex gap-1 overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = tab.key === active;
          return (
            <button
              key={tab.key}
              onClick={() => onChange(tab.key)}
              className={`
                px-4 py-2.5 text-sm font-semibold whitespace-nowrap
                border-b-2 transition-colors
                ${
                  isActive
                    ? 'border-[#0066FF] text-[#0066FF]'
                    : 'border-transparent text-gray-500 hover:text-[#0A192F]'
                }
              `}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
