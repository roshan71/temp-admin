import { async } from '@firebase/util';
import { requestToBodyStream } from 'next/dist/server/body-streams';
import React, { useEffect, useState } from 'react';
import { collection, addDoc,getFirestore,query,where,getDocs, setDoc,doc } from "firebase/firestore"; 
import { getStorage } from "firebase/storage";
import { app } from "../../utils/firebase";
import { useRouter } from 'next/router';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import {
  ref,
  uploadBytes,
  getDownloadURL,
  
} from "firebase/storage";
import { v4 } from "uuid";
export default function Form() {
  const router=useRouter();
  const [name1, setName] = useState();
  const [password, setPass] = useState();
  const [email1, setEmail] = useState();
  const [address1, setAddress] = useState();
  const [profile1, setProfile] = useState();
  const [imageUpload, setImageUpload] = useState(null);
  const [isUploaded, setUploaeded] = useState(false);
  const [isAdded, setAdd] = useState(false);

  const handleImage = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0];
      setImageUpload(img);
  }
   
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
  useEffect(() => {
      

  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();




      if(isUploaded){

        setAdd(true)
      const data = {

        "name": name1.toString(),
        "location": address1.toString(),
        "email": email1.toString(),
        "profile": imageUpload!=null?imageUpload.toString():""

      }
  

      const db = getFirestore(app);
      const already = query(collection(db, 'users'), where('email', '==', email1))
      const querySnapshot = await getDocs(already)
      
      if (querySnapshot.docs.length===0){
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email1, password)
        .then(async(userCredential) => {
        
          // console.log(userCredential.user.uid)
          const docRef =doc(db,'users',userCredential.user.uid)
          await setDoc(docRef,data)
          // const docRef = await addDoc(collection(db, "users","userCredential.user.uid"), data);
        router.push("/User")
        })
        .catch((error) => {
          console.log(error)
          setAdd(false)
        const errorCode = error.code;
        alert("Something Wents Wrong!");
        const errorMessage = error.message;
      // ..
      });
       
        
      
      }
  else{
    alert("Already Exists Email!!!");
  }}
  else{
    alert("Please Upload Image");  }
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
            <form action="#" method="POST" onSubmit={handleSubmit}>
              <div className="  justify-center flex">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Add User</h3>
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
                      required
                      id="first-name"
                      onChange={e => setName(e.target.value)}
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
                      required
                      id="email-address"
                      onChange={e => setEmail(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>



                  <div className="col-span-6">
                    <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <input
                      type="text"
                      required
                      name="street-address"
                      id="street-address"
                      onChange={e => setAddress(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="col-span-6">
                    <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      type="text"
                      required
                      name="pwd"
                      id="pwd"
                      onChange={e => setPass(e.target.value)}
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
                  disabled={isAdded}
                  type="submit"
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