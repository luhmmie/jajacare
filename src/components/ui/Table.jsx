
import EmptyState from '../common/EmptyState';
import Loader from '../common/Loader';

export default function Table({ columns, data, loading, emptyMessage = 'No records found', rowKey = 'id' }) {
  if (loading) return <Loader />;

  if (!data || data.length === 0) {
    return <EmptyState title="Nothing here yet" description={emptyMessage} />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            {columns.map((col) => (
              <th
                key={col.key}
                className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row[rowKey]} className="border-b border-gray-100 hover:bg-gray-50">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-[#0A192F]">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
