import React, { Fragment, useEffect, useState } from 'react'



import "./CartPage.scss"
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { Container, Typography } from '@mui/material'

// import { styled } from '@mui/material/styles';
import { loadCartFromLocalstore } from '../../redux/reducers/cartReducer'

// import { useReactTable } from '@tanstack/react-table'

import {
  Column,
  Table,
  useReactTable,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  // getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  // getPaginationRowModel,
  // sortingFns,
  getSortedRowModel,
  // FilterFn,
  // SortingFn,
  // ColumnDef,
  flexRender,
  // FilterFns,
  // createColumnHelper,
  // ColumnResizeMode,
 
} from '@tanstack/react-table'
import EditableCell from './EditableCell'
import QuandityCell from './QuandityCell'





const CartPage = () => {
  const dispatch= useDispatch<AppDispatch>()
  const {orderItems} =useSelector((state:RootState)=>state.cart)

  const [tableData, setdataTable] = useState<ORderITemType[]>([])
 

  const [columFilter22, setcolumFilter22] = useState<ColumnFiltersState>([])
  const [sortingTable, setsortingTable] = useState<any[]>([])



  interface ORderITemType{
    name:string,
    productId:string,
    price:number,
    qty:number
  }

  // const columnHelper = createColumnHelper<ORderITemType>();
  const columns = [   {
    accessorKey:"productId",
    header:"product identiier",
    size:225,
    cell:(props:any)=>{

    return (<p>{props.getValue()}</p>)}
  },
  {
    accessorKey:"name",
    header:"product name",
    cell: EditableCell
  },
  {
    accessorKey:"price",
    header:"product price",
    cell:(props:any)=><p>{props.getValue()}</p>
  }, {
    accessorKey:"qty",
    header:"product qty",
    cell:QuandityCell
  },
  {
    accessorKey:"image",
    header:"product image",
    cell:(props:any)=><img src={props.getValue()} style={{width:"40%", }}/>
  },

]
  


const table = useReactTable({
  data:tableData,
  columns,
  state:{
   columnFilters:columFilter22,
   sorting:sortingTable,
   
  },
  getCoreRowModel:getCoreRowModel(),
  getFilteredRowModel:getFilteredRowModel(),

  columnResizeMode:"onChange",
  debugTable: true,
  debugHeaders: true,
  debugColumns: true,
  getFacetedUniqueValues: getFacetedUniqueValues(),
  getFacetedMinMaxValues: getFacetedMinMaxValues(),
  getSortedRowModel: getSortedRowModel(),
  meta:{
    updateData: (rowIndex:number, columnId:number,value:string)=>setdataTable((prev)=>
      prev.map((row,index)=>
       index == rowIndex?{...prev[rowIndex],[columnId]:value}:row
      )
       
    )
  },
  onColumnFiltersChange:setcolumFilter22,
  onSortingChange:setsortingTable,


})



useEffect(() => {
  dispatch(loadCartFromLocalstore())
  
  }, [])
useEffect(() => {
  setdataTable(orderItems)

}, [orderItems])

  return (
   <Fragment>
         <Container sx={{width:"100vw",overflowX:"scroll"}} >
           <Typography textAlign={"center"} variant='h3'>Cart items</Typography>



<div className="maindiv_cartlist">

  



  <table className="table"  style={{width:table.getTotalSize()}}>
  <thead>
    {table.getHeaderGroups().map(headerGroup=><tr className="tr" key={headerGroup.id}>
      {
        headerGroup.headers.map( header=> <th 
          {...{
            key: header.id,
            colSpan: header.colSpan,
            style: {
              width: header.getSize(),
            },
          }}
         className="th"  key={header.id}
         onClick={header.column.getToggleSortingHandler()}
         >
          <>
       <div>
       {flexRender(header.column.columnDef.header, header.getContext())}
       {{asc:"-UP", desc:"-DOWN", null:""}[header.column.getIsSorted() ==="asc"?"asc":header.column.getIsSorted() ==="desc"?"desc":"null"]}
       </div>
      
      
        

                  <div
                      {...{
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                        className: `resizer ${
                          header.column.getIsResizing() ? 'isResizing' : ''
                        }`,
                        
                      }}
                    />



                         {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} table={table} />
                          </div>
                        ) : null}

                    
               
                   
</>     
      
        </th> )
   
      
   
   }



    </tr>
    
  
    )}
   
    </thead>
    <tbody>
    {table.getRowModel().rows.map(row=><tr  className="tr" key={row.id}>{row.getVisibleCells().map(cell=>
    <td  className="td" 
    
    {...{
      key: cell.id,
      style: {
        width: cell.column.getSize(),
     

      },
    }}
    
    
    
    >
       {
        flexRender(
          cell.column.columnDef.cell,
          cell.getContext()
        )
       }
    </td>)}
    </tr>)}

    </tbody>
  </table>





  </div>





         </Container>
   </Fragment>
  )
}

export default CartPage










function Filter({
  column,
  table,
}: {
  column: Column<any, unknown>
  table: Table<any>
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()

  const sortedUniqueValues = React.useMemo(
    () =>
      typeof firstValue === 'number'
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  )



  return typeof firstValue === 'number' ? (
    <div>
      <div className="flex space-x-2">
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[0] ?? ''}
          onChange={value =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder={`Min ${
            column.getFacetedMinMaxValues()?.[0]
              ? `(${column.getFacetedMinMaxValues()?.[0]})`
              : ''
          }`}
          className="w-24 border shadow rounded"
        />
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[1] ?? ''}
          onChange={value =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder={`Max ${
            column.getFacetedMinMaxValues()?.[1]
              ? `(${column.getFacetedMinMaxValues()?.[1]})`
              : ''
          }`}
          className="w-24 border shadow rounded"
        />
      </div>
      <div className="h-1" />
    </div>
  ) : (
    <>
      <datalist id={column.id + 'list'}>
        {sortedUniqueValues.slice(0, 5000).map((value: any) => (
          <option value={value} key={value} />
        ))}
      </datalist>
      <DebouncedInput
        type="text"
        value={(columnFilterValue ?? '') as string}
        onChange={value => column.setFilterValue(value)}
        placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
        className="w-36 border shadow rounded"
        list={column.id + 'list'}

      />
      <div className="h-1" />
    </>
  )
}


function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = React.useState(initialValue)

  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])



  return (
    <input {...props} value={value} onChange={e => setValue(e.target.value)} />
  )
}
