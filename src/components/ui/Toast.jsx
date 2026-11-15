
import { useEffect } from 'react';
import { FiCheckCircle, FiAlertCircle, FiX } from 'react-icons/fi';

const STYLES = {
  success: { bg: 'bg-white', border: 'border-green-500', icon: <FiCheckCircle className="text-green-500" size={20} /> },
  error: { bg: 'bg-white', border: 'border-red-500', icon: <FiAlertCircle className="text-red-500" size={20} /> },
  info: { bg: 'bg-white', border: 'border-blue-500', icon: <FiAlertCircle className="text-blue-500" size={20} /> },
};

export default function Toast({ type = 'success', message, onClose, duration = 3500 }) {
  useEffect(() => {
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [onClose, duration]);

  const style = STYLES[type];

  return (
    <div
      className={`
        flex items-start gap-3 min-w-[280px] max-w-sm p-4 rounded-lg shadow-lg border-l-4 ${style.border} ${style.bg}
      `}
    >
      {style.icon}
      <p className="text-sm text-[#0A192F] flex-1">{message}</p>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
        <FiX size={16} />
      </button>
    </div>
  );
}
