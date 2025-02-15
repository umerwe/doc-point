import React from 'react'

const AppoitmentLoader = () => {
    return (
        <div className="flex flex-col gap-4 py-4 border-b animate-pulse">
        <div className="flex gap-4">
          <div className="w-28 min-[721px]:w-36 bg-gray-300 rounded-lg h-24"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-300 w-1/2 rounded"></div>
            <div className="h-4 bg-gray-300 w-1/3 rounded"></div>
            <div className="h-4 bg-gray-300 w-2/3 rounded"></div>
          </div>
        </div>
      </div>
    )
}

export default AppoitmentLoader
