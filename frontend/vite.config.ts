import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // define: {
  //   global: 'window',
  //   },
  server: {
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

  
      "/api/v1/": {
        target: 'https://et1-4efd4e5170d2.herokuapp.com',
        changeOrigin: true, 
        
        secure:false,
        // ws:true
      }
    }

  }
})
