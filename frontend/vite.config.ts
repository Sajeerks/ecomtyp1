import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // define: {
  //   global: 'window',
  //   },
  server: {
    // cors:false,
    proxy: {
      // 'http://localhost:5173':'http://127.0.0.1:4444'
//       // 'http://localhost:5173':'http://google.com'

// "http://localhost:5173" :"https://jsonplaceholder.typicode.com"
      // "/api": {
      //   target: 'http://127.0.0.1:4444',
      //   changeOrigin: true, 
        
      //   secure:false,
      //   // ws:true
      // }
   "/api":'https://et1-4efd4e5170d2.herokuapp.com'
  
      // "/api/v1": {
      //   target: 'https://et1-4efd4e5170d2.herokuapp.com/',
      //   changeOrigin: true, 
        
      //   secure:false,
      //   ws:true


      // //   // configure: (proxy, _options) => {
      // //   //   proxy.on('error', (err, _req, _res) => {
      // //   //     console.log('proxy error', err);
      // //   //   });
      // //   //   proxy.on('proxyReq', (proxyReq, req, _res) => {
      // //   //     console.log('Sending Request to the Target:', req.method, req.url);
      // //   //   });
      // //   //   proxy.on('proxyRes', (proxyRes, req, _res) => {
      // //   //     console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
      // //   //   });
      // //   // }

      // }
    }

  }
})
