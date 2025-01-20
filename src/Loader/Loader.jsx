import React from 'react'

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="relative flex flex-col items-center gap-4">
        {/* Glowing Spinner */}
        <div className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin shadow-[0_0_15px_3px_rgba(59,130,246,0.7)]"></div>
        
        {/* Futuristic Pulse Effect */}
        <div className="absolute w-20 h-20 bg-primary bg-opacity-20 rounded-full animate-pulse blur-xl"></div>

        {/* Text */}
        <p className="text-lg font-bold text-primary animate-pulse">
          Initializing<span className="animate-bounce">...</span>
        </p>
      </div>
    </div>
  );
}

export default Loader
