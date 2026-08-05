

export default function Logo({className=''}){
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className='w-10 h-10 rounded-xxl flex items-center justify-center bg-linear-to-br from-purple-600 to-pink-500 shadow-lg'>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 12l4-4 4 4 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
      <div>
        <div className='font-semibold text-lg'>NoteNest</div>
        <div className='text-xs text-slate-300'>Your idea board</div>
      </div>
    </div>
  )
}
