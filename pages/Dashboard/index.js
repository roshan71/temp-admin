import React from "react";

// components

import { getUsers } from "../../utils/user.js";
import { useState,useEffect } from "react";
// components
import {getRoom} from "../../utils/property";

import { getBooking } from "../../utils/bookings";
import Sidebar from "../../components/SideBar.js";
import HeaderStats from "../../components/Cards/HeaderStats.js";


export default function   Admin({ children }) {
  const [userList, setUserList] = useState([]);
  const [bookingList, setBookingList] = useState([]);
  const [roomList, setRoomList] = useState([]);
  
  useEffect(() => {
    setUser();
    setRoom();
    setBooking();
    
  }, []);
  const setUser = async () => {
    var list = await getUsers();
    setUserList(list);

  };
 
  const setRoom = async () => {
    var list = await getRoom();
    
    setRoomList(list);
  };

   
  
    const setBooking = async () => {
      var list = await getBooking();
  
      setBookingList(list);

   
    };
  return (
    <>
      <Sidebar />
      <div className=" md:ml-64  bg-blueGray-100" style={{minHeight:"100vh"}}>
    
    
        {/* Header */}
        <HeaderStats user={userList.length} booking={bookingList.length} room={roomList.length}/>
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          {children}
         
        </div>
      </div>
    </>
  );
}
