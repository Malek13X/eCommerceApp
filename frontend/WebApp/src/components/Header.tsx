import { Link, useNavigate } from "react-router-dom"
import React, { useEffect, useState } from "react";
import { navLinks } from "../components/data";
import { AiOutlineMenuUnfold, AiOutlineMenuFold, AiFillProfile } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../features/user/authSlice";
import { AppDispatch } from "../app/store";
import { HiUserCircle } from "react-icons/hi";


function Header() {
  const [isMobileNavOpen, setisMobileNavOpen] = useState(false); 
  const [isProfileOpen, setisProfileOpen] = useState(false); 
  
  
  const dispatch = useDispatch<AppDispatch>()
  
  const {user} = useSelector((state:any) => state.auth) 

  useEffect(() => {
    
    
  }, [user]);
    
  
  const onSignOutClick = () => {
    dispatch(signOut());
     
    // ? window.location.reload(false); 
  }
  


  //   If button is there
  function handleClick() {
    if (isMobileNavOpen) {
      setisMobileNavOpen(false);
    }
  };
  // const body = document.body
  // body?.addEventListener('click', closeWhenClickedOutside)
  // function closeWhenClickedOutside(this: HTMLElement, event: any) {
  //     setisMobileNavOpen(false);
  //     console.log('Clickty Clack!!');
  //     body.removeEventListener('click', event.closeWhenClickedOutside);
   
  // }

  return (
    <div className="">
      <header className="flex flex-wrap fixed  w-screen   h-2 top-0  z-50 ">
        <div className="w-full ">
          <div className="  mx-auto ">
            <div className="w-full flex justify-between items-center p-2  dark:bg-[#222831] bg-white  shadow-lg font-medium capitalize">
            
              {/* Logo */}
              <div className="flex lg:w-1/6 ">
                <span className="flex px-2 mr-2 md:border-r border-[#eeeeee]" >
                  <img
                    src="https://www.freepnglogos.com/uploads/spotify-logo-png/file-spotify-logo-png-4.png"
                    alt="alt placeholder"
                    className="w-8 h-8 -mt-1 inline mx-auto"
                  />
                </span>
                  E-Comm
              </div>
             
              <div className="w-screen mr-5 pl-20  md:flex gap-x-51 justify-center items-center  text-black  bg-white font-medium capitalize hidden">
              
                {/* Links */}
                <div className="justify-center flex  bg-gray-300 flex-1">
                  <Link  to='/' className={`px-2 py-1 flex items-center cursor-pointer  hover:dark:bg-slate-100 hover:dark:bg-opacity-10  text-sm rounded `}>
                      <span className="mx-1">Home</span>
                  </Link>

                  
                  <Link  to='/' className={`px-2 py-1 flex items-center cursor-pointer  hover:dark:bg-slate-100 hover:dark:bg-opacity-10  text-sm rounded `}>
                    <span className="mx-1">Catagories</span>
                  </Link>
                
                <Link  to='/' className={`px-2 py-1 flex items-center cursor-pointer  hover:dark:bg-slate-100 hover:dark:bg-opacity-10  text-sm rounded `}>
                    <span className="mx-1">Delivery</span>
                  </Link>
                
                  <div className="pl-6 w-56 relative">
                    <label htmlFor="search" className="sr-only">Email</label>
                    <input
                      type="search"
                      name='search'
                      className="w-full rounded-sm border-gray-200 p-0  text-sm shadow-sm"
                      placeholder=" Search"
                      
                    />
                  </div>

                    <span className="pl-1  inline-flex items-center cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-700"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                        />
                      </svg>
                    </span>
              
              </div>
                
              

              <div className="bg-gray-400 w-1/4">
                <div className="flex  justify-end content-end  ">
                  <div className="transition-all mr-3 my-3 cursor-pointer hover:dark:bg-[#FFD369] hover:dark:text-[#222831] ">
                    {isProfileOpen ? (
                       <HiUserCircle  onClick={() => setisProfileOpen(false)} className="w-8 h-8" />
                      ) : (
                        <HiUserCircle  onClick={() => setisProfileOpen(true)} className="w-8 h-8" />
                    )}
                  </div>
                 
                    { isProfileOpen ? 
                      <div className="pt-0 absolute top-2  z-50 mx-auto translate-x-0 transition-all flex-wrap  ">
                        <div className="py-16 px-3 w-40 ">
                          <div className=" py-4  px-2 dark:bg-[#222831] bg-white  h-40  text-left capitalize font-medium shadow-lg">
                              {user
                                ? <>
                                    <div className=" capitalize dark:text-blue-300 font-bold  md:text-sm lg:text-lg pr-3">{user.name}</div>
                                    <div className="pr-3 ">
                                      <button onClick={onSignOutClick} className={` px-2 py-1 flex justify-center  cursor-pointer bg-amber-400  hover:dark:bg-slate-100 hover:dark:bg-opacity-10  text-sm rounded  `}>X </button>
                                    </div>
                                  </>
                                
                                : 
                                <>
                                          
                                          <Link  to={'/sign-in'} className={`px-2 py-1 flex items-center cursor-pointer  hover:dark:bg-slate-100 hover:dark:bg-opacity-10  text-sm rounded `}>                            
                                            <span className="mx-1">Sign in</span>
                                          </Link>
                                          <Link  to={'/sign-up'} className={`px-2 py-1 flex items-center cursor-pointer  hover:dark:bg-slate-100 hover:dark:bg-opacity-10  text-sm rounded `}>
                                            <span className="mx-1">Sign up</span>
                                          </Link>

                                </>          
                              }                             
                            </div>
                          </div>
                        </div>
                      : <div> ggg </div>
                          
                    }   
                  </div>
                </div>  
                
              </div>
          

              {/* Hamberger Menu  */}
              <div className="md:hidden transition-all mr-3 my-3 cursor-pointer hover:dark:bg-[#FFD369] hover:dark:text-[#222831] ">
                {isMobileNavOpen ? (
                  <AiOutlineMenuFold onClick={() => setisMobileNavOpen(false)} className=" text-2xl " />
                ) : (
                  <AiOutlineMenuUnfold onClick={() => setisMobileNavOpen(true)} className="rounded text-2xl "/>
                )}
              </div>
            </div>
          </div>




          {/* Mobile Navbar */}
          <div
            id="navbar"
            className={`pt-0 absolute top-2  z-50 mx-auto ${
              isMobileNavOpen ? "translate-x-0" : "-translate-x-full"
            }   `}
          >
            <div className="py-[.5px] w-64 ">
              <div className="w-full py-4 space-y-6 px-2 dark:bg-[#222831] bg-white  min-h-screen  text-left capitalize font-medium shadow-lg">
                {/* Logo */}
                <img
                  src="https://www.freepnglogos.com/uploads/spotify-logo-png/file-spotify-logo-png-4.png"
                  alt="alt placeholder"
                  className="w-6 h-6 mx-auto mb-5"
                />

                {/* Links */}
                {navLinks?.map(({ title, link, icon }, id) => (
                  <Link key={id} to={link} className={`px-2 flex items-center cursor-pointer hover:bg-gray-200 hover:text-gray-700 text-sm rounded`}>
                      <span className="p-2 bg-gray-200 rounded-full">{icon}</span>
                      <span className="mx-1">{title}</span>
                  </Link>
                ))}

                {/* After all nav links if you want any button or link then it will come here */}
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Header