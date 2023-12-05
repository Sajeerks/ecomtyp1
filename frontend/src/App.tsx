import  { useEffect, useState } from 'react'
// import { Helmet } from 'react-helmet-async';
// import { toast } from 'react-toastify';
import Header from "./components/layout/Header/Header"
import "./App.scss"
import Footer from './components/layout/Footer/Footer';
import {BrowserRouter  , Routes, Route} from 'react-router-dom'
import Home from './components/Home/Home';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';
import Counter from './components/Counter/Counter';
import PostList from './components/PostList/PostList';
import LayoutForPost from './components/PostList/LayoutForPost';
import SinglePost from './components/PostList/SinglePost';
// import IndexPost from './components/PostList/indexPost';
import UsersList from './components/PostList/UsersList';
import UserSpecificPosts from './components/PostList/UserSpecificPosts';
// import LayoutForProducts from './components/PostList/LayoutForProducts';
import ProductDetails from './components/ProductDetails/ProductDetails';
import LoginPage from './components/LogInPage/LoginPage';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './redux/store';
import { getAutheticatedUserME, getLoggedInUser } from './redux/reducers/userSlice22';
import CreateProduct from './components/CreateProduct/CreateProduct';
import ProductList from './components/ProductList/ProductList';
import EditProductDetails from './components/EditProductDetails/EditProductDetails';
import SignUpPage from './components/SignUpPage/SignUpPage';
import AccountPage from './components/AccountPage/AccountPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProtectedRoutedWithChildren from './components/ProtectedRoute/ProtectedRoutedWithChildren';
import UserList from './components/UserList/UserList';
import { resetMessageForSingleProductReducer } from './redux/reducers/singleProductReducer';
import AllProductsPage from './components/AllProductsPage/AllProductsPage';
import SpeedDialOptions from './components/SpeedDialOptions/SpeedDialOptions';
import CartPage from './components/CartPage/CartPage';
import Payment from './components/Payment/Payment';

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios';
import ShippingIInfo from './components/ShippingIInfo/ShippingIInfo';
import Success from './components/Success/Success';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import PasswordReset from './components/PasswordReset/PasswordReset';
import OrdersList from './components/OrdersList/OrdersList';
import OrderSingle from './components/OrderSingle.tsx/OrderSingle';
import ContactForm from './components/ContactForm/ContactForm';
// import Home2 from './Home2/Home2';

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

const theme = createTheme({
  palette:{
    primary: { main: "#e91e63", contrastText: "#fff" },
    text:{
      primary: "#000"
    
    }, 
    
  },
  status: {
    danger: orange[500],
   
  },
  typography: {
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
    
    fontSize: 14,
    fontWeightRegular:800,
  },

});
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    text:{
      primary: "#cc0000"
    }

  },
  
  typography: {
    
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
    fontSize: 14,
    fontWeightRegular:800,
  },
});
export const server1 = "https://et1-4efd4e5170d2.herokuapp.com"


const App = () => {
  const dispatch =useDispatch<AppDispatch>()
  const loggedInUser = useSelector((state:RootState)=>getLoggedInUser(state))
  
     

  const [darkThemer, setdarkTheme] = useState(false)
  // console.log({darkThemer})

  const [stripeApiKey, setstripeApiKey] = useState("")

  async function getStripeApiKey() {
    const {data} = await axios.get(`${server1}/api/v1/stripeapikey`)
    // console.log({data});
    setstripeApiKey(data.stripeApikey)
  }
 


  useEffect(() => {
    dispatch(getAutheticatedUserME())
    dispatch(resetMessageForSingleProductReducer())
    getStripeApiKey()
    return () => {
      
    }
  }, [])

  

  
  
  return (
    <>
        <ThemeProvider theme={darkThemer?darkTheme:theme}>
          <CssBaseline/>
    <BrowserRouter>
    < Header  setdarkTheme={setdarkTheme} darkThemer={darkThemer} loggedInUser={loggedInUser}  />

      <SpeedDialOptions/>
      {   stripeApiKey &&   <Elements stripe={loadStripe(stripeApiKey)} >
      <Routes>

      <Route path="/payment" element={<ProtectedRoute isAdmin={false}/>} >
      <Route index element={<Payment/>} />
      <Route path="success" element={<Success/>} />
       </Route>
      </Routes>
      
      </Elements>}
  <Routes>

   
  <Route path="/shippinginfo" element={<ProtectedRoute isAdmin={false}/>} >
      <Route index element={<ShippingIInfo/>} />
    </Route>
    {/* <Route path="/orders" element={<ProtectedRoute isAdmin={false}/>} >
      <Route path="allorders" element={<OrdersList/>} />
    </Route> */}

    <Route path="/orders/allorders" element={<OrdersList/>} />
    <Route path="/orders/order/:orderId" element={<OrderSingle/>} />
    <Route path="/forgotpassword" element={<ForgotPassword/>} />
    <Route path="/password/reset/:resetPasswordTokenFromUrl" element={<PasswordReset/>} />
  

    <Route path='/' element={<Home/>} />
    {/* <Route path='/' element={<Home2/>} /> */}

    <Route path='/counter' element={<Counter/>} />





    <Route path='/login' element={<LoginPage/>} />
    <Route path='/signUp' element={<SignUpPage/>} />
    <Route path='/cart' element={<CartPage/>} />

  




    <Route path='/posts' element={<PostList/>} />

    {/* <Route path="/product" element={<ProtectedRoute isAdmin={false}/>} >
        <Route  path=":productId" element={<ProductDetails/>}  />
    </Route> */}

<Route path="/product/:productId" element={<ProtectedRoutedWithChildren><ProductDetails/></ProtectedRoutedWithChildren>} >
      
    </Route>

    <Route path="/account" element={<ProtectedRoute isAdmin={false}/>} >

      <Route index element={<AccountPage/>} />
    </Route>



<Route path='/allProducts' element={<AllProductsPage/>} />
    <Route path="/allUsersList" element={<ProtectedRoute isAdmin={true}/>} >

    <Route  index element={<UserList/>}  />
    </Route>
    

    

    <Route path="/product" element={<ProtectedRoute isAdmin={true}/>} >
        <Route  path="createProduct" element={<CreateProduct/>}  />
        <Route  path="productList" element={<ProductList/>}  />
        <Route  path="edit/:productId" element={<EditProductDetails/>}  />

    </Route>



       <Route path="/post" element={<LayoutForPost/>} >
       <Route index  element={<UsersList/>} />
                <Route  path=":postId" element={<SinglePost/>}  />
                <Route  path="user/:userId" element={<UserSpecificPosts/>}  />
  
              
                
    </Route>

    <Route path="/contactForm" element={<ContactForm/>} />
   

{/* <Route path="*" element={<Navigate to="/" replace/>} /> */}
  </Routes>

   


      <Footer/>
      </BrowserRouter>
      </ThemeProvider>
    </>
 
  )
}

export default App