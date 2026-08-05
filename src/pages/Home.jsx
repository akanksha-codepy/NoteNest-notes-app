import { useMemo, useState } from 'react'
import { FaHeart, FaMoon, FaPlus, FaSearch, FaThumbtack } from 'react-icons/fa'
import NoteCard from '../components/NoteCard'
import NoteEditor from '../components/NoteEditor'
import { useNotesDispatch, useNotesState } from '../context/NotesContext'
import useShortcuts from '../hooks/useShortcuts'

export default function Home(){
  const state=useNotesState(), dispatch=useNotesDispatch(); const [openEditor,setOpenEditor]=useState(false),[editing,setEditing]=useState(null)
  useShortcuts({'mod+n':()=>{setEditing(null);setOpenEditor(true)}})
  const notes=useMemo(()=>{let items=[...state.notes];if(state.category==='Pinned')items=items.filter(n=>n.pinned);if(state.category==='Favorites')items=items.filter(n=>n.favorite);if(state.query){const q=state.query.toLowerCase();items=items.filter(n=>`${n.title} ${n.content}`.toLowerCase().includes(q))}return items.sort((a,b)=>Number(b.pinned)-Number(a.pinned)||b.createdAt-a.createdAt)},[state])
  const openNew=()=>{setEditing(null);setOpenEditor(true)}
  const filters=[{label:'All notes',value:state.notes.length,icon:<span className='all-symbol'>◌</span>,category:'All'},{label:'Pinned',value:state.notes.filter(n=>n.pinned).length,icon:<FaThumbtack/>,category:'Pinned'},{label:'Favorites',value:state.notes.filter(n=>n.favorite).length,icon:<FaHeart/>,category:'Favorites'}]
  return <div className='app-shell'>
    <header className='topbar'><div className='brand'><span className='brand-mark'>n</span><span>notenest</span></div><div className='top-actions'><span>{state.notes.length} notes saved</span><button className='ghost-button' onClick={()=>{if(state.notes.length&&window.confirm('Clear all notes?'))dispatch({type:'SET_NOTES',payload:[]})}}>Clear board</button><button className='icon-button' title='Theme'><FaMoon/></button></div></header>
    <div className='workspace'>
      <aside className='sidebar'><div className='rail-label'>VIEWS</div><div className='stat-list'>{filters.map(f=><button key={f.category} title={f.label} className={`stat-card ${state.category===f.category?'active':''}`} onClick={()=>dispatch({type:'SET_CATEGORY',payload:f.category})}><span className='stat-icon'>{f.icon}</span><span className='filter-copy'><span className='stat-label'>{f.label}</span><span className='stat-number'>{f.value}</span></span></button>)}</div></aside>
      <main className='notes-area'><div className='notes-heading'><div><div className='eyebrow'>IDEA BOARD</div><h1 className='content-title'>{state.query?'Search results':state.category==='All'?'All notes':state.category}</h1></div><div className='search-wrap'><FaSearch/><input className='search-input' value={state.query} onChange={e=>dispatch({type:'SET_QUERY',payload:e.target.value})} placeholder='Search the board...' />{state.query&&<button className='clear-search' onClick={()=>dispatch({type:'SET_QUERY',payload:''})}>×</button>}</div></div>{notes.length?<div className='notes-grid'>{notes.map(n=><NoteCard key={n.id} note={n} onEdit={()=>{setEditing(n);setOpenEditor(true)}}/>)}</div>:<div className='empty-state'><h3>No notes in this view</h3><p>Start a new thought, or choose another view.</p></div>}</main>
      <aside className='capture-panel'><div className='eyebrow'>QUICK ENTRY</div><h2>Make a note.</h2><p>Small ideas count too. Add one while it is fresh.</p><QuickCapture/></aside>
    </div>
    <button className='floating-add' onClick={openNew}><FaPlus/> New note</button><NoteEditor key={editing?.id||(openEditor?'new-note':'closed-editor')} open={openEditor} editing={editing} onClose={()=>{setOpenEditor(false);setEditing(null)}}/>
  </div>
}
function QuickCapture(){const dispatch=useNotesDispatch(),[title,setTitle]=useState(''),[content,setContent]=useState('');const submit=e=>{e.preventDefault();if(!title.trim()&&!content.trim())return;dispatch({type:'ADD_NOTE',payload:{id:`n_${Date.now().toString(36)}${Math.random().toString(36).slice(2,6)}`,title:title.trim()||'Untitled note',content:content.trim(),createdAt:Date.now(),pinned:false,favorite:false}});setTitle('');setContent('')};return <form className='quick-capture' onSubmit={submit}><input className='quick-input' value={title} maxLength='80' onChange={e=>setTitle(e.target.value)} placeholder='Note title'/><textarea className='quick-textarea' value={content} maxLength='500' onChange={e=>setContent(e.target.value)} placeholder='Write something...'/><div className='capture-footer'><span>{content.length}/500</span><button className='primary-button'>Add to board</button></div></form>}
