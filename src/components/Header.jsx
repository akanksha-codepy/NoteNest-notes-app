
import { FaPlus } from 'react-icons/fa'

export default function Header({onCreate}){
  return (
    <header className='flex items-center justify-between mb-6'>
      <div>
        <h1 className='text-3xl font-bold'>Your Notes</h1>
        <p className='text-sm text-slate-300'>Organize ideas, tasks and thoughts</p>
      </div>
      <div>
        <button onClick={onCreate} className='inline-flex items-center gap-3 bg-linear-to-br from-purple-600 to-pink-500 px-4 py-2 rounded-xxl shadow-lg'>
          <FaPlus /> <span>Create New Note</span>
        </button>
      </div>
    </header>
  )
}
