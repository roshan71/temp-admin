import React, { useState, useEffect } from 'react';
import {floor} from "mathjs";
import { collection, addDoc,getFirestore, doc, getDoc } from "firebase/firestore"; 
import { getStorage, ref,
  uploadBytes,
  getDownloadURL,} from "firebase/storage";

import AmenitiesCard from '../Cards/AmenitiesCard';
import { app } from "../../utils/firebase";
import { v4 } from 'uuid';
import { useRouter } from 'next/router';
import { getUsers } from '../../utils/user';
import { async } from '@firebase/util';
export default function Property() {
    const [name, setName] = useState();
    const router=useRouter();
    const [address, setAddress] = useState();
    const [currrency, setCurrency] = useState();
    const [image,setImage] =useState(null);
    const [price,setPrice] =useState(0);
    const [short,setShortDesc] =useState();
    const [long,setLongDesc] =useState();
    const [landlord,setLandlord] =useState(null);
    const [imgList,setImgList] = useState([]);
    const [imgUrlList,setImgUrlList] = useState([]);
    const [amenities, setAmenities] = useState([]);
    const [checked, setChecked] = React.useState([0, 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]);
  const [isAdded, setAdd] = useState(false);
    
    const [isUploaded,setUploaeded]=useState();
    const [isUploaded1,setUploaeded1]=useState();
    
    const [userList, setUserList] = useState([]);
  useEffect(() => {
    setUser();

  }, []);
  const setUser = async () => {
    var list = await getUsers();
    setUserList(list);
  
  };

    const upload = async (e) => {
      e.preventDefault()
      if (image !== null) {
        const storage = getStorage();
        const imageref = ref(storage, `images/${image.name + v4()}`);
        uploadBytes(imageref, image).then((snapshot) => {
     
          setUploaeded(true)
        
          getDownloadURL(snapshot.ref).then((url) => {
           
            setImage(url);
          });
        });
      }
    }
    const handleSubmit=async(e)=>{
      
      e.preventDefault()
      if(image!=="" && imgUrlList.length!==0){
        setAdd(true)
        var tempLandlord=null
        if(landlord===null){
          tempLandlord=userList[0][0]['id']
        }
        else{
           tempLandlord=landlord
        }
     
       
      if(!checked.includes(0)){
        amenities.push('24-Hour Check-In');
      }
      if(!checked.includes(1)){
        amenities.push('Flat Screen Tv');
      }
      if(!checked.includes(2)){
        amenities.push('Washing Machine');
      }
      if(!checked.includes(3)){
        amenities.push('All utility bills included');
      }
      if(!checked.includes(4)){
        amenities.push('Free Wifi');
      }
      if(!checked.includes(5)){
        amenities.push('Cleaning Service Available');
      }
      if(!checked.includes(6)){
        amenities.push('Concierge');
      }
      if(!checked.includes(7)){
        amenities.push('Fully Equipped Kitchen');
      }
      if(!checked.includes(8)){
        amenities.push('Bedding & Towels');
      }
      if(!checked.includes(9)){
        amenities.push('Dishwasher');
      }
      if(!checked.includes(10)){
        amenities.push('Hair Dryer');
      }
      if(!checked.includes(11)){
        amenities.push('Electric/Gas Stove');
      }
      if(!checked.includes(12)){
        amenities.push('Dryer');
      }
      if(!checked.includes(13)){
        amenities.push('Iron & Ironing Board');
      }
      if(!checked.includes(14)){
        amenities.push('Double Bed');
      }
      if(!checked.includes(15)){
        amenities.push('Elevator in Building');
      }
      if(!checked.includes(16)){
        amenities.push('Laptop Friendly Workspace');
      }
      if(!checked.includes(17)){
        amenities.push('Comfort Cooling');
      }
      
      e.preventDefault(
      );
      const promises = [];

  for (var i = 0; i < imgList.length; i++) {
    // files.values contains all the files objects
    const file = imgList[i];
    const storage = getStorage();
    const metadata = {
      contentType: "image/jpeg",
    };
    // const storageRef = ref(storage, "temp/" + docRef.id + "/" + file.name);

    // promises.push(uploadBytes(storageRef, file, metadata).then(uploadResult => {return getDownloadURL(uploadResult.ref)}))
    
  }

  const db = getFirestore(app);
  const doc1=doc(db,"users",tempLandlord)
  const user=await getDoc(doc1)
 

    var resultInSeconds=floor(new Date().getTime() / 1000);
    const data={
      "id": Number  (resultInSeconds),
      "address":address.toString(),
      "amenities":amenities,
      "currency":currrency.toString(),
      "longDes":long.toString(),
      "price":Number(price),
      "name":name.toString(),
      "shortDes":short.toString(),
      "img":image.toString(), 
      "imgList":imgUrlList,
      "landlord":user.ref
    }
      
    const docRef = await addDoc(collection(db, "room"), data);
    if(docRef.id){
      alert("Added room Successfully!!");
      router.push("/Property")
    }
    else{
      setAdd(false)
      alert("Something went wrong in Adding Room")
    }
      
     
   }
    else{
     
      alert("Please Upload Images!!")
    }
    }

    const handleToggle = value => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
  
      if (currentIndex === -1) {
        newChecked.push(value);

      } else {
        newChecked.splice(currentIndex, 1);
      }
      setChecked(newChecked);
    };

    const handleProfile = (e) => {
        if (e.target.files && e.target.files[0]) {
            const img = e.target.files[0];
            setImage(img);
        }
    };
    const handleImgList =(e)=>{
      var list = [];
     
      if (e.target.files && e.target.files[0]) {
        for(var i =0;i<e.target.files.length;i++){
          list.push(e.target.files[i]);
        }
        setImgList(list);
    }
    }
    const uploadMultiple=async(e)=>{
      e.preventDefault();
      if(imgList.length!==0){const storage = getStorage();
      const urlList=[];
      for(var i =0;i<imgList.length;i++){
        if (image !== null) {
         
          const imageref = ref(storage, `images/${imgList[i].name + v4()}`);
          uploadBytes(imageref, imgList[i]).then((snapshot) => {
      
            
        
            getDownloadURL(snapshot.ref).then((url) => {
           
              
              urlList.push(url.toString())
            });
          });
        }
      }
      setImgUrlList(urlList)
     
        setUploaeded1(true)}
      
    }
    const handleCancel=(e)=>{
      e.preventDefault();
      router.push("/Property");
    }
    const handleUser=(e)=>{
     
      setLandlord(e.target.value)
    }
   
    const amenities_data=[{id:0,name:"24-Hour Check-In"},
    {id:1 ,name:"Flat Screen Tv"},
    {id:2 ,name:"Washing Machine"},
    {id:3 ,name:"All utility bills included"},
    {id:4 ,name:"Free Wifi"},
    {id:5 ,name:"Cleaning Service Available"},
    {id:6 ,name:"Concierge"},
    {id:7 ,name:"Fully Equipped Kitchen"},
    {id:8 ,name:"Bedding & Towels"},
    {id:9 ,name:"Dishwasher"},
    {id:10 ,name:"Hair Dryer"},
    {id:11 ,name:"Electric/Gas Stove"},
    {id:12 ,name:"Dryer"},
    {id:13 ,name:"Iron & Ironing Board"},
    {id:14 ,name:"Double Bed"},
    {id:15 ,name:"Elevator in Building"},
    {id:16 ,name:"Laptop Friendly Workspace"},
    {id:17 ,name:"Comfort Cooling"},
  ];
    return (
      <>
      <div className="bg-blueGray-100 justify-center flex h-full">
      
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
                            Name
                        </label>
                        <input
                          type="text"
                          name="property-name"
                          id="first-name"
                          required

                          onChange={e=>setName(e.target.value)}
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
                          required
                          id="street-address"
                          onChange={e=>setAddress(e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                     
                      <div className="col-span-6">
                        <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                           Currenecy
                        </label>
                        <input
                          type="text"
                          name="currency"
                          id="currency"
                          required
                          onChange={e=>setCurrency(e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div className="col-span-6">
                        <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                           Price
                        </label>
                        <input
                          type="number"
                          name="price"
                          id="price"
                          required
                          onChange={e=>setPrice(e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div className="col-span-6">
                        <label htmlFor="car" className="block text-sm font-medium text-gray-700">
                           Select LandLord
                        </label>
                        <select  name="landlord" id="landlord" onChange={(e)=>handleUser(e)}>
                         
                          {userList.map((e)=>(
                           <option   value={e[0]['id']}>{e[1]['email']}</option>
                          ))}
               
                        </select>

                      </div>
                     
  
                    
                      <div className="col-span-7">
                        <label htmlFor="profile" className="block text-sm font-medium text-gray-700">
                          Image
                        </label>
               
                        <input
                        accept="image/png, image/gif, image/jpeg" 
                          type="file"
                         required
                          
                          onChange={handleProfile}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
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

                      <div className="col-span-7">
                        <label htmlFor="profile" className="block text-sm font-medium text-gray-700">
                          Multiple Image
                        </label>
               
                        <input
                        accept="image/png, image/gif, image/jpeg" 
                          type="file"
                         required
                          multiple
                          onChange={handleImgList}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        <div className={isUploaded1?"visible":"invisible"}>
                    <div  className="fas fa-check fa-book mr-2 text-l text-green-300"/>
                  
                    </div>
                    <div className={isUploaded1?"invisible":"visible"}>
                    <button
                  type="button"
                  
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={uploadMultiple}
                >
                  Upload Multiple
                </button>
                    </div>
                      </div>


                      <div className="col-span-6">
                        <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                           Short Description
                        </label>
                        <input
                          type="text"
                          name="short-description"
                          id="short-desc"
                          required
                          onChange={e=>setShortDesc(e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div className="col-span-6">
                        <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                           Long Description
                        </label>
                        <textarea
                          name="long-desc"
                          id="long-desc"
                          rows="4"
                          required
                          onChange={e=>setLongDesc(e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <br></br>
                      {/* TV WiFi hotwater Pets Allowed */}
                      <fieldset>
                    <legend className="sr-only">Amenities</legend>
                    <div className="text-base font-medium text-gray-900" aria-hidden="true">
                    Amenities
                    </div>
                    <div className="space-y-4 flex flex-wrap">
                   
                   {amenities_data.map((e)=>{
                   return <div key={e['id']}>
                     <div  className="flex items-start mb-1">
                     <div className="flex h-5 items-center">
                       <input
                       
                         id={e['name']}
                         name="Amenities"
                         value={e['name']}
                         type='checkbox'
                         tabIndex={e['id']}
                         onClick={() => handleToggle(e['id'])} 
                         className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                       />
                     </div>
                     <div className="ml-3 mr-3 text-sm">
                       <label htmlFor={e['name']} className="font-medium text-gray-700">
                         {e['name']}
                       </label>
                         </div>
                   </div>
                   </div>
                   })}
                      {/* <div className="flex items-start">
                        <div className="flex h-5 items-center">
                          <input
                            id="TV"
                            name="Amenities"
                            value="TV"
                            type="checkbox"
                            tabIndex={-1}
                            onClick={() => handleToggle(0)} 
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                        </div>
                        <div className="ml-3 mr-3 text-sm">
                          <label htmlFor="TV" className="font-medium text-gray-700">
                            TV
                          </label>
                            </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex h-5 items-center">
                          <input
                            id="WiFi"
                            name="Amenities"
                            value="WiFi"
                            type="checkbox"
                            tabIndex={0}
                            onClick={() => handleToggle(1)} 
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                        </div>
                        <div className="ml-3  mr-3 text-sm">
                          <label htmlFor="WiFi" className="font-medium text-gray-700">
                            WiFi
                          </label>
                            </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex h-5 items-center">
                          <input
                            id="pet-allowed"
                            name="Amenities"
                            value="pet allwoed"
                            type="checkbox"
                            tabIndex={2}
                            onClick={() => handleToggle(3)} 
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                        </div>
                        <div className="ml-3  mr-3 text-sm">
                          <label htmlFor="pet-allowed" className="font-medium text-gray-700">
                            Pets Allowed
                          </label>
                            </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex h-5 items-center">
                          <input
                            id="mini-bar"
                            name="Amenities"
                            value="Mini Bar"
                            type="checkbox"
                            tabIndex={3}
                            onClick={() => handleToggle(4)} 
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                        </div>
                        <div className="ml-3  mr-3 text-sm">
                          <label htmlFor="mini-bar" className="font-medium text-gray-700">
                           Mini Bar
                          </label>
                            </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex h-5 items-center">
                          <input
                            id="bathroom"
                            name="Amenities"
                            value="bathroom"
                            type="checkbox"
                            tabIndex={4}
                            onClick={() => handleToggle(5)} 
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                        </div>
                        <div className="ml-3  mr-3 text-sm">
                          <label htmlFor="bathroom" className="font-medium text-gray-700">
                           Bathroom
                          </label>
                            </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex h-5 items-center">
                          <input
                            id="AC"
                            name="Amenities"
                            value="AC"
                            type="checkbox"
                            tabIndex={5}
                            onClick={() => handleToggle(6)} 
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                        </div>
                        <div className="ml-3  mr-3 text-sm">
                          <label htmlFor="AC" className="font-medium text-gray-700">
                           Air Conditioning
                          </label>
                            </div>
                      </div>
                      */}
                    </div>
                  </fieldset>
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