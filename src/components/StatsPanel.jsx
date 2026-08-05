import React from 'react'
import { useNotesState } from '../context/NotesContext'

export default function StatsPanel(){
  const state = useNotesState()
  const total = state.notes.length
  const pinned = state.notes.filter(n=>n.pinned).length
  const fav = state.notes.filter(n=>n.favorite).length
  const categories = Array.from(new Set(state.notes.map(n=> n.category).filter(Boolean)))

  return (
    <div className='grid grid-cols-4 gap-4 mb-6'>
      <div className='glass-card p-4'>
        <div className='text-sm text-slate-400'>Total Notes</div>
        <div className='text-2xl font-semibold'>{total}</div>
      </div>
      <div className='glass-card p-4'>
        <div className='text-sm text-slate-400'>Pinned</div>
        <div className='text-2xl font-semibold'>{pinned}</div>
      </div>
      <div className='glass-card p-4'>
        <div className='text-sm text-slate-400'>Favorites</div>
        <div className='text-2xl font-semibold'>{fav}</div>
      </div>
      <div className='glass-card p-4'>
        <div className='text-sm text-slate-400'>Categories</div>
        <div className='text-2xl font-semibold'>{categories.length}</div>
      </div>
    </div>
  )
}
