import React from 'react'

interface LayoutType {
    children: React.ReactNode
}

const Layout = ({children}:LayoutType) => {
  return (
    <div className='w-screen h-[95%] p-5 m-4 border-s-slate-50 border-t-slate-50 border border-r-zinc-500 border-b-zinc-500 border-r-4 border-b-4 bg-slate-400 bg-opacity-50'>
        {children}
    </div>
  )
}

export default Layout