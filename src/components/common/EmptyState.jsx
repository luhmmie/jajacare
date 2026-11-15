
import { FiInbox } from 'react-icons/fi';

export default function EmptyState({ 
  icon = <FiInbox size={24} />, 
  title = 'Nothing here yet', 
  description = 'Check back later.', 
  action 
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <div className="w-14 h-14 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h4 className="font-semibold text-[#14357A] mb-1">{title}</h4>
      <p className="text-sm text-gray-500 max-w-sm mb-4">{description}</p>
      {action}
    </div>
  );
}