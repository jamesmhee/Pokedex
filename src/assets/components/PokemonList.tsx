import React, { useEffect, useState, useMemo } from 'react'
import { getData, getPokeData, searchData } from '../../services/Getdata'
import Table from './Table'
import type { Row } from '@tanstack/react-table'
import { useQuery } from '@tanstack/react-query'
import { PokemonInterface } from '../utils/PokemonInterface'
import PokemonDetails from './PokemonDetails'
import useModal from '../../hooks/openModal'
import Loading from './Loading'

export interface IPokemonListProps {
  count: number
  next: string
  previous: any
  results: Result[]
}

export interface PaginationState{
  pageIndex: number,
  pageSize: number
}

export interface Result {
  name: string
  url: string
}

export interface IColumnsProps {
  columns: any
  data: PokemonInterface[]
  onClickRows: (event: React.SyntheticEvent, rows: Row<any>) => void
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;  
}

const PokemonList = () => {
  const [limit, setLimit] = useState<number>(10)
  const [offset, setOffset] = useState<number>(0)
  const [pokemonList, setPokemonList] = useState<IPokemonListProps>()
  const [pokemonData, setPokemonData] = useState<PokemonInterface[]>([])
  const [pokomonDetails, setPokemonDetails] = useState<PokemonInterface | undefined>()
  const [searchValue, setSearchValue] = useState<string>('')  
  
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
        cell: (info: {row: {original: {sprites: {front_default: string}}}})=>{                    
          return(
            <img src={info.row.original.sprites.front_default}></img>
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
          info.row.original.stats.map((elm)=>{
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
    ],
    [data, limit]
  )  

  const searchPoke = async () =>{    
    if(searchValue.length <= 0){
      const data = await getData(10, 0)
      if (data) {
        const fetchedData:PokemonInterface[] = await Promise.all(
          data.results.map(async (elm: Result) => {
            return await getPokeData(elm.url)
          })
        )
        setPokemonData(fetchedData)         
      }
    }else{
      const search:PokemonInterface = await searchData(searchValue)
      if(search){
        setPokemonData([search])
      }else{      
        setPokemonData([])
      }
    }
    
  }

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  useEffect(() => {
    refetch()
    // if (!data) {
    // }    
    // console.log(data, 'daa')
  }, [data, limit, offset, refetch])
 
  if (isLoading) return (
    <div className='w-full max-h-[90vh] h-[90vh] bg-slate-800'>
      <Loading/>
    </div>
  )

  if (error) return 'An error has occurred: ' + (error as Error).message

  return (
    <>
      {modal.isOpen ? <PokemonDetails data={pokomonDetails} toggle={modal.toggle}/> : ''}
        <div className='bg-black py-5 bg-opacity-70'>
          <h1 className='select-none text-5xl text-center rubik bg-gradient-to-br from-lime-500 via-yellow-300 to-lime-500 bg-clip-text text-transparent'>
            Pokédex          
          </h1>          
        </div>
        <div className='text-black w-full flex gap-2 py-2'>        
          <input className='w-full' onChange={(event)=>setSearchValue(event?.target.value)} type="text" value={searchValue}></input>
          <button className="border bg-slate-100 p-2 rubik rounded-md" onClick={searchPoke}>SEARCH</button>
        </div>
      <div className='max-w-full overflow-auto w-auto max-h-[calc(100vh_-_220px)]'>                     
        <Table
          columns={columns}
          data={pokemonData}
          pagination={pagination}
          setPagination={setPagination}
          onClickRows={(event, rows) => onClickRows(event, rows)}
        />
      </div>                  
      <div className="flex items-center gap-2">      
        <select
          value={limit}
          onChange={e => {
            setLimit(parseInt(e.target.value));
            console.log(e.target.value)
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select> 
        <div className='flex'>
          <button
            className="border rounded px-1 bg-white"
            onClick={() => {
              const num = offset-1
              setOffset(num)
            }}
            disabled={offset <= 0}
          >
            {'<'}
          </button>
          <button
            className="border rounded px-1 bg-white"
            onClick={() => {
              const num = offset+1
              setOffset(num)
            }}
            disabled={offset >= (pokemonList?.count ? pokemonList.count : offset )}
          >
          {'>'}
          </button>         
        </div>
    </div>       
    </>
  )
}

export default PokemonList
