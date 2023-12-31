// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { addtToCartFromCartPage } from '../../redux/reducers/cartReducer';


const QuandityCell = ({getValue,row, column,table}:any) => {
  const intitalValue = getValue()
  // console.log(getValue());
  // console.log({intitalValue })
  const dispatch = useDispatch<AppDispatch>()
    const [value , setvalue ] = useState<string>(intitalValue || 0)


    const onBlur =()=>{
        table.options.meta?.updateData(
          row.index,
          column.id,
          value
        )
      }
      // console.log(row);

    const handleChange = (event: SelectChangeEvent) => {
    //   setAge(event.target.value as string);
    setvalue(event.target.value as string );

    dispatch(addtToCartFromCartPage({singleProductDetail:row?.original,cartQty:Number(event.target.value) }))
    };
  

   const listOFAray =  [...Array(100).keys()];

  return (
    
    // <Box sx={{ minWidth: "auto" }} height={"100%"}>
    // <FormControl fullWidth sx={{height:"100%"}}>
    //   {/* <InputLabel id="demo-simple-select-label">count</InputLabel> */}


       <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Age"
        onBlur={onBlur}
        onChange={handleChange}
        sx={{height:"100%", width:"100%", outline:"none", border:"none"}}
      >
   
        {listOFAray.map((item, index)=>(
            
   <MenuItem key={index} value={item+1}>{item+1}</MenuItem>
        ))}
     
        {/* <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem> */}
      </Select>

    // </FormControl>
//   </Box>
  )
}



export default QuandityCell