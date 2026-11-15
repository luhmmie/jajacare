// src/pages/NotFound.jsx
import { Link } from 'react-router';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] px-6 text-center">
      <h1 className="text-7xl font-bold text-[#0A192F] mb-4">404</h1>
      <p className="text-gray-500 mb-8 max-w-md">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Link to="/">
        <Button variant="primary" size="lg">Back to Home</Button>
      </Link>
    </div>
  );
}
