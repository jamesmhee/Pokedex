import React from 'react'
import Layout from './Layout'

interface PokexProps {
  displayName: string
}

const PokeBox = ({displayName}:PokexProps) => {
  
  return (
    <Layout>
        <h1 className='select-none text-5xl text-center rubik bg-gradient-to-br from-lime-500 via-yellow-500 to-lime-500 bg-clip-text text-transparent'>
          Pokédex
        </h1>
        <span className='glory font-bold text-xl uppercase'>
          HI {displayName} Pokémon Trainer.          
        </span>
    </Layout>    
  )
}

export default PokeBox