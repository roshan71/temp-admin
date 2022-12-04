import { CollectionReference, doc, Firestore, orderBy } from "firebase/firestore";
import { app } from "./firebase";




import { query } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
const getRequest = async () => {
const db = getFirestore(app);
// const requestCol = collection(db, 'specialRequest');
//   const requestSnapshot = await getDocs(requestCol);
  const already = query(collection(db, 'specialRequest'), orderBy("time","desc"))
  const requestSnapshot = await getDocs(already);
  const requestList = requestSnapshot.docs.map(doc => [{"id":doc.id},doc.data()]);
 
  return requestList;
};

export { getRequest };