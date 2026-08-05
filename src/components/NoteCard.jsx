import { FaHeart } from 'react-icons/fa'
import { useNotesDispatch } from '../context/NotesContext'

export default function NoteCard({note, onEdit}){
  const dispatch = useNotesDispatch()
  const copy = async () => { try { await navigator.clipboard.writeText(`${note.title}\n\n${note.content}`) } catch { /* Clipboard might be unavailable on non-secure previews. */ } }
  return <article className={`note-card ${note.pinned ? 'is-pinned' : ''}`}>
    <div className='card-top'>{note.pinned ? <span className='pinned-label'>Pinned</span> : <span /> }<button aria-label='Toggle favorite' onClick={() => dispatch({type:'TOGGLE_FAV', payload:note.id})} className={`heart-button ${note.favorite ? 'favorited' : ''}`}><FaHeart /></button></div>
    <h3>{note.title}</h3><p>{note.content || 'No additional details yet.'}</p>
    <div className='card-bottom'><span>Created {new Date(note.createdAt).toLocaleDateString(undefined, {month:'short', day:'numeric', year:'numeric'})}</span><div className='card-actions'><button onClick={() => dispatch({type:'TOGGLE_PIN', payload:note.id})}>{note.pinned ? 'Unpin' : 'Pin'}</button><button onClick={copy}>Copy</button><button onClick={onEdit}>Edit</button><button className='delete' onClick={() => dispatch({type:'DELETE_NOTE', payload:note.id})}>Delete</button></div></div>
  </article>
}
