import { useState } from 'react'
import Modal from './Modal'
import { useNotesDispatch } from '../context/NotesContext'
const uid = () => `n_${Date.now().toString(36)}${Math.random().toString(36).slice(2,8)}`
export default function NoteEditor({open, onClose, editing}){
  const dispatch = useNotesDispatch(); const [title, setTitle] = useState(editing?.title || ''); const [content, setContent] = useState(editing?.content || '')
  const submit = e => { e.preventDefault(); if (!title.trim() && !content.trim()) return; dispatch({type:editing ? 'EDIT_NOTE' : 'ADD_NOTE', payload:editing ? {...editing, title:title.trim() || 'Untitled note', content:content.trim()} : {id:uid(), title:title.trim() || 'Untitled note', content:content.trim(), createdAt:Date.now(), pinned:false, favorite:false}}); onClose() }
  return <Modal open={open} onClose={onClose}><form className='modal-panel' onSubmit={submit}><div className='eyebrow'>{editing ? 'REFINE NOTE' : 'NEW NOTE'}</div><input autoFocus value={title} onChange={e=>setTitle(e.target.value)} placeholder='A memorable title' /><textarea value={content} onChange={e=>setContent(e.target.value)} placeholder='Write your note...' /><div className='modal-actions'><button type='button' className='ghost-button' onClick={onClose}>Cancel</button><button className='primary-button'>Save note</button></div></form></Modal>
}
