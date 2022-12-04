import { CollectionReference, doc, Firestore, orderBy } from "firebase/firestore";
import { app } from "./firebase";




import { query } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
const getBooking = async () => {
const db = getFirestore(app);
// const bookingCol = collection(db, 'bookings');
  // const bookingSnapshot = await getDocs(bookingCol);
  const already = query(collection(db, 'bookings'), orderBy("time","desc"))
  const bookingSnapshot = await getDocs(already);
  const bookingsList = bookingSnapshot.docs.map(doc => [{"id":doc.id},doc.data()]);

  return bookingsList;
};

export { getBooking };