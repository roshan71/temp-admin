import { getAuth, signInWithEmailAndPassword  } from "firebase/auth";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";


import { app } from "../utils/firebase";
import { collection, getDoc,setDoc,getFirestore,doc } from "firebase/firestore"; 

export default function Home() {
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const router=useRouter()

  useEffect(()=>{
    if(localStorage.getItem("uid")!==null){
      router.push("/Dashboard")
    }
  },[])
  const handleSubmit=(e)=>{
e.preventDefault();
    const auth = getAuth();
   signInWithEmailAndPassword(auth, email, password)
    .then(async(userCredential) => {
      // Signed in 
      const user = userCredential.user;
     
   
      const db = getFirestore(app);
      const docRef=doc(db,'users',user.uid)
        const docSnap = await getDoc(docRef);
        const da=docSnap.data();
      
       try{
       if( da["userType"]==="admin"){
         localStorage.setItem('uid', user.uid);
         router.push("/Dashboard")
         
       }
       else{
         alert("Invalid User Please Try Again")
         
          setPassword("")
        
       }}
       catch{
        alert("Invalid User Please Try Again")
        setEmail("")
        setPassword("")
       
       }


    })
    .catch((error) => {
      alert("Invalid User Please Try Again")
      setEmail("")
      setPassword("")
    });


  }
    return(
<>
<div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" style={{height:"100vh"}}>
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="./logo.png"
              alt="Your Company"
              style={{height:"25%",width:"25%" }}
            />
            <h2 className="mt-6 text-center  font-bold tracking-tight text-gray-900" style={{fontSize:"2rem"}}>
             Admin Login
            </h2>
            
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px  mb-6 rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  value={email}
                  type="email"
                  autoComplete="email"
                  required
                  onChange={(e)=>setEmail(e.target.value)}
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  value={password}
                  name="password"
                  type="password"
                  onChange={(e)=>setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                style={{backgroundColor:"#163e6f" }}
                onClick={(e)=>handleSubmit(e)}
                className="group relative flex w-full justify-center bg-blue-500 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Sign in
              </button>
            </div>

           
            
          </form>
        </div>
      </div>
    </>
    )
}

