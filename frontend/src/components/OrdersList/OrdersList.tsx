import { Fragment, useEffect, useMemo, useState } from "react"
import "./OrdersList.scss"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import { OrderType, getAllOrdersFrontend, updateOrderStatusFrontEnd } from "../../redux/reducers/orderSlice"
import moment from 'moment';
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
import Loading from "../Loading/Loading"
import { Box, Button , FormHelperText, Stack, TextField, Typography } from "@mui/material"

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { toast } from "react-toastify"
import { Link } from "react-router-dom"
import Modal from '@mui/material/Modal';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const OrdersList = () => {
  const {loading, message, error, orders,} = useSelector((state:RootState)=>state.order)
  const distpatch = useDispatch<AppDispatch>()
  const [ordersdata, setordersdata] = useState<OrderType[]>([])
  const [columFilter22, setcolumFilter22] = useState<ColumnFiltersState>([])
  const [globalFiltervalue, setglobalFiltervalue] = useState("")
  const [sortingTable, setsortingTable] = useState<any[]>([])
const [orderIdTochnageStatus, setorderIdTochnageStatus] = useState("")
const [statusState, setstatusState] = useState("Processing")

console.log({message});



  const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


 


const updateTheOrderFunction =({orderId}:{orderId:string})=>{
  setorderIdTochnageStatus(orderId)
  setOpen(true);
  // distpatch(updateOrderStatusFrontEnd({orderId,status }))

}
const updateTheORderFormModal =()=>{
     
  distpatch(updateOrderStatusFrontEnd({orderId:orderIdTochnageStatus,status:statusState }))
  handleClose()

}

const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setstatusState((event.target as HTMLInputElement).value);

};



const columns  = useMemo(()=>  [
  {
    accessorKey:"_id",
    header:"order identiie",
    size:250,
    cell:(props:any)=>{

    return (<p>{props.getValue()}</p>)}
  }, 
   {
    accessorKey:"user",
    size:250,
    header:"user name",
    cell:(props:any)=>{

      return (<p>{props.getValue()}</p>)}
  },
  {
    accessorKey:"paidAt",
    header:"paid date",
    cell:(props:any)=>{
      let date = props.getValue()
      date = date.split("T")
    // console.log(date[0]);
    date = moment(date[0]).format("MMM-DD-YYYY")
    // console.log(date);

      return (<p>{date}</p>)}
  },
  {
    accessorKey:"totalPrice",
    header:"totalPrice",
    cell:(props:any)=>{
      
          
      return (<p>{props.getValue()}</p>)}
  },
  {
    accessorKey:"orderStatus",
    header:"orderStatus",
    cell:(props:any)=>{

      return (<p>{props.getValue()}</p>)}
  },
  {
  
    accessorKey:"Actions",
    header:"Action",
    enableGlobalFilter:false,
    enableColumnFilter :false,
    enableSorting:false,
    cell:(props:any)=>{
        // console.log(props.row);
      return (
        <Stack  direction={"column"}> 
       <Button variant="contained" onClick={()=>updateTheOrderFunction({orderId:props.row.original._id})}>Update Order</Button>
       <Button   sx={{mt:1}  } variant="contained"> 
       
        <Link to={`/orders/order/${props.row.original._id}`} >View order </Link> 
       
       
        </Button>

       </Stack>)}
  },


  
  

  
]

, [])



const tableInstance =useReactTable({
  data:ordersdata,
columns,
state:{
  columnFilters:columFilter22,
  globalFilter:globalFiltervalue,
  sorting:sortingTable,
},
  getCoreRowModel:getCoreRowModel(),
  getFilteredRowModel:getFilteredRowModel(),
  columnResizeMode:"onChange",
  debugTable: true,
  debugHeaders: true,
  debugColumns: true,
  getPaginationRowModel:getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFacetedUniqueValues: getFacetedUniqueValues(),
  getFacetedMinMaxValues: getFacetedMinMaxValues(),
  onColumnFiltersChange:setcolumFilter22,
  onGlobalFilterChange:setglobalFiltervalue,  
  onSortingChange:setsortingTable,


})








  useEffect(() => {
    distpatch(getAllOrdersFrontend())

 
  }, [])

  useEffect(() => {
    setordersdata(orders)
  }, [loading])
  
  useEffect(() => {
    if(message){
      toast.success(message)
  distpatch(getAllOrdersFrontend())

    }
  }, [message])
  
  useEffect(() => {
      if(error){
        toast.error(error)
      }
    }, [error])

