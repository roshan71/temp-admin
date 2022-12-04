import { useRouter } from "next/router";

import { collection, getDoc,getFirestore, doc, deleteDoc, setDoc } from "firebase/firestore"; 
import { getStorage } from "firebase/storage";
import { app } from "../../utils/firebase";
import { async } from "@firebase/util";
import { useEffect,useState } from "react";
const RequestCard =(props)=>{
    const [user,setUser]=useState();
    const [isPending,setPending]=useState(false);
    const router=useRouter();

    useEffect(()=>{
        getUser();
        if(props.status==="unsolved"){
            setPending(true)
          
        }
        else{
            setPending(false)
        }
      
    },[])

    const getUser=async()=>{
        const db=getFirestore(app);
      
        const docRef=doc(db,'users',props.userid.toString())
        const docSnap = await getDoc(docRef);
        const d=docSnap.data();
        setUser(d.name)
    }
    const handleSolved=async(e)=>{
        e.preventDefault();
        const db=getFirestore(app);
        const docRef=doc(db,'specialRequest',props.id.toString())
        await setDoc(docRef,{status:"solved"},{merge:true})
        router.reload(window.location.pathname);

    }
    const handleRemove=async(e,id)=>{
        e.stopPropagation()
        const db = getFirestore(app);
        const docRef = doc(db,'specialRequest',id);
      await deleteDoc(docRef).then(()=>{
        alert("Request Remove SuccessFully")
        router.reload(window.location.pathname);
       
      })
        
    }
     return(
    <>
   
    <div className=" flex flex-row justify-between  bg-white rounded" style={{width:"95%",margin:'10px',padding:'20px'}}>
    
        <div className="flex flex-col">
            <h2><b>Message : </b>{props.message}</h2>
            <h3><b>User : </b> {user}</h3>
            <h3><b>Status : </b> {props.status}</h3>
        
        </div>
        <div className="">
       <div className={isPending ?  "visible" : "invisible"}>
       <button
                     type="button"
                     style={{backgroundColor:"rgb(22, 62, 111)"}}
                     className="inline-flex justify-center text-white mr-3 mb-3 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={(e)=>handleSolved(e,props.id)}
                  >
                     Solved
                   </button>
</div>
<div>
                   <button
                     type="button"
                     style={{backgroundColor:"#e73d2f"}}
                     className="inline-flex justify-center text-white rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={(e)=>handleRemove(e,props.id)}
                  >
                     Remove
                   </button>
           
     </div>
       </div>
       
    </div>

    </>
 )   
}
export default RequestCard