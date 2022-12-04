import { useRouter } from 'next/router'
import React, { useEffect ,useState} from 'react'

import { getAuth } from 'firebase/auth'

const ProtectedRoute = ({ children }) => {
    const [user,setUser]=useState(false)
    const router=useRouter()
  useEffect(() => {

    if (localStorage.getItem("uid")!==null) {
        setUser(true)
     
    }
    else{
        setUser(false)
        router.push('/')
    }

  }, [router, user])

  return <>{user ? children : <div>Please Login</div>}</>
}

export default ProtectedRoute