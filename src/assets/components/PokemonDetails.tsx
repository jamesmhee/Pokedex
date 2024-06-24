import React, { useEffect, useRef, MutableRefObject, useState, useContext, useCallback } from 'react'
import {PokemonInterface} from "../utils/PokemonInterface"
import { GrClose } from "react-icons/gr";
import { useResize } from "../../hooks/useResize.tsx"
import { MdFavoriteBorder,MdFavorite } from "react-icons/md";
import { StoreContext } from "../utils/Store.tsx"

interface IModalProps {
    data?: PokemonInterface
    toggle: ()=> void
}

const PokemonDetails = ({data, toggle}:IModalProps) => {            
    const favoriteList = localStorage.getItem("favorite")
    const componentRef:MutableRefObject<HTMLDivElement | null> = useRef(null)
    const { width, height } = useResize(componentRef);
    const [ isMobile, setIsMobile ] = useState<boolean>(true)
    const { favoritePoke, setFavoritePoke } = useContext(StoreContext)
    const [ isFavorite, setIsFavorite ] = useState<boolean>(false)
    let sumTotal:number = 0
    const totalColor = () =>{
        if(sumTotal >= 500){
            return 'bg-rose-700'
        }else{
            return 'bg-lime-300 text-zinc-800'
        }
    }

    const currentFavorites = JSON.parse(localStorage.getItem('favorite') || '[]');
    const saveFavorite = (id: number | undefined) => {
        if (id === undefined) return;
                

        if (!isFavorite) {
            const updatedFavorites = [...currentFavorites, id];
            setFavoritePoke(updatedFavorites);
            localStorage.setItem('favorite', JSON.stringify(updatedFavorites));
            setIsFavorite(true);
        } else {
            const updatedFavorites = currentFavorites.filter((favoriteId: number) => favoriteId !== id);
            setFavoritePoke(updatedFavorites);
            localStorage.setItem('favorite', JSON.stringify(updatedFavorites));
            setIsFavorite(false);
        }
    };

    const getFavorite = useCallback(()=>{
        if(currentFavorites !== '[]'){
            currentFavorites.map((elm:number)=>{
                if(elm === data?.id){
                    setIsFavorite(true)
                }
            })
        }
    }, [currentFavorites])

    useEffect(()=>{    
        getFavorite()
        let width_first = window.innerWidth
        if(width !== 0) width_first = width
        
        if(width_first > 680){
            setIsMobile(true)
        }else{
            setIsMobile(false)
        }        
    }, [width, height, getFavorite])

  return (
      <div ref={componentRef} className='fixed flex items-center mx-auto justify-center inset-0 w-full h-full bg-slate-500 bg-opacity-50 z-[99]'>
        <div className='rounded-md bg-white w-[calc(100vw_-_50px)] h-[500px] sm:h-[calc(100vh_-_200px)] flex justify-center'>                        
            <div className='flex flex-col h-full w-full'>
                <div className='flex w-full justify-between p-2'>                                        
                    <button onClick={()=>saveFavorite(data?.id)} className="text-2xl rounded-[50px] w-fit p-2 text-rose-500">{!isFavorite ? <MdFavoriteBorder/> : <MdFavorite/>}</button>                    
                    <button className='rounded-[50px] w-fit p-2' onClick={toggle}><GrClose/></button>
                </div>
                <div className="flex-col sm:flex-row flex justify-center items-center w-full gap-5 h-full overflow-auto">
                    <div className={!isMobile ? 'hidden' : 'flex flex-col h-auto sm:mt-0 sm:flex-col'}>
                        <div className='flex flex-col'>
                            <div className='glory text-lg sm:text-2xl flex w-full h-full p-5'>
                                <span className='font-bold'>Height : </span>
                                &nbsp; {data?.height} CM      
                            </div>
                            <div className='glory text-lg sm:text-2xl flex w-full p-5'>
                                <span className='font-bold'>Weight : </span>
                                &nbsp; {data?.weight} KG       
                            </div>
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
                    <div className='mt-[550px] sm:mt-0 md:mt-0 flex flex-col p-3 shadow w-auto sm:w-[450px] items-center justify-center'>
                        <h1 className='uppercase w-full rubik text-center font-bold text-2xl rounded-md bg-zinc-200 p-2 px-5'>
                            {data?.name}                    
                        </h1>                    
                        <img loading="lazy" className="w-[250px] h-[250px]" src={data?.sprites.front_default}></img>
                    </div>
                    <div className='flex flex-col gap-2 px-5'>                             
                        {data?.stats.map((elm,index)=>{                                   
                            sumTotal += elm.base_stat     
                            const value = () =>{
                                if(elm.base_stat <= 48){
                                    return 'bg-green-300'
                                }else if(elm.base_stat >= 49 && elm.base_stat <= 59){
                                    return 'bg-yellow-300'
                                }else if(elm.base_stat >= 60 && elm.base_stat <= 79){
                                    return 'bg-rose-400'
                                }else if(elm.base_stat >= 80){
                                    return 'bg-rose-600'
                                }
                            }                            
                            return (
                                <div key={index} className='flex gap-5'>
                                    <div className='w-full'>
                                        <span className='uppercase glory font-bold'>
                                            {elm.stat.name} :
                                        </span>
                                    </div>
                                    <div className='w-full'>
                                        <div className="w-52 sm:w-72 p-1 bg-white rounded-xl shadow-md overflow-hidden">
                                            <div className="relative h-6 flex items-center justify-center">
                                            <div className={`absolute top-0 bottom-0 left-0 rounded-lg `+ value()} style={{ width: `${elm.base_stat}%` }}></div>
                                            <div className="relative text-zinc-800 font-medium text-sm">{elm.base_stat}</div>                                            
                                            </div>
                                        </div>
                                    </div>                                         
                                </div>
                            )
                        })}
                        <div className='flex gap-5'>
                            <div className='w-full'>
                                <span className='uppercase glory font-bold'>
                                    TOTAL :
                                </span>
                            </div>
                            <div className='w-full'>
                                <div className="w-52 sm:w-72 p-1 bg-white rounded-xl shadow-md overflow-hidden">
                                    <div className="relative h-6 flex items-center justify-center">
                                    <div className={`absolute top-0 bottom-0 left-0 rounded-lg ` + totalColor()} style={{ width: `${sumTotal}%` }}></div>
                                    <div className="relative font-medium text-sm">{sumTotal}</div>                                            
                                    </div>
                                </div>
                            </div>                                         
                        </div>                        
                    </div>
                    <div className={isMobile ? 'hidden' : 'flex flex-col sm:flex-row h-auto sm:mt-0'}>
                        <div className='flex flex-row sm:flex-col'>
                            <div className='flex flex-col w-full'>
                                <div className='glory text-lg sm:text-2xl flex w-full h-full p-5'>
                                    <span className='font-bold'>Height : </span>
                                    &nbsp; {data?.height} CM      
                                </div>
                                <div className='glory text-lg sm:text-2xl flex w-full p-5'>
                                    <span className='font-bold'>Weight : </span>
                                    &nbsp; {data?.weight} KG       
                                </div>
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
                </div>
            </div>
        </div>
    </div>
  )
}

export default PokemonDetails