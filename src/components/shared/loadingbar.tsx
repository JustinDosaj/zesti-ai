import React, { useEffect, useState } from 'react';
import { useLoading } from '@/context/loadingcontext';
import { ProcessingLoader } from './loader';

const LoadingBar: React.FC = () => {
  const { isLoading, progress, setProgress } = useLoading();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 35); // Adjust the value as needed
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isLoading) return null;

  return (
    <div className={`w-full ${isScrolled ? 'fixed top-0 z-50' : 'relative'} bg-gray-200`}>
      <div className="inline-flex items-center space-x-1 justify-center w-full bg-white text-center py-2 text-sm">
        <ProcessingLoader />
        <p className="text-gray-900">Processing Recipe {progress}%</p>
      </div>
      <div className="w-full bg-gray-300 h-1">
        <div className="bg-primary-main h-1 transition-width duration-500" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default LoadingBar;
