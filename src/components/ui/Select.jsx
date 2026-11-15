
import { forwardRef } from 'react';

const Select = forwardRef(function Select(
  { label, error, options = [], placeholder = 'Select...', className = '', id, ...rest },
  ref
) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={id}
        className={`
          w-full px-3 py-2.5 rounded-md border bg-white
          text-sm text-[#0A192F]
          focus:outline-none focus:ring-2 focus:ring-[#0066FF]/30 focus:border-[#0066FF]
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${className}
        `}
        {...rest}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => {
          const value = typeof opt === 'string' ? opt : opt.value;
          const label = typeof opt === 'string' ? opt : opt.label;
          return (
            <option key={value} value={value}>
              {label}
            </option>
          );
        })}
      </select>
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
});

export default Select;
