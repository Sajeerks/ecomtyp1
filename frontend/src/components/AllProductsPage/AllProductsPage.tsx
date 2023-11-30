import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import Loading from '../Loading/Loading'
import "./AllProductsPage.scss"
import { Button, MenuItem, Rating, Select, Slider, Typography } from '@mui/material'
import ProductCard from '../ProductCard/ProductCard'
import ReactPaginate from 'react-paginate';
import { fetchProducts22, resetKeywoed } from '../../redux/reducers/productReducer22'
import Box from '@mui/material/Box';
// import Slider from '@mui/material/Slider';
// import { useDebounce } from '../layout/Header/Header'
import { categories } from '../CreateProduct/CreateProduct'
import { SelectChangeEvent } from "@mui/material";

const AllProductsPage = () => {
    const dispatch = useDispatch<AppDispatch>()

    const {loading:allProductsLoading, products, filteredProductsCount} = useSelector((state:RootState)=>state.productsreducer)
     const [pageNumber, setpageNumber] = useState(0)
    

// console.log([filteredProductsCount]);
const [category, setcategory] = useState<string>("")

const handleChangeForSelect=(event: SelectChangeEvent<unknown>)=>{
  setcategory(event.target.value as string)
   
}
    // const [itemOffset, setItemOffset] = useState(0);
    const [ratingFilter, setratingFilter] = useState<number>(0)
    
    let itemsPerPage= 3
    let pageCount= Math.ceil(filteredProductsCount/itemsPerPage)

    const handlePageClick = (event:any ) => {
        // console.log("evnt in hadleclick", event);
        // console.log("evenet selected", event.selected);
        setpageNumber(event.selected as number)
        // setItemOffset();
      };
//   console.log({pageCount, pageNumber});


function valuetext(value: number) {
  return `${value} Rupees`;
}
const [value, setValue] = React.useState<number[]>([0, 99999]);

const handleChangeForSlider = (_event: Event, newValue: number | number[]) => {
  // console.log({value});
  setValue(newValue as number[]);
};

const resetAllFilters =()=>{
  setcategory("")
  setValue([0, 999999])
  setratingFilter(0)
  setpageNumber(0)
// localStorage.setItem("saveKeywordFromlocalStore", "")
dispatch(resetKeywoed())

}

      useEffect(() => {
        
    let timedCall = setTimeout(() => {
    dispatch(fetchProducts22({keyword:"", page:pageNumber+1, ratings:ratingFilter, price:[ value[0], value[1]], category:category}))
      
    }, 3000);
  //  console.log({category});
    
    return()=>{
      clearTimeout(timedCall)
    }


      }, [pageNumber,ratingFilter, value[0], value[1], category])
      

    // console.log({ratingFilter});
  //  categories

      
  return (
<React.Fragment>
    {allProductsLoading ?<Loading/>:
    <React.Fragment>
         <Typography variant='h3' textAlign={"center"}>All Products</Typography>
        <div className='allProducts_Main_div'>
           
            <div className='allProducts_Main_div_filters'>
                <Typography  variant="h4" textAlign={"center"}>Filters</Typography>

                
                <Box sx={{ width: "100%" , height:"100%"}} display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>
                <Typography textAlign={"center"}>Rating</Typography>

                <Rating value={ratingFilter}  onChange={(_event, newValue) => {setratingFilter(newValue  as number || 0) }}  />
                </Box>

     <Box sx={{ width: "90%" ,mx:10 }} display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"} >
     <Typography textAlign={"center"}>Price Filter</Typography>
      <Slider
        getAriaLabel={() => 'Price range'}
        value={value}
        onChange={handleChangeForSlider}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={0}
        max={99999}
      />
    </Box>

    <Box width={"90%"}>
    <Typography textAlign={"center"}>Category</Typography>

    <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          // value={formik.values.category}
          // onChange={handleSelectChange}
          value={category}
          onChange={handleChangeForSelect}
      
          // helperText={formik.touched.category && formik.errors.category || "enter product category"}
          // autoWidth
          fullWidth
            
        
          label="Category"
          name='category'
          displayEmpty
      
        >
             <MenuItem value="">
                <em>select the value</em>
              </MenuItem>

          {categories.map((cat)=>(
            
            <MenuItem key={cat} value={cat} >
            
              {cat}
            </MenuItem>
          )) }
          {/* <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Twenty</MenuItem>
          <MenuItem value={21}>Twenty one</MenuItem>
          <MenuItem value={22}>Twenty one and a half</MenuItem> */}


          categories.
        </Select>


 
       
    </Box>
    <Button  variant="contained" onClick={resetAllFilters}>Reset Filters</Button>        
            </div>
         <div className='allProducts_Main_div_card_div'>
            {products.length>0 ? products.map((product, _index)=>(

                <div key={product._id} className='allProducts_Main_div_card_div__item'>
                <ProductCard product={product} key={product._id}/>
                </div>
            )):<Typography variant='h4'>NO products found</Typography>}

         </div>
      

        </div>
{    filteredProductsCount &&     <div className='allProducts_Main_div_pagination'>
        <ReactPaginate
        className='AllProductsPagination'
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        // pageRangeDisplayed={filteredProductsCount}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        forcePage={pageNumber}
      />

</div>}


 </React.Fragment>
        }
</React.Fragment>
  )
}

export default AllProductsPage