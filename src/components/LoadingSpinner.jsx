import React from 'react'

export default function LoadingSpinner(){
  return (
    <div className='flex items-center justify-center p-6'>
      <div className='w-12 h-12 rounded-full border-4 border-t-transparent animate-spin border-white/30'></div>
    </div>
  )
}
