import React, { useCallback, useEffect, useState, useMemo } from 'react'
import { getData } from '../../services/Getdata'
import Table from './Table'
import type { Row } from '@tanstack/react-table';

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
  data: Result[]
  onClickRows: (event:React.SyntheticEvent, rows:Row<any>) => void
}

const onClickRows = (event:any, rows:{original:Result}) =>{
  console.log(rows?.original)
}

const PokemonList = () => {  
  const [limit, setLimit] = useState<number>(10)
  const [offset, setOffset] = useState<number>(0)  
  const [pokemonList, setPokemonList] = useState<IPokemonListProps>()

  const columns = useMemo(() => [
    {
      header: 'NAME',
      accessorKey: 'name',      
    },
    {
      header: 'URL',
      accessorKey: 'url',
    },
  ], []);

  const callback = useCallback(async ()=>{
    const data = await getData(limit, offset)         
    console.log(data)
    setPokemonList(data)
  }, [pokemonList])

  useEffect(()=>{
    callback()
  }, [])

  return (
    <div>
      <Table columns={columns} data={pokemonList?.results ?? []} onClickRows={(event, rows)=>onClickRows(event, rows)}/>
    </div>
  )
}

export default PokemonList