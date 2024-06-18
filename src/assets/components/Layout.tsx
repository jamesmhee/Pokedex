import React from 'react'

interface LayoutType {
    children: React.ReactNode
}

const Layout = ({children}:LayoutType) => {
  return (
    <div className='p-5 bg-home relative w-screen h-screen max-w-screen max-h-screen border-s-slate-50 border-t-slate-50 border border-r-zinc-500 border-b-zinc-500 border-r-4 border-b-4 bg-slate-400 bg-opacity-50'>
        {children} 
    </div>
  )
}

export default Layout