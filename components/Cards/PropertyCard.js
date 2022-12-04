import Image from "next/image";
import { useRouter } from "next/router";
import { collection, addDoc,getFirestore, doc, deleteDoc } from "firebase/firestore"; 
import { db } from "../../utils/firebase";
import { getStorage } from "firebase/storage";
import { app } from "../../utils/firebase";
const PropertyCard =(props)=>{
   const router=useRouter()
   
   
   
   const handleDelete=async(e,id)=>{
      
      e.stopPropagation()
      const db = getFirestore(app);
      const docRef = doc(db,'room',id);
    await deleteDoc(docRef).then(()=>{
      alert("Room Deleted SuccessFully")
      router.reload(window.location.pathname);
     
    })}
    
    const handleEdit=(e,id,u)=>{
      e.preventDefault();
     
      const a1=[id,u.id]
   
      router.push(
         {
            pathname:"/Property/EditProperty",
            query:{
               a1,
            }
            
         }
      )
    }
     return(
    <>

   <div>
    <div className=" flex flex-row justify-between  bg-white rounded" style={{width:"95%",margin:'',padding:'20px'}}>
        <div style={{width:"75%"}}>
           
            <h2><b>Name : </b>{props.name}</h2>
            <h3><b>Address : </b>{props.addr}</h3>
            <h3><b>Price : </b>{props.price} {props.currency}</h3>
            <h3><b>Description :</b> {props.desc}</h3><br></br>
            <button
                      type="button"
                      className="inline-flex text-white justify-center rounded-md mr-2 border border-transparent bg-blue-700 py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                       onClick={(e)=>handleEdit(e,props.id,props.user)}
                       style={{backgroundColor:"rgb(22, 62, 111)"}}
                   >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="inline-flex text-white justify-center rounded-md ml-2 border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                       onClick={(e)=>{handleDelete(e,props.id)}}
                       style={{backgroundColor:"#e73d2f"}}
                   >
                      Delete
                    </button>
            </div>
            <div className="ml-3 max-w-[350px] max-h-[50px] overflow-hidden" >
            <img
      src={props.imgsrc}
      alt="Picture of the author"
      width="250px"
      height="50px"
      style={{height:"150px",width:"200px"}}
    />
            </div>
        
            
       
    </div>
    <br></br>
    </div>
    </>
 )   
}
export default PropertyCard