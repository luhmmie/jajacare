
export default function Loader({ fullScreen = false, size = 32 }) {
  const spinner = (
    <div
      className="animate-spin rounded-full border-4 border-[#0066FF] border-t-transparent"
      style={{ width: size, height: size }}
    />
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        {spinner}
      </div>
    );
  }

  return <div className="flex items-center justify-center py-12">{spinner}</div>;
}
