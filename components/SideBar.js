import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";


export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const router = useRouter();


  const handleSignOut=(e)=>{
   e.preventDefault();
   
    localStorage.removeItem('uid')
    router.reload(window.location.pathname);

  }
  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl  flex flex-wrap items-center justify-between relative md:w-64 z-10 "style={{backgroundColor:'#163e6f'}}>
       
    
   
        <div className="md:flex-col   md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */} 
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
         
          {/* User */}
         
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col  md:items-stretch md:opacity-100 md:relative  md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1  " +
              collapseShow
            }
            style={{backgroundColor:'#163e6f'}}
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-700">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            
            
            {/* Form */}
          
            {/* Divider */}
           
            {/* Heading */}
            <div className="bg-white   ">
              <div className="flex flex-row  justify-center" style={{padding:"2rem"}}>
            <img src="/logo1.png" ></img>
            </div>
            </div>
            {/* Navigation */}
            <div className="px-4 py-6">
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <Link href="/Dashboard">
                  <div
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                     "text-white hover:text-lightBlue-600"
                       
                    }
                  >
                    <i
                      className={
                        "fas fa-tv mr-2 text-sm " +
                       
                           "text-blueGray-300"
                      }
                    ></i>{" "}
                    Dashboard
                  </div>
                </Link>
              </li>
              <li className="items-center">
                <Link href="/SpecialRequest">
                <div
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                     "text-white hover:text-lightBlue-600"
                       
                    }
                  >
                    <i
                      className={
                        "fas fa-eye mr-2 text-sm " +
                        (router.pathname.indexOf("/SpecialRequest") !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Special Request
              </div>
                </Link>
              </li>
              <li className="items-center">
                <Link href="/User">
                <div
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                     "text-white hover:text-lightBlue-600"
                       
                    }
                  >
                    <i
                      className={
                        "fas fa-user mr-2 text-sm " +
                        (router.pathname.indexOf("/User") !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    User
              </div>
                </Link>
              </li>
            
              <li className="items-center">
                <Link href="/Property">
                <div
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                     "text-white hover:text-lightBlue-600"
                       
                    }
                  >
                    <i
                      className={
                        "fas fa-solid fa-cubes mr-2 text-sm " +
                        (router.pathname.indexOf("/Property") !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Property
              </div>
                </Link>
              </li>
              <li className="items-center">
                <Link href="/Booking">
                <div
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                     "text-white hover:text-lightBlue-600"
                       
                    }
                  >
                    <i
                      className={
                        "fas fa-solid fa-book mr-2 text-sm " +
                        (router.pathname.indexOf("/Booking") !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Booking
              </div>
                </Link>
              </li>
              <li className="items-center">
                
                <div
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                     "text-white hover:text-lightBlue-600"
                       
                    }
                  >
                    <i
                      className={
                        "fas fa-solid fa-sign-out-alt mr-2 text-sm " +
                        (router.pathname.indexOf("/Booking") !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    <button  className= "text-xs uppercase py-3 font-bold  text-white hover:text-lightBlue-600" onClick={(e)=>handleSignOut(e)}>Sign Out</button>
              </div>
                
              </li>
            </ul>

                     </div>

</div>        </div>
      </nav>
    </>
  );
}
