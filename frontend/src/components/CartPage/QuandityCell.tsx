// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';


const QuandityCell = ({getValue,row, column,table}:any) => {
  const intitalValue = getValue()
  // console.log(getValue());
//   console.log({intitalValue})

    const [value , setvalue ] = useState<string>(intitalValue)


    const onBlur =()=>{
        table.options.meta?.updateData(
          row.index,
          column.id,
          value
        )
      }
      

    const handleChange = (event: SelectChangeEvent) => {
    //   setAge(event.target.value as string);
    setvalue(event.target.value as string);
    };
  

   const listOFAray =  [...Array(50).keys()];

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
            
   <MenuItem key={index} value={item}>{item}</MenuItem>
        ))}
     
        {/* <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem> */}
      </Select>

    // </FormControl>
//   </Box>
  )
}



export default QuandityCell