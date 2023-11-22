import { Input } from '@mui/material'
import  { useState } from 'react'

const EditableCell = ({getValue,row, column,table}:any) => {
  const intitalValue = getValue()
  // console.log(getValue());
  // console.log({intitalValue});

    const [value , setvalue ] = useState<string>(intitalValue)
    // console.log({value});
    // useEffect(() => {
    //   setvalue(intitalValue)
    // }, [intitalValue])
    
const onBlur =()=>{
  table.options.meta?.updateData(
    row.index,
    column.id,
    value
  )
}


  return (
    
    <Input
    value={value}
    onBlur={onBlur}
    // style={{width:"100%", border:"none", outline:"none"}}
    onChange={e=>setvalue(e.target.value)}
 sx={{width:"100%", height:"100%",border:"none", outline:"none" }}

    />
  )
}

export default EditableCell