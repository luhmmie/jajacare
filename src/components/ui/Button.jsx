
import Loader from '../common/Loader';

const VARIANTS = {
  primary: 'bg-[#0066FF] hover:bg-blue-700 text-white',
  secondary: 'bg-[#F5B041] hover:bg-[#e09b2d] text-[#0A192F]',
  outline: 'border border-gray-300 hover:bg-gray-50 text-[#0A192F]',
  ghost: 'hover:bg-gray-100 text-[#0A192F]',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
  dark: 'bg-[#0A192F] hover:bg-[#122B4A] text-white',
};

const SIZES = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  fullWidth = false,
  type = 'button',
  ...rest
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2
        font-semibold rounded-md transition-colors
        disabled:opacity-50 disabled:cursor-not-allowed
        ${VARIANTS[variant]}
        ${SIZES[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...rest}
    >
      {loading && <Loader size={16} />}
      {children}
    </button>
  );
}
