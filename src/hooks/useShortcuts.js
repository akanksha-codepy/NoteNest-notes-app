import { useEffect } from 'react'

export default function useShortcuts(handlers={}){
  useEffect(()=>{
    const onKey = (e)=>{
      const combo = []
      if(e.ctrlKey || e.metaKey) combo.push('mod')
      if(e.shiftKey) combo.push('shift')
      combo.push(e.key.toLowerCase())
      const key = combo.join('+')
      if(handlers[key]){
        e.preventDefault()
        handlers[key](e)
      }
    }

    window.addEventListener('keydown', onKey)
    return ()=> window.removeEventListener('keydown', onKey)
  },[handlers])
}
