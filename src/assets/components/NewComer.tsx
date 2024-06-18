import React, { MouseEventHandler } from 'react'
import Button2000 from './Button2000'

interface NewComerType {
    displayName: string,
    setDisplayName: React.Dispatch<React.SetStateAction<string>>,
    setHaveName: React.Dispatch<React.SetStateAction<boolean>>
}

const NewComer = ({displayName, setDisplayName, setHaveName}: NewComerType) => {
    
    const saveDisplayName:MouseEventHandler<HTMLButtonElement> = ():void =>{        
        if(displayName){
            setDisplayName(displayName)
            setHaveName(true)
            localStorage.setItem('name', displayName)                        
        }
    }

  return (
    <div className='flex gap-5 flex-col items-center rubik'>
        <label htmlFor='displayName' className='select-none text-xl sm:text-2xl md:text-5xl bg-gradient-to-br from-lime-500 via-yellow-500 to-lime-500 bg-clip-text text-transparent'>
            HELLO, Pokémon Trainer
        </label>
        <input onChange={((event)=>setDisplayName(event.target.value))} name="displayName" placeholder="Tell me what's your name" className="text-black uppercase text-xl sm:text-2xl md:text-2xl px-5 w-full rounded-xl h-[50px] focus:outline-0" type="text" value={displayName}></input>        
        <Button2000 props={saveDisplayName}/>
    </div>
  )
}

export default NewComer