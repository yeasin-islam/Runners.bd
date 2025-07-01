import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import AuthProvider from './context/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast'
import Router from './routes/router.jsx'
import { HelmetProvider } from 'react-helmet-async'
import 'aos/dist/aos.css';
import Aos from 'aos';

Aos.init({
  duration: 700,
  easing: 'ease-in-out',
  once: true,
});

createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <StrictMode>
      {/* <CartProvider> */}
      <AuthProvider>
        <RouterProvider router={Router} />
        <Toaster position="top-right" />
      </AuthProvider>
      {/* </CartProvider> */}
    </StrictMode>
  </HelmetProvider>
)