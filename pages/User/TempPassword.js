

import { async } from '@firebase/util';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function TempPassword(props){
  const router=useRouter();
  const temp=router.query['id']??[];
  
  useEffect(() => {
      if(props['done'][0]===2){
        alert("Updated User Password Successfully!!");
        router.push('/User')
      }
      else{
        alert("Something Went Wrong! Please try agian later");
        router.push('/User')
      }

  }, []);
    return(<><h1>Updating...</h1></>)
}

export async function getServerSideProps(context) {
    const o=[]
    //const pk=process.env.SECERT
    //  console.log("psfojcojv sndo vnosdjo jdsobj oldfsjb o",pk)
  //  const se=require("../../utils/setSercet")
  //  console.log(se.default.setSercet)
  //  console.log(se)
  //  console.log(se)
    require('dotenv').config
   const  k=JSON.parse(process.env.PRIVATE_KEY)
   const k2=k.private_key
  // console.log(k2)
    const serviceAccount1={
      type:process.env.TYPE,
      project_id:process.env.PROJECT_ID,
      private_key_id:process.env.PRIVATE_KEY_ID ,
      private_key: k2 ,
      client_email:process.env.CLIENT_EMAIL ,
      client_id:process.env.CLIENT_ID,
      auth_uri:process.env.AUTH_URI ,
      token_uri:process.env.TOKEN_URI ,
      auth_provider_x509_cert_url:process.env.AUTH_PROVIDER_X509_CERT_URL ,
      client_x509_cert_url:process.env.CLIENT_CERT_URL, 
    }
    // console.log(context)
    if(Object.keys(context.query).length!==0){
        



    const admin=require('firebase-admin')
     if (admin.apps.length === 0) {
       admin.initializeApp({
         credential: admin.credential.cert(serviceAccount1),
         databaseURL: "https://fir-c155e.firebaseio.com"
       });
    }
    // console.log(context)
      const uid=String(context.query['id'][0])
      const pass=context.query['id'][1]
  
      await admin.auth().updateUser(uid, {
        password: pass,
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