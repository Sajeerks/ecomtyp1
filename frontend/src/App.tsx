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


const App = () => {
  const dispatch =useDispatch<AppDispatch>()
  const loggedInUser = useSelector((state:RootState)=>getLoggedInUser(state))
  
   
     

  const [darkThemer, setdarkTheme] = useState(false)
  // console.log({darkThemer})

  useEffect(() => {
    dispatch(getAutheticatedUserME())
    dispatch(resetMessageForSingleProductReducer())
  
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
   
  <Routes>
    <Route path='/' element={<Home/>} />
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

    <Route path="/" element={<ProtectedRoute isAdmin={false}/>} >
      <Route path='/account' element={<AccountPage/>} />
    </Route>


<Route path='/allProducts' element={<AllProductsPage/>} />
    <Route path="/" element={<ProtectedRoute isAdmin={true}/>} >

    <Route  path="allUsersList" element={<UserList/>}  />
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

   

{/* <Route path="*" element={<Navigate to="/" replace/>} /> */}
  </Routes>

   


      <Footer/>
      </BrowserRouter>
      </ThemeProvider>
    </>
 
  )
}

export default App