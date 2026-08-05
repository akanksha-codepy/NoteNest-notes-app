import React from 'react'
import { NotesProvider } from './context/NotesContext'
import Home from './pages/Home'

const App = () => {
  return (
    <NotesProvider>
      <Home />
    </NotesProvider>
  )
}

export default App