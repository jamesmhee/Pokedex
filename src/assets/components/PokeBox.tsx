import React, {MouseEventHandler, useContext, useEffect, useState} from 'react'
import Layout from './Layout'
import { MdCatchingPokemon } from "react-icons/md";
import Profile from './Profile';
import PokemonList from './PokemonList';
import { StoreContext, Store } from '../utils/Store'
import { useNavigate } from 'react-router-dom';

const PokeBox = () => {
  const navigate = useNavigate()
  const getName:string | null = localStorage.getItem("name")
  const [ seeProfile, setSeeProfile ] = useState<boolean>(false)
  const { nameDisplay, setNameDisplay, favoritePoke, setFavoritePoke } = useContext(StoreContext)

  const viewProfile : MouseEventHandler<HTMLButtonElement> = () : void =>{
    if(seeProfile){
      setSeeProfile(false)
    }else{
      setSeeProfile(true)
    }
  }
  
  useEffect(()=>{
    if(getName){
      setNameDisplay(getName)
    }else{
      navigate('/')
    }
  })

  return (
    
    <>            
        <div>
          <PokemonList/>          
          {
            seeProfile ?
            <Profile/> : ''
          }
        </div>
        <button type="button" onClick={viewProfile} className={'rounded-t-xl bg-rose-500 absolute bottom-0 transition-all ' + ( seeProfile ? 'scale-125 right-5' : 'scale-100 right-2')}>
          <span className='text-white py-2 px-4 inline-flex gap-2 glory font-bold text-xl uppercase'>
            <MdCatchingPokemon className='my-auto'/> HELLO, &nbsp; {nameDisplay}
          </span>
        </button>
    </>    
    // <StoreContext>

    // </StoreContext>
  )
}

export default PokeBox