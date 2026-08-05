import React, { useState } from 'react'
import Logo from './Logo'
import { useNotesState, useNotesDispatch } from '../context/NotesContext'
import { FaSun, FaMoon, FaSearch } from 'react-icons/fa'

export default function Sidebar(){
  const state = useNotesState()
  const dispatch = useNotesDispatch()
  const [quickTitle, setQuickTitle] = useState('')
  const [quickContent, setQuickContent] = useState('')

  const total = state.notes.length
  const pinned = state.notes.filter(n=>n.pinned).length

  const uid = ()=> 'n_' + Date.now().toString(36) + Math.random().toString(36).slice(2,6)
  const submitQuick = (e)=>{
    e?.preventDefault()
    if(!quickTitle && !quickContent) return
    const note = { id: uid(), title: quickTitle || 'Untitled', content: quickContent || '', createdAt: Date.now(), pinned:false, favorite:false, color: null }
    dispatch({type:'ADD_NOTE', payload:note})
    setQuickTitle('')
    setQuickContent('')
  }

  return (
    <aside className='w-80 p-6 hidden lg:block'>
      <div className='space-y-6'>
        <div className='glass-card p-6'>
          <Logo />
        </div>

        <div className='glass-card p-6'>
          <h2 className='text-2xl font-bold'>Keep the good ideas close.</h2>
          <p className='text-sm text-slate-300 mt-2'>A quiet place to collect every thought, task, and spark of inspiration.</p>
          <div className='mt-4 grid gap-3'>
            <div className='p-3 rounded-xxl bg-white/3'>
              <div className='text-sm text-slate-300'>Pinned notes</div>
              <div className='text-lg font-semibold'>{pinned}</div>
            </div>
            <div className='p-3 rounded-xxl bg-white/3'>
              <div className='text-sm text-slate-300'>Favorites</div>
              <div className='text-lg font-semibold'>{state.notes.filter(n=>n.favorite).length}</div>
            </div>
          </div>
        </div>

        <form onSubmit={submitQuick} className='glass-card p-6'>
          <div className='text-xs font-semibold text-slate-300 mb-2'>QUICK CAPTURE</div>
          <input value={quickTitle} onChange={(e)=>setQuickTitle(e.target.value)} placeholder='A memorable title' className='w-full bg-transparent border-b border-white/6 pb-2 mb-3 focus:outline-none' />
          <textarea value={quickContent} onChange={(e)=>setQuickContent(e.target.value)} placeholder='Start writing something wonderful...' className='w-full bg-transparent h-24 resize-none focus:outline-none'></textarea>
          <div className='flex items-center justify-between mt-3'>
            <div className='text-xs text-slate-400'>0/500</div>
            <button type='submit' className='px-4 py-2 bg-gradient-to-br from-purple-600 to-pink-500 rounded-xxl shadow-lg text-white'>Add note →</button>
          </div>
        </form>

        <div className='glass-card p-4'>
          <label className='relative block'>
            <span className='sr-only'>Search</span>
            <input onChange={(e)=>dispatch({type:'SET_QUERY', payload:e.target.value})} placeholder='Search your notes...' className='w-full pl-10 pr-3 py-2 rounded-xxl bg-transparent border border-white/6 focus:outline-none' />
            <FaSearch className='absolute left-3 top-2.5 text-slate-300' />
          </label>
        </div>

        <div className='glass-card p-4 flex items-center justify-between'>
          <div className='text-sm text-slate-300'>Theme</div>
          <div className='flex items-center gap-3'>
            <button className='p-2 rounded-xxl glass-card'><FaSun /></button>
            <button className='p-2 rounded-xxl glass-card'><FaMoon /></button>
          </div>
        </div>
      </div>
    </aside>
  )
}
