
import { createContext, useContext, useState, useCallback } from 'react';
import { 
  FiCheckCircle, FiAlertCircle, FiInfo, FiX 
} from 'react-icons/fi';

const NotificationContext = createContext(null);

const ICONS = {
  success: <FiCheckCircle className="text-green-500" size={18} />,
  error: <FiAlertCircle className="text-red-500" size={18} />,
  info: <FiInfo className="text-blue-500" size={18} />,
};

const STYLES = {
  success: 'border-l-4 border-l-green-500',
  error: 'border-l-4 border-l-red-500',
  info: 'border-l-4 border-l-blue-500',
};

const TITLES = {
  success: 'Success',
  error: 'Error',
  info: 'Notice',
};

export function NotificationProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const notify = useCallback((message, type = 'success', options = {}) => {
    const id = Date.now() + Math.random();
    const toast = {
      id,
      message,
      type,
      title: options.title || TITLES[type],
      duration: options.duration || 4000,
    };
    setToasts((prev) => [...prev, toast]);
    setTimeout(() => dismiss(id), toast.duration);
  }, [dismiss]);

  const notifySuccess = (msg, opts) => notify(msg, 'success', opts);
  const notifyError = (msg, opts) => notify(msg, 'error', opts);
  const notifyInfo = (msg, opts) => notify(msg, 'info', opts);

  return (
    <NotificationContext.Provider value={{ notify, notifySuccess, notifyError, notifyInfo }}>
      {children}


      <div className="fixed top-6 right-6 z-[100] space-y-3 pointer-events-none no-print">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`
              pointer-events-auto
              bg-white rounded-lg shadow-2xl border border-gray-100
              w-[360px] max-w-[calc(100vw-2rem)]
              animate-in slide-in-from-right-8
              ${STYLES[toast.type]}
            `}
          >
            <div className="flex items-start gap-3 p-4">
              <div className="shrink-0 mt-0.5">{ICONS[toast.type]}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[#14357A]">{toast.title}</p>
                <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{toast.message}</p>
              </div>
              <button
                onClick={() => dismiss(toast.id)}
                className="text-gray-400 hover:text-gray-600 shrink-0"
              >
                <FiX size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error('useNotification must be used inside NotificationProvider');
  }
  return ctx;
}