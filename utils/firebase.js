



import { getAuth } from 'firebase/auth'


import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

 import { getFirestore } from "firebase/firestore";
 import { getStorage } from "firebase/storage";
import { exp, stirlingS2 } from 'mathjs';

 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//   const firebaseConfig = {
//  apiKey: process.env.APIKEY,
//     authDomain: process.env.AUTHDOMAIN,
//      projectId: process.env.PROJECTID,
//     storageBucket: process.env.STORAGEBUCKET,
//     messagingSenderId: process.env.MESSAGINGSENDERID,
//     appId:process.env.APPID



  const firebaseConfig={
    apiKey: String(process.env.APIKEY),
    authDomain:String(process.env.AUTHDOMAIN),
    projectId: String(process.env.PROJECTID),
    storageBucket: String(process.env.STORAGEBUCKET),
    messagingSenderId: String(process.env.MESSAGINGSENDERID),
    appId: String(process.env.APPID),
    
  }


const app = initializeApp(firebaseConfig);

const db=getFirestore();
const storage = getStorage();
export {firebaseConfig}
 export {db};
 export {storage};
 export {app};

  export const auth = getAuth()
