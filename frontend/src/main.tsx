import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss';

import {  HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { Provider as ReduxProvider } from 'react-redux';
import store from './redux/store';


// import { render } from "react-dom";   
// 

ReactDOM.createRoot(document.getElementById('root')!).render(






  
  
  <React.StrictMode>
    <HelmetProvider>
    <ReduxProvider store={store}>
    <App  />
    </ReduxProvider>
<ToastContainer 
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
// limit={1}
/>
    </HelmetProvider>
 </React.StrictMode>,
 
)


// render(
//   <React.StrictMode>
//     <HelmetProvider>
//      <ReduxProvider store={store}>
//      <App />
//     </ReduxProvider>
//  <ToastContainer 
// position="top-right"
// autoClose={5000}
// hideProgressBar={false}
// newestOnTop={false}
// closeOnClick
// rtl={false}
// pauseOnFocusLoss
// draggable
// pauseOnHover
// theme="light"
// // limit={1}
// />
//     </HelmetProvider>
//  </React.StrictMode>,
//   document.getElementById("root")
// )