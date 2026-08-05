import React from 'react'

export default function Toast({message}){
  if(!message) return null
  return (
    <div className='fixed bottom-6 right-6 bg-white/6 text-white px-4 py-2 rounded-xxl shadow-lg'>
      {message}
    </div>
  )
}
