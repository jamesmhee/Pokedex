import React from 'react'
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { IColumnsProps } from './PokemonList';

const Table = ({ columns, data, onClickRows }: IColumnsProps) => {      
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),            
  });

  return (
    <>    
      <table className='max-w-full w-full table-auto bg-slate-50 text-center'>
        <thead className='sticky top-0'>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th className="p-5 bg-zinc-300" key={header.id}>                
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {
          data?.length <= 0 ? (
            <tbody>
              <tr>
                <td colSpan={columns.length}>                
                  <p className="flex items-center justify-center text-xs font-normal leading-[18px] text-[#8C8C8C]">
                    NOT FOUND
                  </p>
                </td>
              </tr>
            </tbody>
          ) :
          (
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr className="border hover:bg-zinc-200 cursor-pointer" key={row.id} onClick={(event) => onClickRows(event, row)}>
                {row.getVisibleCells().map((cell) => (
                  <td className="p-3" key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}                
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          )
        }    
      </table>      
    </>
  )
}

export default Table;
