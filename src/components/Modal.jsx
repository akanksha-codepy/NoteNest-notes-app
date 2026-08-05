import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Modal({open, children, onClose}){
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className='fixed inset-0 z-50 flex items-center justify-center'>
          <div onClick={onClose} className='absolute inset-0 bg-black/50' />
          <motion.div initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} exit={{y:20, opacity:0}} className='relative z-10'>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
