import React from 'react'
import { useReactTable, getCoreRowModel, getPaginationRowModel, flexRender } from '@tanstack/react-table';
import { IColumnsProps } from './PokemonList';

const Table = ({ columns, data, onClickRows }: IColumnsProps) => {    

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(), //load client-side pagination code
  });

  return (
    <table className='table-auto bg-slate-200 text-center'>
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
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr className="hover:bg-zinc-200 cursor-pointer" key={row.id} onClick={(event) => onClickRows(event, row)}>
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
    </table>
  )
}

export default Table;
