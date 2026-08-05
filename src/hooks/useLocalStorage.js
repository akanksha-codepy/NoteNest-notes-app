import { useState } from 'react'

export default function useLocalStorage(key, initial){
  const [state, setState] = useState(()=>{
    try{
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) : initial
    }catch(e){
      return initial
    }
  })

  const set = (v)=>{
    try{
      setState(v)
      localStorage.setItem(key, JSON.stringify(v))
    }catch(e){
      console.error(e)
    }
  }

  return [state, set]
}
