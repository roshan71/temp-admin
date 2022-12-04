import { doc, Firestore } from "firebase/firestore";
import { app } from "./firebase";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
const getRoom = async () => {
const db = getFirestore(app);
const roomCol = collection(db, 'room');
  const roomSnapshot = await getDocs(roomCol);
  const roomList = roomSnapshot.docs.map(doc => [{"id":doc.id,"ref":doc.ref},doc.data()]);

  return roomList;
};

export { getRoom };