import React from 'react'
import illustration from '../assets/illustration.svg'

export default function EmptyState(){
  return (
    <div className='glass-card p-8 text-center'>
      <img src={illustration} alt="empty" className='mx-auto w-48 mb-6' />
      <h3 className='text-xl font-semibold'>No notes yet</h3>
      <p className='text-slate-300'>Create your first note to get started.</p>
    </div>
  )
}
