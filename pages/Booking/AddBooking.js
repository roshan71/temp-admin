import React, { useState, useEffect } from 'react';
import {floor} from "mathjs";
import { collection, addDoc,getFirestore, doc, getDoc,getDocs } from "firebase/firestore"; 
import { getStorage, ref,
  uploadBytes,
  getDownloadURL,} from "firebase/storage";

  import { Datepicker } from '@mobiscroll/react-lite';

import { app } from "../../utils/firebase";
import { v4 } from 'uuid';
import { useRouter } from 'next/router';
import { getRoom } from '../../utils/property';
import { async } from '@firebase/util';
export default function AddRoom() {
    const [custName, setCustName] = useState();
    const [amount, setAmount] = useState();
    const [guestAddress,setGuestAddress] = useState();
   
    const [guestEmail,setGuestEmail] = useState();
    const [guestPhone,setGuestPhone] = useState();
    const [guestSpecialRequest,setGuestSpecialRequest] = useState();
    const [roomRef,setRoomRef] = useState(null);
    const [status,setStatus] = useState();
    const [time,setTime] = useState();
    const [userRef,setUserRef] = useState(null);
    const [isUpdate,setIsUpdate]=useState(false)
    const [bookStartDate,setBookStartDate] = useState();
    const [bookEndDate,setBookEndDate] = useState();
    const router=useRouter();
    
    const [roomList, setRoomList] = useState([]);
  useEffect(() => {
    setRoom();

  }, []);
  const setRoom = async () => {
    var list = await getRoom();
    setRoomList(list);
  
  };

 
function getDaysArray(start, end) {
  let a1=start.split("-")
  let a2=end.split("-")
  let arr=[]
    for(let dt=new Date(a1[0],a1[1],a1[2],0,0,0,0); dt<=new Date(a2[0],a2[1],a2[2],0,0,0,0); dt.setDate(dt.getDate()+1)){
        
        arr.push(new Date(dt));
    }
    return arr;
};
    const handleSubmit=async(e)=>{
      
      e.preventDefault()
      let temproom,tempuser
      if(roomRef===null&&userRef===null){
        tempuser=roomList[0][1]['landlord'].id
        temproom=roomList[0][0]['id']
      }
      else{
        tempuser=userRef
        temproom=roomRef
      }
      setIsUpdate(true)
      const db = getFirestore(app);
      const db2 = getFirestore(app);
      const doc1=doc(db,"users",tempuser)
      const doc12=doc(db2,"room",temproom)
      const user=await getDoc(doc1)
      const room=await getDoc(doc12)
      //console.log(custName,guestAddress,guestEmail,user.ref,room.ref,bookStartDate,bookEndDate)
   
     const dates=getDaysArray(bookStartDate,bookEndDate)
      // console.log(dates)
      const amount=room.data()['price']*dates.length
      // console.log(room.data())
      // const roomData=room.data()
      // console.log(roomData)
  // // const db = getFirestore(app);
  // const doc2=doc(db,"users",tempLandlord)
  // const book=await getDoc(doc2)
    

    var resultInSeconds=floor(new Date().getTime() / 1000);
    const data={
      "id": Number  (resultInSeconds),
      "amount":amount,
      "bookDate":dates,
      "custName":custName,
      "guestAddress":guestAddress,
      'guestCity':null,
      "guestCompanyName":null,
      "guestCountry":null,
      "guestEmail":guestEmail,
      "guestPhone":guestPhone,
      "guestSpecialRequest":guestSpecialRequest,
      "guestVAID":null,
      "guestZipCode":null,
      "roomRef":room.ref,
      "userRef":user.ref,
      "status":"pending",
      "time":new Date()
    }
    const db1 = getFirestore(app);
    const docRef = await addDoc(collection(db1, "bookings"), data)
    
    if(docRef.id){
      // console.log(docRef)
      alert("Added Booking Successfully!!");
      router.push("/Booking")
    }
    else{
      alert("Something Went Wrong!!");
      setIsUpdate(false)
    }
      
     
   
  //   else{
     
  //     alert("Please Upload Images!!")
  //   }
}

   
  
    const handleCancel=(e)=>{
      e.preventDefault();
      router.push("/Booking");
    }
    const handleRoom=async(e)=>{
      e.preventDefault();
      let temp=e.target.value.split(",")
      // console.log(temp)
      setRoomRef(temp[0])
      setUserRef(temp[1])
      
    }
  
    return (
      <>
      <div className="bg-blueGray-100 justify-center flex h-full" style={{padding:"10px",minHeight:"100vh"}}>
      
      <div className="w-1/2 mt-[5rem] mb-[5rem] ">
      <br></br>
       
        
          {/* address currrency img(upload) long desc shot desc name price */}
            <div className=" bg-white rounded  ">
              <form action="#" method="POST" onSubmit={handleSubmit}>
                <div className="  justify-center flex">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Add Properties</h3>
                 </div>
                  <div className="bg-white px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                     
                     
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Customer Name
                        </label>
                        <input
                          type="text"
                          name="cust-name"
                          id="cust-name"
                          required
                            value={custName}
                          onChange={e=>setCustName(e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="guestEmail" className="block text-sm font-medium text-gray-700">
                            Guest Email
                        </label>
                        <input
                          type="email"
                          name="guestEmail"
                          id="guestEmail"
                          required
                            value={guestEmail}
                          onChange={e=>setGuestEmail(e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="guestPhone" className="block text-sm font-medium text-gray-700">
                            Guest Phone Number
                        </label>
                        <input
                          type="number"
                          name="guestPhone"
                          id="guestPhone"
                          required
                            value={guestPhone}
                          onChange={e=>setGuestPhone(e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="guestaddr" className="block text-sm font-medium text-gray-700">
                            Guest Address
                        </label>
                        <input
                          type="text"
                          name="guestaddr"
                          id="guestaddr"
                          required
                            value={guestAddress}
                          onChange={e=>setGuestAddress(e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="guestSpecReq" className="block text-sm font-medium text-gray-700">
                            Guest Special Request
                        </label>
                        <input
                          type="text"
                          name="guestSpecReq"
                          id="guestSpecReq"
                          required
                            value={guestSpecialRequest}
                          onChange={e=>setGuestSpecialRequest(e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                  


                      <div className="col-span-6">
                        <label htmlFor="room" className="block text-sm font-medium text-gray-700">
                           Select Room
                        </label>
                        <select  name="room" id="room" onChange={(e)=>handleRoom(e)}>
                         
                          {roomList.map((e)=>(
                           <option  key={e[0]['id']} value={[e[0]['id'],e[1]['landlord'].id]}>{e[1]['name']}</option>
                          ))}
               
                        </select>

                      </div>

                      <div className="col-span-6  row sm:col-span-3">
                      <label htmlFor="bookDate" className="block text-sm font-medium text-gray-700">
                           Booking Date
                        </label>
                        
                        <div className='flex flex-row'>
                        <div>
                        <label htmlFor="bookDate" className="block text-sm font-medium text-gray-700">
                           Start Date
                        </label>
                        <input
                          type="date"
                          name="bookStart"
                          id="bookStart"
                          required
                            value={bookStartDate}
                          onChange={e=>setBookStartDate(e.target.value)}
                          className="mt-1 block  rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        </div>
                        <div>
                          <label htmlFor="bookDate" className="block ml-3 text-sm font-medium text-gray-700">
                            End Date
                        </label>
                        <input
                          type="date"
                          name="bookStart"
                          id="bookStart"
                          min={bookStartDate}
                          required
                            value={bookEndDate}
                          onChange={e=>setBookEndDate(e.target.value)}
                          className="mt-1 block ml-3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        </div>
                        
                        </div>
                      </div>
                    



                      
                      
                     
  
                    
                     


                      
                    </div>
                 
                  </div>
                
  
                  <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                  
                  type="submit"
                  className="inline-flex justify-center rounded-md mr-3 border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                    <button
                      type="submit"
                      disabled={isUpdate}
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        // onClick={handleSubmit}
                   >
                      Add
                    </button>
                  </div>
             
              </form>
            </div>
          </div>
          </div>
    
       
  
             
          </>
    )
  }



  // {
  //   "type": "service_account",
  //   "project_id": "homegateway-62f02",
  //   "private_key_id": "e7b6f24e109ec4bbdad7ee2a1cdf3413d4da4076",
  //   "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDAPSHs3Ky80Asq\nMtJad8sj8XwNSRfnp0jEz11ntDZRNMsDgxOExlT6PLl3knIWPpcz6R2lm/Z2m1bW\nMTsJesQ4PgpCW39BZpdK4yepP8+ziXCgj53GEeW70JyY5FTw4Il/HGN8X0NyiOSl\n8j//4tQfqx3T61iOVel36o/wcHWRBM2QwCkDFnWDCkQJ280pEreJ370RcAmwb3VX\n7k1kd5e1Gi1bkfFjH1KAvKWCWcWzEgWuuGTYp9YBBmvDXahkq1dQY/RszIrbNSpX\nzn7KRtbaKrIG/878Mfuhgf5b6UyWIUEfSv/sIM1tGZSL+MAkyNW6//OJ10h8aFGn\nKpL2pN61AgMBAAECggEAC/EANX1zwXrO5r0ncfU1CjOK+CxNLtemXotfCv0Xzq2P\n2tT+lmXXi3/QKYxQR+91ZwUZEVuB0NZPa5i9SRZ2L+QysPKMEhz0UvOPWCUdmtJz\ny5WAQHiGI8eOorS0Tg40nE/AIk6smuXEBkbpENUfRiRUAwEAjD7r9MX+UPo7Y1mk\naACkbfx8c4tb+gAK58SftMgiQ0C4ULhQvX6IdNn2R559JYnkashrS5a6aZF1iK71\nBqUp22XqQBUzh8pawm3qG8SrjmBPYBlUXz4qoj1pnEFhP8hT55XJevXOvSTP1yTv\n5OMrWNuiGoCNk5QOrhJR7MvyUYBlA2bRP345zbObtQKBgQDtLJXCX+4Cd13NXs4a\no4b+7Ji1FPevk3EjM4bFaUc0F5052qQzlnh72fUUrWRmkbljm8Ly8VqCcBEmaQV3\n4bA/sf/5H4+roqRewTrXckKj6zEMsUGdiIuC58Lq5INA5VYKf7NGJSbII9K7hgNG\nispjSDuU5Taiyg/ZuCySsnhtWwKBgQDPf3RDIZ9l5qWjq55F7ufhBe0aw5/OrBPM\nVmE+8uzH4Nnof0qPiZCitX4uJgYXn1WiCUNDdb+LqKMLD2TrmsV7PyKwFvo7EYiH\nInWaXTub6E9jO9yF2OmgnBwpuvbOIU6TQyZEv67wlsVti+ynr/C9FYS5WzKBXNWR\nATLeH/1RLwKBgQDIU39PBW3ogWAmhiw5zePJUJgPY11t3HCUVgJAnhK5SjTP2AAX\nXsH3gnqCc445IF7hZn/8aaWURQoHUm9++Y6/zh4yEtlsFF0Xd8i2j1kAUThFyzZr\n1Bhagl1dv5OpbcwF5CTNW7XtGGz3XVNI8xPNVgaVViGW0Gsg73IemkYjvwKBgQCT\nZttUhSIS5ZJtfpDk5R5cQDV7edSgoKU/120lprSGGTkzbJmu9e6FZ6DHb8OMLGhM\nv3/FAHSd5aJNTRZIOJ5pOySNKwV/yKjQNq6Mhga+bn1W5UN24ey1Z7CqBGMnc4m6\nG02oMPM5fiGp/GiVhurhp9OtSRfLxgMBC3TzTo5JiQKBgQCPbkju50Rxk2BQEqse\nckXM3+BWQyLNFLuQPeIOKStuwEPFt1+ncWCflraWLPpH6LCRWyQG7LxeQ0JApUKY\nxt3wtNQwrv2T9Fz31unf0931Rl3p9onC12bsSCUs2oVN8Z21GF8MOZ6m5/skKgh2\nHdv92oMHyG282VQ766FYm0yG/A==\n-----END PRIVATE KEY-----\n",
  //   "client_email": "firebase-adminsdk-ptcoy@homegateway-62f02.iam.gserviceaccount.com",
  //   "client_id": "111563909676160893398",
  //   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  //   "token_uri": "https://oauth2.googleapis.com/token",
  //   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  //   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ptcoy%40homegateway-62f02.iam.gserviceaccount.com"
  // }
  