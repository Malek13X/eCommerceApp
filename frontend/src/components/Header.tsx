import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {
   AiOutlineMenuUnfold,
   AiOutlineMenuFold,
} from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../features/user/authSlice';
import { AppDispatch } from '../app/store';
import { HiUserCircle } from 'react-icons/hi';

function Header() {
   const [isMobileNavOpen, setisMobileNavOpen] = useState(false);
   const [isProfileOpen, setisProfileOpen] = useState(false);

   const dispatch = useDispatch<AppDispatch>();

   const { user } = useSelector((state: any) => state.auth);

   useEffect(() => {}, [user]);

   const onSignOutClick = () => {
      dispatch(signOut());

      // ? window.location.reload(false);
   };

   //   If button is there
   function handleClick() {
      if (isMobileNavOpen) {
         setisMobileNavOpen(false);
      }
   }
   // const body = document.body
   // body?.addEventListener('click', closeWhenClickedOutside)
   // function closeWhenClickedOutside(this: HTMLElement, event: any) {
   //     setisMobileNavOpen(false);
   //     console.log('Clickty Clack!!');
   //     body.removeEventListener('click', event.closeWhenClickedOutside);

   // }

   return (
      <div className="">
         <header className="fixed top-0 z-50  flex   h-2 w-screen  flex-wrap ">
            <div className="w-full ">
               <div className="  mx-auto ">
                  <div className="flex w-full items-center justify-between bg-white  p-2 font-medium  capitalize shadow-lg dark:bg-[#222831]">
                     {/* Logo */}
                     <div className="flex lg:w-1/6 ">
                        <span className="mr-2 flex border-[#eeeeee] px-2 md:border-r">
                           <img
                              src="https://www.freepnglogos.com/uploads/spotify-logo-png/file-spotify-logo-png-4.png"
                              alt="alt placeholder"
                              className="mx-auto -mt-1 inline h-8 w-8"
                           />
                        </span>
                        E-Comm
                     </div>

                     <div className="gap-x-51 mr-5 hidden  w-screen items-center justify-center bg-white  pl-20  font-medium capitalize text-black md:flex">
                        {/* Links */}
                        <div className="flex flex-1  justify-center bg-gray-300">
                           <Link
                              to="/"
                              className={`flex cursor-pointer items-center rounded px-2  py-1 text-sm  hover:dark:bg-slate-100 hover:dark:bg-opacity-10 `}
                           >
                              <span className="mx-1">Home</span>
                           </Link>

                           <Link
                              to="/"
                              className={`flex cursor-pointer items-center rounded px-2  py-1 text-sm  hover:dark:bg-slate-100 hover:dark:bg-opacity-10 `}
                           >
                              <span className="mx-1">Catagories</span>
                           </Link>

                           <Link
                              to="/"
                              className={`flex cursor-pointer items-center rounded px-2  py-1 text-sm  hover:dark:bg-slate-100 hover:dark:bg-opacity-10 `}
                           >
                              <span className="mx-1">Delivery</span>
                           </Link>

                           <div className="relative w-56 pl-6">
                              <label htmlFor="search" className="sr-only">
                                 Email
                              </label>
                              <input
                                 type="search"
                                 name="search"
                                 className="w-full rounded-sm border-gray-200 p-0  text-sm shadow-sm"
                                 placeholder=" Search"
                              />
                           </div>

                           <span className="inline-flex  cursor-pointer items-center pl-1">
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

                        <div className="w-1/4 bg-gray-400">
                           <div className="flex  content-end justify-end  ">
                              <div className="my-3 mr-3 cursor-pointer transition-all hover:dark:bg-[#FFD369] hover:dark:text-[#222831] ">
                                 {isProfileOpen ? (
                                    <HiUserCircle
                                       onClick={() => setisProfileOpen(false)}
                                       className="h-8 w-8"
                                    />
                                 ) : (
                                    <HiUserCircle
                                       onClick={() => setisProfileOpen(true)}
                                       className="h-8 w-8"
                                    />
                                 )}
                              </div>

                              {isProfileOpen ? (
                                 <div className="absolute top-2 z-50  mx-auto translate-x-0 flex-wrap pt-0 transition-all  ">
                                    <div className="w-40 py-16 px-3 ">
                                       <div className=" h-40  bg-white py-4 px-2  text-left  font-medium capitalize shadow-lg dark:bg-[#222831]">
                                          {user ? (
                                             <>
                                                <div className=" pr-3 font-bold capitalize  dark:text-blue-300 md:text-sm lg:text-lg">
                                                   {user.name}
                                                </div>
                                                <div className="pr-3 ">
                                                   <button
                                                      onClick={onSignOutClick}
                                                      className={` flex cursor-pointer justify-center rounded  bg-amber-400 px-2  py-1 text-sm  hover:dark:bg-slate-100 hover:dark:bg-opacity-10  `}
                                                   >
                                                      X{' '}
                                                   </button>
                                                </div>
                                             </>
                                          ) : (
                                             <>
                                                <Link
                                                   to={'/signin'}
                                                   className={`flex cursor-pointer items-center rounded px-2  py-1 text-sm  hover:dark:bg-slate-100 hover:dark:bg-opacity-10 `}
                                                >
                                                   <span className="mx-1">
                                                      Sign in
                                                   </span>
                                                </Link>
                                                <Link
                                                   to={'/signup'}
                                                   className={`flex cursor-pointer items-center rounded px-2  py-1 text-sm  hover:dark:bg-slate-100 hover:dark:bg-opacity-10 `}
                                                >
                                                   <span className="mx-1">
                                                      Sign up
                                                   </span>
                                                </Link>
                                             </>
                                          )}
                                       </div>
                                    </div>
                                 </div>
                              ) : (
                                 <div> ggg </div>
                              )}
                           </div>
                        </div>
                     </div>

                     {/* Hamberger Menu  */}
                     <div className="my-3 mr-3 cursor-pointer transition-all hover:dark:bg-[#FFD369] hover:dark:text-[#222831] md:hidden ">
                        {isMobileNavOpen ? (
                           <AiOutlineMenuFold
                              onClick={() => setisMobileNavOpen(false)}
                              className=" text-2xl "
                           />
                        ) : (
                           <AiOutlineMenuUnfold
                              onClick={() => setisMobileNavOpen(true)}
                              className="rounded text-2xl "
                           />
                        )}
                     </div>
                  </div>
               </div>

               {/* Mobile Navbar */}
               <div
                  id="navbar"
                  className={`absolute top-2 z-50  mx-auto pt-0 ${
                     isMobileNavOpen ? 'translate-x-0' : '-translate-x-full'
                  }   `}
               >
                  <div className="w-64 py-[.5px] ">
                     <div className="min-h-screen w-full space-y-6 bg-white py-4 px-2  text-left  font-medium capitalize shadow-lg dark:bg-[#222831]">
                        {/* Logo */}
                        <img
                           src="https://www.freepnglogos.com/uploads/spotify-logo-png/file-spotify-logo-png-4.png"
                           alt="alt placeholder"
                           className="mx-auto mb-5 h-6 w-6"
                        />
                     </div>
                  </div>
               </div>
            </div>
         </header>
      </div>
   );
}

export default Header;
