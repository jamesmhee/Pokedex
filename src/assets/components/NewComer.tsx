import React, { MouseEventHandler, useContext, useEffect } from 'react'
import Button2000 from './Button2000'
import { StoreContext } from '../utils/Store'
import { useNavigate } from 'react-router-dom';

const NewComer = () => {
    const navigate = useNavigate()

    const getName: string | null = localStorage.getItem("name");
    const { nameDisplay, setNameDisplay, isHaveName, setIsHaveName } = useContext(StoreContext)    

    const saveDisplayName:MouseEventHandler<HTMLButtonElement> = ():void =>{                
        if(nameDisplay){
            localStorage.setItem("name", nameDisplay)
            setIsHaveName(true)            
            navigate('/Home')             
        }
    }

    useEffect(()=>{        
        if(getName){            
            setNameDisplay(getName)
            setIsHaveName(true)
            navigate('/Home')
        }
    },[])

  return (
    <div className='flex gap-5 flex-col items-center justify-center rubik h-full'>
        <label htmlFor='displayName' className='select-none text-3xl sm:text-5xl md:text-5xl bg-gradient-to-br from-lime-500 via-yellow-500 to-lime-500 bg-clip-text text-transparent'>
            HELLO, Pokémon Trainer            
        </label>
        <input onChange={((event)=>setNameDisplay(event.target.value))} name="displayName" placeholder="Tell me what's your name" className="text-black uppercase text-xl sm:text-2xl md:text-2xl px-5 w-[calc(100%_-_20px)] max-w-[700px] rounded-xl h-[50px] focus:outline-0" type="text" value={nameDisplay}></input>        
        <Button2000 props={saveDisplayName}/>
    </div>
  )
}

export default NewComer