import React, { useCallback, useEffect, useState, useMemo } from 'react'
import { getData, getPokeData } from '../../services/Getdata'
import Table from './Table'
import type { Row } from '@tanstack/react-table'
import { useQuery } from '@tanstack/react-query'
import { PokemonInterface } from '../utils/PokemonInterface'
import PokemonDetails from './PokemonDetails'
import useModal from '../../hooks/openModal'

export interface IPokemonListProps {
  count: number
  next: string
  previous: any
  results: Result[]
}

export interface Result {
  name: string
  url: string
}

export interface IColumnsProps {
  columns: any
  data: PokemonInterface[]
  onClickRows: (event: React.SyntheticEvent, rows: Row<any>) => void
}

const PokemonList = () => {
  const [limit, setLimit] = useState<number>(10)
  const [offset, setOffset] = useState<number>(0)
  const [pokemonList, setPokemonList] = useState<IPokemonListProps>()
  const [pokemonData, setPokemonData] = useState<PokemonInterface[]>([])
  const [pokomonDetails, setPokemonDetails] = useState<PokemonInterface | undefined>()
  
  const modal = useModal()

  const onClickRows = (event: any, rows: { original: Result }) => {
    modal.toggle()
    const value = rows.original as PokemonInterface
    setPokemonDetails(value)
  }

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['repoData', limit, offset],
    queryFn: async () => {
      const data = await getData(limit, offset)
      if (data) {
        const fetchedData = await Promise.all(
          data.results.map(async (elm: Result) => {
            return await getPokeData(elm.url)
          })
        )
        setPokemonData(fetchedData)
        setPokemonList(data)
      }
      return data
    },
    enabled: false
  })

  const columns = useMemo(
    () => [
      {
        header: '#',        
        id: 'index',
        cell: (info: {row: {original: {sprites: {back_default: string}}}})=>{                    
          return(
            <img src={info.row.original.sprites.back_default}></img>
          )
        }
      },
      {
        header: 'Pokemon name',        
        accessorKey: 'name',
      },
      {
        header: 'TYPE',        
        cell: (info: {row: {original: {types: {slot:number, type: {name: string, url:string}}[]}}})=>{                                        
          return(
            info.row.original.types.map((elm, index)=>{              
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
              return (<p className={type() + ' border-2 p-2 rounded-md'} key={index}>{elm.type.name}</p>)                            
            })
          )
        }
      },
      {
        header: 'TOTAL',        
        cell: (info: {row: {original: {stats:{base_stat: number}[]}}})=>{                                                                               
          let sum = 0
          info.row.original.stats.map((elm,index)=>{
            sum += elm.base_stat            
            return sum
          })           
          return <p className='border p-2'>{sum}</p>
        }
      },
      {
        header: 'HP',        
        cell: (info: {row: {original: {stats:{base_stat: number, stat: {name:string}}[]}}})=>{                                                                                                   
          return <p>{info.row.original.stats[0].base_stat}</p>
        }
      },
      {
        header: 'ATTACK',        
        cell: (info: {row: {original: {stats:{base_stat: number, stat: {name:string}}[]}}})=>{                                                                                                   
          return <p>{info.row.original.stats[1].base_stat}</p>
        }
      },
      {
        header: 'DEFENSE',        
        cell: (info: {row: {original: {stats:{base_stat: number, stat: {name:string}}[]}}})=>{                                                                                                   
          return <p>{info.row.original.stats[2].base_stat}</p>
        }
      },
      {
        header: 'SPECIAL ATTACK',        
        cell: (info: {row: {original: {stats:{base_stat: number, stat: {name:string}}[]}}})=>{                                                                                                   
          return <p>{info.row.original.stats[3].base_stat}</p>
        }
      },
      {
        header: 'SPECIAL DEFENSE',        
        cell: (info: {row: {original: {stats:{base_stat: number, stat: {name:string}}[]}}})=>{                                                                                         
          return <p>{info.row.original.stats[4].base_stat}</p>
        }
      },
      {
        header: 'SPEED',        
        cell: (info: {row: {original: {stats:{base_stat: number, stat: {name:string}}[]}}})=>{                                                                                         
          return <p>{info.row.original.stats[5].base_stat}</p>
        }
      },
      {
        header: 'FAVORITE',
        cell: ((info)=>{                    
          return 'f'
        })
      }
    ],
    []
  )  

  useEffect(() => {
    if (!data) {
      refetch()
    }
    console.log(pokemonData)
  }, [data, refetch])

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + (error as Error).message

  return (
    <div className='overflow-auto w-auto max-h-[calc(100vh_-_200px)]'>                 
    {modal.isOpen ? <PokemonDetails data={pokomonDetails} toggle={modal.toggle}/> : ''}
      <Table
        columns={columns}
        data={pokemonData}
        onClickRows={(event, rows) => onClickRows(event, rows)}
      />
    </div>
  )
}

export default PokemonList