// console.log("ordersdata.length---",ordersdata.length);
// console.log({loading});
  // style={{width:tableInstance.getTotalSize(),justifyContent:"flex-start"}}
     
  return (
    <Fragment>
    

      {loading?(<Loading/>):(<Fragment>


 

      <div className="main_Order_div"> 
        <TextField sx={{mt:2}} placeholder="Global fitler" helperText="gloabal Fitler" label="globalFilter"
        value={globalFiltervalue}
        onChange={e=>setglobalFiltervalue(e.target.value)}
        
        />
           <table   style={{width:tableInstance.getTotalSize(),justifyContent:"flex-start"}} >
           <thead>
              {tableInstance.getHeaderGroups().map((headerArr)=>{          
                return (
          
                <tr key={headerArr.id}  className="tr" >
                   {headerArr.headers.map(columEl=>{
                    return(
                      <th 
                      className="th"
                      {...{
                        key: columEl.id,
                        colSpan: columEl.colSpan,
                        style: {
                          width: columEl.getSize(),
                        },
                      }}
                      onClick={columEl.column.getToggleSortingHandler()}
                      >

                        <div>
                        {flexRender(columEl.column.columnDef.header, columEl.getContext())}
                        {{asc:<ArrowUpwardIcon/>, desc:<ArrowDownwardIcon/>, null:""}[columEl.column.getIsSorted() as string ?? null]}
                        </div>


                        <div
                      {...{
                        onMouseDown: columEl.getResizeHandler(),
                        onTouchStart: columEl.getResizeHandler(),
                        className: `resizer ${
                          columEl.column.getIsResizing() ? 'isResizing' : ''
                        }`,
                        
                      }}
                    />


                                    {columEl.column.getCanFilter() ? (
                          <div>
                            <Filter column={columEl.column} table={tableInstance} />
                          </div>
                        ) : null}

                      </th>
                    )
                   })}
                </tr>
         
                )
                
        
              })}
            </thead>
             <tbody>

              {tableInstance.getRowModel().rows.map(row=>{
                // console.log(row);
                return(
                   <tr key={row.id} className="tr">
                    {row.getVisibleCells().map(cellEl=>{
                      return(
                        <td   className="td"
                        
                        {...{
                          key: cellEl.id,
                          style: {
                            width: cellEl.column.getSize(),
                         
                    
                          },
                        }}
                        
                        
                        >
                           {flexRender(cellEl.column.columnDef.cell, cellEl.getContext())}

                        </td>
                      )
                    })}

                   </tr>
                )
              })}

             </tbody>
           </table>

           </div>


  <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style} >
    <Typography id="modal-modal-title" variant="h6" component="h2">
      Select Order Status
    </Typography>
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">ORder Status</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="Processing"
        name="radio-buttons-group"
        onChange={handleRadioChange}
      >
        <FormControlLabel value="Processing" control={<Radio />} label="Processing" />
        <FormControlLabel value="Delivered" control={<Radio />} label="Delivered" />
        <FormControlLabel value="notPaid" control={<Radio />} label="not Paid" />
        <FormControlLabel value="cancel" control={<Radio />} label="cancel" />


      </RadioGroup>
      <FormHelperText>{"Select the Order status"}</FormHelperText>
      <Button onClick={updateTheORderFormModal}  variant="contained"> Commit order Change</Button>
    </FormControl>
  </Box>
</Modal>

           </Fragment>)}
    </Fragment>
  )
}

export default OrdersList












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

  const sortedUniqueValues = useMemo(
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
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])



  return (
    <input {...props} value={value} onChange={e => setValue(e.target.value)} />
  )
}
