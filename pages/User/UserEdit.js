import { async } from '@firebase/util';
import {  doc, setDoc,getDoc } from 'firebase/firestore';
import { requestToBodyStream } from 'next/dist/server/body-streams';
import React, { useEffect, useState } from 'react';
import { getFirestore,  } from 'firebase/firestore';
import {getStorage} from "firebase/storage";

import { initializeApp } from "firebase/app";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import {v4} from "uuid";
import { app } from "../../utils/firebase";
import { setUserProperties } from 'firebase/analytics';
import User from '.';
import { useRouter } from 'next/router';
import { add } from 'mathjs';
export default function UserEdit(props) {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [tempEmail, setTempEmail] = useState();
    const [address, setAddress] = useState();
    const [profile,setProfile] =useState();
    const [imageUpload,setImageUpload]=useState(null);
    const [isUploaded,setUploaeded]=useState(false);
  const router=useRouter();
    const userId=router.query['id'];
  
    useEffect(() => {
        getUser();
      }, []);
    const getUser=async()=>{
         const db = getFirestore(app);
         const docRef=doc(db,'users',userId.toString())
         
         try {
            const docSnap = await getDoc(docRef);
      
            const d=docSnap.data();
            setName(d['name'])
            setEmail(d['email'])
            setTempEmail(d['email'])
            setAddress(d['location'])
            setImageUpload(d['profile'])
        
            
        } catch(error) {
            console.log(error)
        }
       
    }
  
    const handleImage = async (e) => {
      setImageUpload(e.target.files[0])
    }
    const upload = async (e) => {
      e.preventDefault()
      if (imageUpload !== null) {
        const storage = getStorage();
        const imageref = ref(storage, `images/${imageUpload.name + v4()}`);
        uploadBytes(imageref, imageUpload).then((snapshot) => {
  
          setUploaeded(true)
      
          getDownloadURL(snapshot.ref).then((url) => {
           
            setImageUpload(url);
          });
        });
      }
    }
   
    const handleSubmit = async (e) => {
      e.preventDefault();
       
  
  
  
  
  
  
      const data = {
  
        "name": name.toString(),
        "location": address.toString(),
        "email": email.toString(),
        "profile": String(imageUpload)
  
      }
     
      const db = getFirestore(app);
      const docRef=doc(db,'users',userId);
      await setDoc(docRef,data,{merge:true}).then(()=>{
        
        
        if(tempEmail!==email){
        router.push(
          {
             pathname:"/User/Temp",
             query:{
                id:[userId,String(email)],
             }
            
          })}
          else{
            alert("Updated User Successfully!!");
            router.push('/User')
          }
      })
      
      
    }
    const handleCancel=(e)=>{
      e.preventDefault();
      router.push("/User");
    }
    return (
      <>
 
      <div className="bg-blueGray-100 justify-center flex h-screen">
      
      <div className="w-1/2 mt-[5rem] ">
      <br></br>
       
        
          
            <div className=" bg-white rounded  ">
              <form action="#" method="POST">
                <div className="  justify-center flex">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Update User</h3>
                 </div>
                  <div className="bg-white px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                          type="text"
                          name="first-name"
                          id="first-name"
                          value={name}
                          onChange={e=>setName(e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
  
  
                      <div className="col-span-6 sm:col-span-4">
                        <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                          Email address
                        </label>
                        <input
                          type="text"
                          name="email-address"
                          id="email-address"
                          value={email}
                          onChange={e=>setEmail(e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
  
                     
  
                      <div className="col-span-6">
                        <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                           Address
                        </label>
                        <input
                          type="text"
                          name="street-address"
                          value={address}
                          id="street-address"
                          onChange={e=>setAddress(e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div className="col-span-7 flex flex-row">
                    <label htmlFor="profile" className="block text-sm font-medium text-gray-700">
                      Profile Picture
                    </label>

                    <input
                    required
                      accept="image/png, image/gif, image/jpeg"
                      type="file"
                      onChange={handleImage}
                      className="mt-1 block w-full  rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >

                    </input>
                    <div className={isUploaded?"visible":"invisible"}>
                    <div  className="fas fa-check fa-book mr-2 text-l text-green-300"/>
                  
                    </div>
                    <div className={isUploaded?"invisible":"visible"}>
                    <button
                  type="button"
                  
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={upload}
                >
                  Upload
                </button>
                    </div>
                  </div>
                    </div>

                  </div>
                  
  
                  <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                  
                  type="submit"
                  className="inline-flex justify-center mr-3 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={handleSubmit}
                   >
                      Update
                    </button>
                  </div>
             
              </form>
            </div>
          </div>
          </div>
    
       
  
             
          </>
    )
  }