import React from 'react'
import {PokemonInterface} from "../utils/PokemonInterface"
import { GrClose } from "react-icons/gr";


interface IModalProps {
    data?: PokemonInterface
    toggle: ()=> void
}

const PokemonDetails = ({data, toggle}:IModalProps) => {
  return (
      <div className='fixed flex items-center mx-auto justify-center inset-0 w-full h-full bg-slate-500 bg-opacity-50 z-[99]'>
        <div className='rounded-md bg-white w-[calc(100vw_-_50px)] h-[calc(100vh_-_200px)] flex justify-center'>                        
            <div className='flex flex-col h-full w-full'>
                <div className='flex justify-end p-2'>
                    <button className='rounded-[50px] w-fit p-2' onClick={toggle}><GrClose/></button>
                </div>
                <div className='flex-col sm:flex-row flex justify-center items-center w-full gap-5 h-full overflow-auto'>
                    <div className='flex flex-col'>
                        <div className='glory text-2xl flex w-full p-5'>
                            <span className='font-bold'>Height : </span>
                            &nbsp; {data?.height} KG       
                        </div>
                        <div className='glory text-2xl flex w-full p-5'>
                            <span className='font-bold'>Weight : </span>
                            &nbsp; {data?.weight} KG       
                        </div>
                        <div className='glory text-2xl flex flex-col w-full p-5'>
                            <span className='font-bold w-full'>Abilities : </span>
                            <div className='flex flex-col text-center gap-2 w-full justify-center'>                                
                                {data?.abilities.map((elm,index)=>{                                                                    
                                    return (
                                        <p key={index} className="uppercase rounded-md p-2 bg-zinc-100">{elm.ability.name}</p>
                                    )
                                })}
                            </div>
                        </div>
                        <div className='glory text-2xl flex flex-col w-full p-5'>
                            <span className='font-bold w-full'>Type : </span>
                            <div className='flex flex-col text-center gap-2 w-full justify-center'>                                
                                {data?.types.map((elm,index)=>{                                            
                                    const type = () => {
                                        if(elm.type.name === 'grass'){                                            
                                          return 'bg-green-500 text-black'
                                        }else if(elm.type.name === 'poison'){
                                          return 'bg-violet-900	text-white'
                                        }else if(elm.type.name === 'fire'){
                                          return 'bg-rose-900	text-white'
                                        }else if(elm.type.name === 'water'){
                                          return 'bg-blue-700	text-white'
                                        }else if(elm.type.name === 'flying'){
                                          return 'bg-blue-300	text-black'
                                        }else if(elm.type.name === 'bug'){
                                          return 'bg-zinc-300	text-white'
                                        }else{                                            
                                          return 'bg-orange-300 text-white'                                          
                                        }
                                    }               
                                    return (
                                        <p key={index} className={'uppercase rounded-md p-2 ' + type()}>{elm.type.name}</p>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col p-3 shadow w-[450px] items-center justify-center'>
                        <h1 className='uppercase w-full rubik text-center font-bold text-2xl rounded-md bg-zinc-200 py-2 px-5'>
                            {data?.name}                    
                        </h1>                    
                        <img loading="lazy" className="w-[250px] h-[250px]" src={data?.sprites.back_default}></img>
                    </div>
                    <div className='flex flex-col'>
                        <div className='glory text-2xl flex w-full p-5'>
                            <span className='font-bold'>Height :</span>
                            {data?.height} KG       
                        </div>
                        <div className='glory text-2xl flex w-full p-5'>
                            <span className='font-bold'>Weight :</span>
                            {data?.weight} KG       
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PokemonDetails