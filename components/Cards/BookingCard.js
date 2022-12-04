import { useEffect,useState } from "react";
import { collection, addDoc,getFirestore, doc, deleteDoc,getDoc, setDoc } from "firebase/firestore"; 
import { getStorage } from "firebase/storage";
import { app } from "../../utils/firebase";
import { async } from "@firebase/util";
import { useRouter } from "next/router";
const BookingCard=(props)=>{
    const [isPending,setPending]=useState(false);
    const [roomdata,setRoomdata]=useState();
    const dates=[props.bookDate.map((e)=>new Date((e.seconds)*1000))].sort();
    const router=useRouter();
   
     const check_in=dates[0][0];
     const check_out=dates[0][dates[0].length-1];
const getroom=async()=>{console.log(props.roomref)
const db=getFirestore(app);
    const docRef=doc(db,'room',props.roomref.id)
   const  d=await getDoc(docRef)
    //console.log(d.data())
    setRoomdata(d.data().name)
  }
   
      useEffect(() => {
        getroom();
        if(props.status==="pending"){
            setPending(true)
          
        }
        else{
            setPending(false)
        }

      }, []);
    const handleConfirm=async(e)=>{
      e.preventDefault();
      const db=getFirestore(app);
      const docRef=doc(db,'bookings',props.id.toString())
      await setDoc(docRef,{status:"accepted"},{merge:true})
      router.reload(window.location.pathname);
    }

    const handleReject=async(e)=>{
      e.stopPropagation()
      const db=getFirestore(app);
      const docRef=doc(db,'bookings',props.id.toString())
      await setDoc(docRef,{status:"Rejected"},{merge:true})
      router.reload(window.location.pathname);
      
      
    }
    return(
    <>
     <div>
    <div className=" flex flex-row justify-between  bg-white rounded" style={{width:"95%",margin:'',padding:'20px'}}>
        <div>
            
            <h2><b>Customer Name : </b>{props.custName}</h2>
            <h2><b>Room : </b>{roomdata}</h2>
            <h3><b>Check-In : </b>{check_in.toString()}</h3>
            <h3><b>Check-Out :</b>{check_out.toString()} </h3>
            <h3><b>Amount : </b>{props.price} AED</h3>
            <h3><b>Status :</b> {props.status}</h3><br></br>
       
            <div className={isPending ?  "visible" : "invisible"}>
            <button
                      type="button"
                      className="inline-flex text-white justify-center rounded-md mr-2 border border-transparent bg-blue-700 py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                       onClick={(e)=>handleConfirm(e)}
                       style={{backgroundColor:"rgb(22, 62, 111)"}}
                   >
                      Confirm
                    </button>
                    <button
                      type="button"
                      className="inline-flex text-white justify-center rounded-md ml-2 border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                       onClick={(e)=>handleReject(e)}
                       style={{backgroundColor:"#e73d2f"}}
                   >
                      Reject
                    </button>
                    </div>
          </div>
        
            
       
    </div>
    <br></br>
    </div>
    </>);
}


export default BookingCard