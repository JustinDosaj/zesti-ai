// src/components/LoadingBar.tsx
import React from 'react';
import { useLoading } from '@/context/loadingcontext';
import { ProcessingLoader } from './loader';

const LoadingBar: React.FC = () => {
  const { isLoading, progress } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="relative w-full bg-gray-200 z-50">
      <div className="inline-flex items-center space-x-1 justify-center w-full bg-white text-center py-2 text-sm">
        <ProcessingLoader/> 
        <p>Processing Recipe {progress}%</p>
      </div>
      <div className="w-full bg-gray-300 h-1">
        <div className="primary-orange-gradient-bg h-1 transition-width duration-500" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default LoadingBar;
