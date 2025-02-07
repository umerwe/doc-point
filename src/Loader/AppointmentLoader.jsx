import React from 'react'

const AppoitmentLoader = () => {
    return (
        <div className="flex items-center justify-center min-h-[70vh] bg-white">
            <div className="relative flex flex-col items-center gap-4">
                {/* Glowing Spinner */}
                <div className="w-14 h-14 rounded-full border-4 border-primary border-t-transparent animate-spin shadow-[0_0_15px_3px_rgba(59,130,246,0.7)]"></div>

                {/* Futuristic Pulse Effect */}
                <div className="absolute w-14 h-14 bg-primary bg-opacity-20 rounded-full animate-pulse blur-xl"></div>

                {/* Text */}
                <p className="text-lg font-bold text-primary animate-pulse">
                    Loading<span className="animate-bounce">...</span>
                </p>
            </div>
        </div>
    )
}

export default AppoitmentLoader
