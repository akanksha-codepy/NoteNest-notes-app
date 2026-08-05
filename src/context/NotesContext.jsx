import React, { createContext, useContext, useReducer, useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const NotesStateContext = createContext()
const NotesDispatchContext = createContext()

const initialState = {
  notes: [],
  query: '',
  category: 'All',
}

function notesReducer(state, action){
  switch(action.type){
    case 'SET_NOTES':
      return {...state, notes: action.payload}
    case 'ADD_NOTE':
      return {...state, notes: [action.payload, ...state.notes]}
    case 'EDIT_NOTE':
      return {...state, notes: state.notes.map(n=> n.id===action.payload.id? action.payload : n)}
    case 'DELETE_NOTE':
      return {...state, notes: state.notes.filter(n=> n.id!==action.payload)}
    case 'TOGGLE_PIN':
      return {...state, notes: state.notes.map(n=> n.id===action.payload? {...n, pinned: !n.pinned} : n)}
    case 'TOGGLE_FAV':
      return {...state, notes: state.notes.map(n=> n.id===action.payload? {...n, favorite: !n.favorite} : n)}
    case 'SET_QUERY':
      return {...state, query: action.payload}
    case 'SET_CATEGORY':
      return {...state, category: action.payload}
    default:
      return state
  }
}

export const NotesProvider = ({children})=>{
  const [stored, setStored] = useLocalStorage('notenest:v1', [])
  const [state, dispatch] = useReducer(notesReducer, {...initialState, notes: stored})

  useEffect(()=>{
    setStored(state.notes)
  },[state.notes])

  return (
    <NotesStateContext.Provider value={state}>
      <NotesDispatchContext.Provider value={dispatch}>
        {children}
      </NotesDispatchContext.Provider>
    </NotesStateContext.Provider>
  )
}

export const useNotesState = ()=> useContext(NotesStateContext)
export const useNotesDispatch = ()=> useContext(NotesDispatchContext)
