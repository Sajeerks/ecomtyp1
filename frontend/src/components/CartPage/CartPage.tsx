import React, { Fragment, useEffect, useState } from 'react'



import "./CartPage.scss"
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { Box, Button, Container, FormControl, InputLabel,  MenuItem, Select, TextField, Typography } from '@mui/material'

// import { styled } from '@mui/material/styles';
import {  loadCartFromLocalstore, removeFromCart } from '../../redux/reducers/cartReducer'

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
  getPaginationRowModel,
  // FilterFns,
  // createColumnHelper,
  // ColumnResizeMode,
 
} from '@tanstack/react-table'
import EditableCell from './EditableCell'
import QuandityCell from './QuandityCell'
import { Link } from 'react-router-dom'

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';



const CartPage = () => {
  const dispatch= useDispatch<AppDispatch>()
  const {orderItems, totalPrice, totalQty} =useSelector((state:RootState)=>state.cart)

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
    cell:(props:any)=><img src={props.getValue()} style={{width:"50px", }}/>
  },
  {
    accessorKey:"actions",
    header:"product actions",
    cell:(props:any)=><p> <Button variant='contained' onClick={()=>{dispatch(removeFromCart(props.row.original.productId))}}>Remove From cart </Button> </p>
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
  getPaginationRowModel:getPaginationRowModel(),
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
  
  }, [dispatch])
useEffect(() => {
  setdataTable(orderItems)

}, [orderItems, dispatch])

  return (
   <Fragment>
    {orderItems.length ===0 ? <Fragment> <Box sx={{width:"100vw", height:"70vh" , alignItems:"center" , display:"flex",justifyContent:'center'}}><Link  to ="/"> Cart is empty Gotto products & purchase</Link> </Box>  </Fragment> :<Fragment> 
         <Container sx={{width:"100vw",overflowX:"scroll"}} >
           <Typography textAlign={"center"} variant='h3'>Cart items</Typography>



<div className="maindiv_cartlist">

  



  <table className="table"  style={{width:table.getTotalSize(),justifyContent:"flex-start"}}>
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
       {{asc:<ArrowUpwardIcon/>, desc:<ArrowDownwardIcon/>, null:""}[header.column.getIsSorted() as string ?? null]}
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

  <hr />
 


         </Container>
         <div className='cart_total_div'>
   <Typography variant='h5'>Total Price = {totalPrice}</Typography>
   <Typography variant='h5'>Total Quantity ={totalQty}</Typography>
   <Button variant="contained" > <Link to="/shippinginfo">Proceed to Pay </Link></Button>

  </div>
         <div className='pagination_div'>
    <div>
    <Button variant="contained" sx={{mx:2}} onClick={()=>table.setPageIndex(0)}>First page</Button>
    <Button variant="contained" sx={{mx:2}}  disabled={!table.getCanPreviousPage()} onClick={()=>table.previousPage()}>prev page</Button>
    <Button variant="contained"  sx={{mx:2}} disabled={!table.getCanNextPage()} onClick={()=>table.nextPage()}>next page</Button>


    <Button variant="contained"  onClick={()=>table.setPageIndex(table.getPageCount()-1)}>Last page</Button>
    </div>

  <hr />
  <div>

 
  <ul>
    <li>
        "you are in page no -{" "} {table.options.state.pagination?.pageIndex!}
    </li>
    <li>
        Total pages ={table.getPageCount()-1}
    </li>
    <li>
    Jump to Page =     <TextField type="number" 
        defaultValue={table.options.state.pagination?.pageIndex || 0} 
        // value={table.options.state.pagination?.pageIndex }
        onChange={(e)=>table.setPageIndex(Number(e.target.value)  )}
        
        
        />
    </li>
  </ul>
  <hr /> 
  <h4>Current page SIze = {table.options.state.pagination?.pageSize}</h4>
  <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label">Pagesize</InputLabel>
  <Select value={table.options.state.pagination?.pageSize}
   defaultValue={3}
  onChange={e=>{
    table.setPageSize(Number(e.target.value)) 
  
  } }
  fullWidth
//   defaultValue={table.options.state.pagination?.pageSize}
  >
    
{[3,5,10].map((pagesizeEl )=>{
return(
    <MenuItem key={pagesizeEl} value={pagesizeEl || ""}>
{pagesizeEl}
    </MenuItem>
   
)
})}


  </Select>
  </FormControl>
  </div>
  </div>
  </Fragment>}
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
      <datalist id={column.id + 'list'} >
        {sortedUniqueValues.slice(0, 5000).map((value: any) => (
          <option value={value} key={value +"list"}  />
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
