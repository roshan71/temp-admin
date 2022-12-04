import React, { use, useEffect, useState } from 'react';
import {floor} from "mathjs";
import { collection, getDoc,setDoc,getFirestore,doc } from "firebase/firestore"; 
import { getStorage, ref,
  uploadBytes,
  getDownloadURL,} from "firebase/storage";
import { app } from "../../utils/firebase";
import { v4 } from 'uuid';
import { useRouter } from 'next/router';
import { getUsers } from '../../utils/user';
import { async } from '@firebase/util';
export default function EditProperty () {
    const [name, setName] = useState();

    const router=useRouter();
    const [address, setAddress] = useState();
    const [currrency, setCurrency] = useState();
    const [image,setImage] =useState();
    const [price,setPrice] =useState(0);
    const [short,setShortDesc] =useState();
    const [long,setLongDesc] =useState();
    const [imgList,setImgList] = useState([]);
    const [imgUrlList,setImgUrlList] = useState([]);
    const [amenities, setAmenities] = useState([]);
    const [checked, setChecked] = React.useState([]);
    const [isChecked,setIsChecked]=useState([]);
    const [isUploaded,setUploaeded]=useState();
    const [isUploaded1,setUploaeded1]=useState();
    const [userList, setUserList] = useState([]);
    const [landlord,setLandlord] =useState();
    const [selected,setSelected]=useState()
    const temp=router.query["a1"]??[];
    const roomId=temp[0];
    const roomUser=temp[1];

    useEffect(() => {
        getProperty();
        setUser();

      }, []);
      const setUser = async () => {
        var list = await getUsers();
        setUserList(list);
   
        for(var i=0;i<list.length;i++){
          if(list[i][0]['id']===roomUser){
            setSelected(list[i][1]['email'])
          
            break
          }
        }
      };
    const getProperty=async()=>{
        
         
         try {
          const db = getFirestore(app);
          const docRef=doc(db,'room',roomId)
            const docSnap = await getDoc(docRef);
            const d=docSnap.data();
            setAddress(d['address'])
            setName(d['name'])
            setPrice(d['price'])
            setCurrency(d['currency'])
            setShortDesc(d['shortDes'])
            setLongDesc(d['longDes'])
            setImgUrlList(d['imgList'])
            setImage(d['img'])
            setLandlord(d['landlord'])
            setChecked([])
          
           for(var i=0;i<d['amenities'].length;i++){
            if(d['amenities'][i]==='24-Hour Check-In'){
             checked.push(0)
            }
            else if(d['amenities'][i]==='Flat Screen Tv'){
             
              checked.push(1)
            }
            else if(d['amenities'][i]==='Washing Machine'){
             
              checked.push(2)
            }
            else if(d['amenities'][i]==='All utility bills included'){
             
              checked.push(3)
            }
            else if(d['amenities'][i]==='Free Wifi'){
             
              checked.push(4)
            }
            else if(d['amenities'][i]==='Cleaning Service Available'){
             
              checked.push(5)
            }
            else if(d['amenities'][i]==='Concierge'){
             
              checked.push(6)
            }
            else if(d['amenities'][i]==='Fully Equipped Kitchen'){
             
              checked.push(7)
            }
            else if(d['amenities'][i]==='Bedding & Towels'){
             
              checked.push(8)
            }
            else if(d['amenities'][i]==='Dishwasher'){
             
              checked.push(9)
            }
            else if(d['amenities'][i]==='Hair Dryer'){
             
              checked.push(10)
            }
            else if(d['amenities'][i]==='Electric/Gas Stove'){
             
              checked.push(11)
            }
            else if(d['amenities'][i]==='Dryer'){
             
              checked.push(12)
            }
            else if(d['amenities'][i]==='Iron & Ironing Board'){
             
              checked.push(13)
            }
            else if(d['amenities'][i]==='Double Bed'){
             
              checked.push(14)
            }
            else if(d['amenities'][i]==='Elevator in Building'){
             
              checked.push(15)
            }
            else if(d['amenities'][i]==='Laptop Friendly Workspace'){
             
              checked.push(16)
            }
            else if(d['amenities'][i]==='Comfort Cooling'){
             
              checked.push(17)
            }
            
             


           }
           setChecked([...checked])
        } catch(error) {
            console.log(error)
        }
       
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
      if(image!=="" && imgUrlList.length!==0){
      var tempLandlord=null
      if(landlord===null){
        tempLandlord=userList[0][0]['id']
      }
      else{
      
         tempLandlord=landlord.firestore._firestoreClient.user.uid
      }
   
      const t=[]
       
      if(checked.includes(0)){
        t.push('24-Hour Check-In');
      }
      if(checked.includes(1)){
        t.push('Flat Screen Tv');
      }
      if(checked.includes(2)){
        t.push('Washing Machine');
      }
      if(checked.includes(3)){
        t.push('All utility bills included');
      }
      if(checked.includes(4)){
        t.push('Free Wifi');
      }
      if(checked.includes(5)){
        t.push('Cleaning Service Available');
      }
      if(checked.includes(6)){
        t.push('Concierge');
      }
      if(checked.includes(7)){
        t.push('Fully Equipped Kitchen');
      }
      if(checked.includes(8)){
        t.push('Bedding & Towels');
      }
      if(checked.includes(9)){
        t.push('Dishwasher');
      }
      if(checked.includes(10)){
        t.push('Hair Dryer');
      }
      if(checked.includes(11)){
        t.push('Electric/Gas Stove');
      }
      if(checked.includes(12)){
        t.push('Dryer');
      }
      if(checked.includes(13)){
        t.push('Iron & Ironing Board');
      }
      if(checked.includes(14)){
        t.push('Double Bed');
      }
      if(checked.includes(15)){
        t.push('Elevator in Building');
      }
      if(checked.includes(16)){
        t.push('Laptop Friendly Workspace');
      }
      if(checked.includes(17)){
        t.push('Comfort Cooling');
      }
      
      e.preventDefault();
      setAmenities(t)
       
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
  const doc1=doc(db,"users",tempLandlord  )
  const user=await getDoc(doc1)
    const data={
      
      "address":address.toString(),
      "amenities":t,
      "currency":currrency.toString(),
      "longDes":long.toString(),
      "price":Number(price),
      "name":name.toString(),
      "shortDes":short.toString(),
      "img":image.toString(), 
      "imgList":imgUrlList,
      "landlord":user.ref
    }

    const docRef=doc(db,'room',roomId)
    await setDoc(docRef,data,{merge:true});
    if(docRef.id){
        alert("Updated room Successfully!!");
        router.push("/Property")
      }
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
      const storage = getStorage();
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
     
        setUploaeded1(true)
      
    }
  
    const handleCancel=(e)=>{
        e.preventDefault();
        router.push("/Property");
      }

      const handleUser=(e)=>{
       
        setLandlord(e.target.value)
      }
   
    return (
      <>
      <div className="bg-blueGray-100 justify-center flex h-full">
      
      <div className="w-1/2 mt-[5rem] mb-[5rem] ">
      <br></br>
       
        
          {/* address currrency img(upload) long desc shot desc name price */}
            <div className=" bg-white rounded  ">
              <form action="#" method="POST">
                <div className="  justify-center flex">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Edit Properties</h3>
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
                          value={name}
                          id="first-name"
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
                          value={address}
                          name="street-address"
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
                          value={currrency}
                          id="currency"
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
                          value={price}
                          id="price"
                          onChange={e=>setPrice(e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                     
                      <div className="col-span-6">
                        <label htmlFor="car" className="block text-sm font-medium text-gray-700">
                           Select LandLord
                        </label>
                       
                        <select name="landlord" id="landlord"  onChange={(e)=>handleUser(e)}>
                          {userList.map((e)=>(
                           <option value={e[0]['id']} selected={roomUser===e[0]['id']}>{e[1]['email']}</option>
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
                          value={short}
                          id="short-desc"
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
                          value={long}
                          rows="4"
                          onChange={e=>setLongDesc(e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <br></br>
                      {/* tv wifi hotwater pet allowed */}
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
                        checked={checked.includes(e['id'])}
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
                     
                    </div>
                  </fieldset>
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