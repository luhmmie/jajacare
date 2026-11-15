
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function Pagination({ page, limit, total, onChange }) {
  const totalPages = Math.ceil(total / limit);
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between mt-4 px-1">
      <p className="text-sm text-gray-500">
        Page <span className="font-semibold text-[#0A192F]">{page}</span> of{' '}
        <span className="font-semibold text-[#0A192F]">{totalPages}</span> &middot; {total} total
      </p>
      <div className="flex gap-1">
        <button
          disabled={page <= 1}
          onClick={() => onChange(page - 1)}
          className="p-2 rounded-md border border-gray-300 disabled:opacity-40 hover:bg-gray-50"
        >
          <FiChevronLeft size={16} />
        </button>
        <button
          disabled={page >= totalPages}
          onClick={() => onChange(page + 1)}
          className="p-2 rounded-md border border-gray-300 disabled:opacity-40 hover:bg-gray-50"
        >
          <FiChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
