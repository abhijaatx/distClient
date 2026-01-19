import React from 'react';

const LoadingOverlay = ({ isLoading }) => {
    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
            {/* Spinner */}
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-black mb-4"></div>

            {/* Text */}
            <h2 className="text-xl font-light text-black tracking-tight">Generating Questions</h2>
            <p className="text-sm text-gray-500 mt-2 animate-pulse">
                Processing text with T5 model...
            </p>
        </div>
    );
};

export default LoadingOverlay;