import React, {  useState } from 'react'
import { increment, decrement ,reset, increaseByAmount} from '../../redux/reducers/counterSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { Box, Button, TextField } from '@mui/material'

const Counter = () => {
    const count = useSelector((state:RootState)=>state.counter.count)
    const dispatch = useDispatch<AppDispatch>()
    const [incrementamount, setincrementamount] = useState<number>(0)
  return (
    <>
    <Box style={{margin:"auto", justifyContent:"center", alignItems:"center", display:"flex", flexDirection:"column"}}>
        <TextField type="number" value={count} />  
        <br />
       <Button variant="contained" onClick={()=> {dispatch(increment())}}>+</Button>
       <br />

       <Button variant="contained" onClick={()=> {dispatch(decrement())}}>-</Button>
       <br />
       <Button variant="contained" onClick={()=> {dispatch(reset())}}>reset</Button>
       <br /> 
       <TextField type='number'  value={incrementamount}  onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setincrementamount(Number(e.target.value))}/>
       <br />

       <Button variant="contained" onClick={()=> {dispatch(increaseByAmount(incrementamount))}}>increaseByAmount</Button>
       <br />
    

    </Box>
     

    </>
  )
}

export default Counter