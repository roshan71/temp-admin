

import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { secert } from '../../utils/firebase';
export default function Temp(props){
  const router=useRouter();
  const temp=router.query['id']??[];
 
  useEffect(() => {
    if(props['done'][0]===2){
        alert("Updated User  Successfully!!");
        router.push('/User')
      }
      else{
        alert("Something Went Wrong! Please try agian later");
        router.push('/User')
      }

  }, []);
    return(<><h1>Updating...</h1></>)
}

export const  getServerSideProps=async(context)=> {
    const o=[]
    
    // require('dotenv').config
   
    // const pk=process.env.SECERT
    // console.log(pk)
    // const serviceAccount={
    //   type:String(process.env.TYPE),
    //   project_id:String(process.env.PROJECT_ID),
    //   private_key_id:String(process.env.PRIVATE_KEY_ID) ,
    //   private_key:pk['private_key'],
    //   client_email:String(process.env.CLIENT_EMAIL),
    //   client_id:String(process.env.CLIENT_ID),
    //   auth_uri:String(process.env.AUTH_URI) ,
    //   token_uri:String(process.env.TOKEN_URI) ,
    //   auth_provider_x509_cert_url:String(process.env.AUTH_PROVIDER_X509_CERT_URL) ,
    //   client_x509_cert_url:String(process.env.CLIENT_CERT_URL), 
    // }
    // console.log(serviceAccount)
    if(Object.keys(context.query).length!==0){
        
    const serviceAccount = require("../../secert.json");
  //     console.log(serviceAccount)
      

    const admin=require('firebase-admin')
     if (admin.apps.length === 0) {
       admin.initializeApp({
         credential: admin.credential.cert(serviceAccount),
         databaseURL: "https://fir-c155e.firebaseio.com"
       });
    }
    // console.log(context)
      const uid=String(context.query['id'][0])
      const e=context.query['id'][1]
  
      await admin.auth().updateUser(uid, {
        email: e,
      })
      .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        o.push(2)
        console.log('Successfully updated user', userRecord.toJSON());
        return{props:{done:o}}
          })
      .catch((error) => {
        console.log(error)
       o.push(1)
       return{props:{done:o}}

      });}
      
      return {props:{done:o}}
  }