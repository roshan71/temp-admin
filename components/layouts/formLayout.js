import SideBar from "../SideBar";
import Form from "../Forms/Form";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getUsers } from "../../utils/user";
import { useRouter } from "next/router";
import Grid from '@mui/material/Grid';
import Image from "next/image";
import UserCard from "../Cards/UserCard";
import { height } from "@mui/system";


function FormLayout({children}){
  const router=useRouter();
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    setUser();
  }, []);
  
  const setUser = async () => {
    var list = await getUsers();
    setUserList(list);

  };
    const handleAdd=(e)=>{
    e.preventDefault();
    router.pathname.indexOf("/User/addUser")
  }
  return (
    <>
        <div className=" md:ml-64  bg-blueGray-100" style={{minHeight:"100vh"}}>
      <SideBar />
      <Link href="/User/addUser">
                <div
                    className={"inline-flex m-2 justify-center rounded-md border border-transparent bg-white py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      
                       
                    }
                  >
                    
                    Add User
              </div>
                </Link>


{userList.map((e) => ( 
        
            <UserCard key={e[0]["id"]} id={e[0]["id"]}name={e[1]['name']} email={e[1]['email']}/>
       ))}
     
      </div>
    </>
  );
};

export default FormLayout;
