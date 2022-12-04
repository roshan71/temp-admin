import Link from "next/link"
import RequestCard from "../../components/Cards/RequestCard"
import Sidebar from "../../components/SideBar"
import { useState,useEffect } from "react"
import { getRequest } from "../../utils/specRequest"
const Property=(e)=>{
    const [requestList, setRequestList] = useState([]);
     useEffect(() => {
       setRequest();
     }, []);
     const setRequest = async () => {
       var list = await getRequest();
    
   setRequestList(list);
    };
 
    return(<>
     <Sidebar/>
     <div className=" md:ml-64  bg-blueGray-100" style={{padding:"10px",minHeight:"100vh"}}>
   <div  >
   
    <div>
    {requestList.map((e) => ( 
            <RequestCard key={e[0]['id']} id={e[0]['id']} status={e[1]['status']} message={e[1]['message']} userid={e[1]['user']}/>

          ))}
      
     </div>
     </div>
     </div>
    
     

    </>)
}

export default Property