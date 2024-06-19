import React from 'react'
import '../../App.css'

const Loading = () => {
  return (
    <div className='w-full flex gap-2 flex-col items-center justify-center h-full'>
      <div className="loader"></div>
      <p className='text-white'>LOADING...</p>
    </div>
  )
}

export default Loading