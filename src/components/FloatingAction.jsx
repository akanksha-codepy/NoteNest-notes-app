import React from 'react'
import { FaPlus } from 'react-icons/fa'

export default function FloatingAction({onClick}){
  return (
    <button onClick={onClick} className='fixed right-8 bottom-8 bg-gradient-to-br from-purple-600 to-pink-500 text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-3 z-50'>
      <FaPlus /> <span className='hidden sm:inline'>New note</span>
    </button>
  )
}
