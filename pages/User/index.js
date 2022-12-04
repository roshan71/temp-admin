import FormLayout from "../../components/layouts/formLayout"


import { getFirestore,  } from 'firebase/firestore';
import { app } from "../../utils/firebase";
import {  doc, setDoc,getDoc } from 'firebase/firestore';
import { async } from "@firebase/util";
import { useEffect } from "react";
const {servus}=require('../../secert.json')

const User=()=>{

 return(
        <>
      
        <FormLayout>
        </FormLayout>
        </>
    )
}

export default User
