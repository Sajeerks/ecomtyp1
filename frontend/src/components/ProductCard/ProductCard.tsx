import { Rating, Typography, useTheme } from '@mui/material';
import  { useEffect } from 'react'
import "./ProductCard.scss"
import { Link } from 'react-router-dom';

interface ProductCardProps{
  product:{
    _id?: string;
    name: string;
    price: number;
    description: string;
    category: string;
    images: {
        public_id: string;
        url: string;
    }[];
    ratings: number;
    numberOfReviews: number
   }
}

const ProductCard = ({product}:ProductCardProps) => {

      const theme =useTheme()

      useEffect(() => {
        document.documentElement.style.setProperty("--img", product.images[0].url );
      }, [])
      
    
  return (
<>
<Link to={`/product/${product._id}`} >
<div className='product_card_main' style={{background:theme.palette.background.default}}>
    <Typography variant='h5' fontSize={"2vmax"}  maxWidth={"inherit"} noWrap={true} >{product.name}</Typography>
    {/* <h5>{product.name}</h5> */}
     <div className='product_card_main_details'>
       <div className='product_card_main_details_1' >
    <Typography >price== {product.price} </Typography>
     <Rating  value={product.ratings}  readOnly={true} />

      
       </div>
      <div className='product_card_main_details_image'>
       <img className='produt_card_image'  src={product.images[0].url} alt={product.name} />

         {/* <div className='prodcutImage__backgroundCreator'  style={{background:`url(${product.images[0].url})`}} ></div> */}
      </div>
   
     </div>

</div>
</Link>



</>
  )
}

export default ProductCard