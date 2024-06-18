import React, {MouseEventHandler, useState} from 'react'
import Layout from './Layout'
import { MdCatchingPokemon } from "react-icons/md";
import Profile from './Profile';
import PokemonList from './PokemonList';

interface PokexProps {
  displayName: string
}

const PokeBox = ({displayName}:PokexProps) => {

  const [ seeProfile, setSeeProfile ] = useState<boolean>(false)

  const viewProfile : MouseEventHandler<HTMLButtonElement> = () : void =>{
    if(seeProfile){
      setSeeProfile(false)
    }else{
      setSeeProfile(true)
    }
  }
  
  return (
    <Layout>
        <h1 className='select-none text-5xl text-center rubik bg-gradient-to-br from-lime-500 via-yellow-300 to-lime-500 bg-clip-text text-transparent'>
          Pokédex
        </h1>
        <div>
          <PokemonList/>          
          {
            seeProfile ?
            <Profile/> : ''
          }
        </div>
        <button type="button" onClick={viewProfile} className={'rounded-t-xl bg-rose-500 absolute bottom-0 transition-all ' + ( seeProfile ? 'scale-125 right-5' : 'scale-100 right-2')}>
          <span className='text-white py-2 px-4 inline-flex gap-2 glory font-bold text-xl uppercase'>
            <MdCatchingPokemon className='my-auto'/> HELLO, &nbsp; {displayName}
          </span>
        </button>
    </Layout>    
  )
}

export default PokeBox