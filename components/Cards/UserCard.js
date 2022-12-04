import { useRouter } from "next/router";
import { collection, addDoc,getFirestore, doc, deleteDoc } from "firebase/firestore"; 
import { getStorage } from "firebase/storage";
import { app } from "../../utils/firebase";
import { useContext, useEffect } from "react";
import Link from "next/link";
import { async } from "@firebase/util";
import FormLayout from "../layouts/formLayout";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";


const UserCard =(props)=>{
    const router = useRouter();
    //  const  showAlert  = useContext(FormLayout);
    //console.log(process.env.MY_SECRET_KEY)  
    useEffect(() => {
     
      }, []);
    const handleDelete=async(e,id)=>{
       
        e.stopPropagation()
        const db = getFirestore(app);
        const docRef = doc(db,'users',id);
      await deleteDoc(docRef).then(()=>{
        alert("User Deleted SuccessFully")
        router.reload(window.location.pathname);
       
      })
      //showAlert("error","Deleted");
      
    //   showAlert('error', `Todo with id ${id} is deleted successfully`)
    }
    const handleEdit=(e,id)=>{
      e.preventDefault();
      router.push(
         {
            pathname:"/User/UserEdit",
            query:{
               id
            }
         }
      )
    }
    const handlePassword=(e,id,name)=>{
      e.preventDefault();
      router.push(
         {
            pathname:"/User/updatePassword",
            query:{
               ed:[id,name]
            }
         }
      )
    }
    // const handlePass=(e,id)=>{
    //   e.preventDefault();
    //   const auth = getAuth();
    //   sendPasswordResetEmail(auth, props.email)
    //     .then(() => {
    //       // Password reset email sent!
    //       // ..
    //       alert("Chech Email "+props.email+" For Reset Password Link ")
       
    //     })
    //     .catch((error) => {
    //       const errorCode = error.code;
    //       const errorMessage = error.message;
    //       // ..
    //     });
      
    
    //   // const a1=[id,props.name]
    
    //   // router.push(
    //   //    {
    //   //       pathname:"/User/updatePassword",
    //   //       query:{
    //   //          a1
    //   //       }
    //   //    }
    //   // )
    // }
     return(
    <>
   
    <div className=" flex flex-row justify-between  bg-white rounded" style={{width:"95%",margin:'10px',padding:'20px'}}>
    
        <div className="flex flex-col">
            <h2>{props.name}</h2>
            <h3>{props.email}</h3>
        </div>
     
      <div>                    
        <div>
        <button
                      type="button"
                      style={{backgroundColor:"rgb(22, 62, 111)"}}
                      className="inline-flex justify-center rounded-md  mb-3 text-white border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                       onClick={(e)=>handlePassword(e,props.id,props.name)}
                   >
                      Update Password
                    </button>
        </div>
        <div className="">
        <button
                      type="button"
                      style={{backgroundColor:"rgb(22, 62, 111)"}}
                      className="inline-flex justify-center rounded-md mr-3 mb-3 text-white border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                       onClick={(e)=>handleEdit(e,props.id)}
                   >
                      Edit
                    </button>

                    <button
                      type="button"
                      style={{backgroundColor:"#e73d2f"}}
                      className="inline-flex justify-center rounded-md text-white border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                       onClick={(e)=>handleDelete(e,props.id)}
                   >
                      Delete
                    </button>
            
        </div>
        </div>

      
    </div>
  
    </>
 )   
}
export default UserCard