import { async } from '@firebase/util';
import {  doc, setDoc,getDoc } from 'firebase/firestore';
import { requestToBodyStream } from 'next/dist/server/body-streams';
import React, { useEffect, useState } from 'react';
import { getFirestore,  } from 'firebase/firestore';
import {getStorage} from "firebase/storage";
import { getAuth, updatePassword } from "firebase/auth";

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
import { computeStyles } from '@popperjs/core';
export default function UserEdit(props) {
    const [password, setPassword] = useState();
    const [conformPass, setConformPass] = useState();
  const router=useRouter();
    const user=router.query['ed'];
    const userId=user[0];
   
    const userName=user[1];
    useEffect(() => {
      
      }, []);
   
    
  
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if(password.length>=6) {
      if(password===conformPass){
       
      
        router.push(
          {
             pathname:"/User/TempPassword",
             query:{
                id:[userId,password],
              
             }
            
          })
          
          
      }
      else{
        alert("Password and Confirm Password not Match");
        setConformPass("")
        setPassword("")
      }
    }
      else{
        alert("Length of Password Should be Greater than 6")
      }
  
  
  
  
  
  
    //   const data = {
  
    //     "name": name.toString(),
    //     "location": address.toString(),
    //     "email": email.toString(),
    //     "profile": imageUpload.toString()
  
    //   }
     
    //   const db = getFirestore(app);
    //   const docRef=doc(db,'users',userId);
    //   await setDoc(docRef,data).then(()=>{
        
    //     alert("Updated User Successfully!!");
    //     router.push("/User")
    //   })
      
      
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
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Update Password</h3>
                 </div>
                  <div className="bg-white px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="pass" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                          type="password"
                          name="pass"
                          id="Pass"
                          required
                          value={password}
                          onChange={e=>setPassword(e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
  
  
                      <div className="col-span-6 sm:col-span-4">
                        <label htmlFor="con-pass" className="block text-sm font-medium text-gray-700">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          name="con-pass"
                          id="con-pass"
                          required
                          value={conformPass}
                          onChange={e=>setConformPass(e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
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