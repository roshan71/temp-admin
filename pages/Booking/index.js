
import BookingCard from "../../components/Cards/BookingCard";
import Sidebar from "../../components/SideBar";
import { useState,useEffect } from "react"
import Link from "next/link";
import { getBooking } from "../../utils/bookings"
const Booking=(e)=>{
    const [bookingList, setBookingList] = useState([]);
   
    useEffect(() => {
      setBooking();
    }, []);
    const setBooking = async () => {
      var list = await getBooking();

      setBookingList(list);

   
    };

    return(
    <>
     <Sidebar/>
     
     <div className=" md:ml-64  bg-blueGray-100" style={{padding:"10px",minHeight:"100vh"}}>
     <Link href="/Booking/AddBooking">
                <div className={"inline-flex m-2 justify-center rounded-md border border-transparent bg-white py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"}>
                    Add Booking
                 </div>
                </Link>
   <div  >
   
    <div>
    {bookingList.map((e) => ( 
            <BookingCard key={e[0]['id']} id={e[0]['id']} roomref={e[1]['roomRef']} custName={e[1]['custName']} bookDate={e[1]['bookDate']} price={e[1]['amount']} status={e[1]['status']}/>

          ))}
      
     </div>
     </div>
     </div>




    </>)
}

export default Booking