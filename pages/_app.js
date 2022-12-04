import '../styles/globals.css'
import { useRouter } from 'next/router'



import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/tailwind.css";

import ProtectedRoute from './ProctectedRoute';
const noAuthRequired = ['/']
function MyApp({ Component, pageProps }) {
  const router = useRouter()
 
  return ( 
    <>
   
     {noAuthRequired.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      )}
 
    </>
  )
}

export default MyApp
