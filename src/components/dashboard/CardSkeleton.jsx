import React from 'react'

const CardSkeleton = () => {
  return (
    <div className="w-full bg-white p-4 rounded-md  max-w-md  border border-[#E9EAEB] shadow-sm animate-pulse">
      {/* Header Area */}
      <div className="flex justify-between items-start mb-2">
        <div className="space-y-3 w-full">
          <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
          <div className="h-3 bg-gray-100 rounded-md w-1/2"></div>
        </div>
        <div className="h-6 w-16 bg-gray-100 rounded-full"></div>
      </div>

      {/* Content Area */}
      <div className="space-y-3 mb-1">
        <div className="h-3 bg-gray-100 rounded-md w-full"></div>
        <div className="h-3 bg-gray-100 rounded-md w-full"></div>
      </div>

    
    </div>
  )
}

export default CardSkeleton