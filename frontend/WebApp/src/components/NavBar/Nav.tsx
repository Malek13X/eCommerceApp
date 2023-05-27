import { Link, useInRouterContext, useNavigate } from 'react-router-dom';

import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../../app/store';

// UI Components and Icons
import { MdClose } from 'react-icons/md';
import { BiMenu, BiUserCircle } from 'react-icons/bi';
import { IoMdArrowDropdown } from 'react-icons/io';
import { BsMoon, BsSun } from 'react-icons/bs';
import { switchTheme } from '../../features/UISlice';
import { darkTheme, lightTheme } from '../../components/data';
import Categories from './Categories';
import { signOut } from '../../features/user/authSlice';
import SearchBar from './SearchBar';
import ThemeMode from '../Functional/ThemeMode';
import Cart from '../Functional/Cart';
import UserMenu from '../Functional/UserMenu';
import SignDropdown from './SignDropDown';

const Nav = () => {
   const dispatch = useDispatch<AppDispatch>();
   const navigate = useNavigate();

   const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

   const [isProfileOpen, setIsProfileOpen] = useState(false);
   const [isMobileMode, setIsMobileMode] = useState(false);

   // Get user from State
   const { user } = useSelector((state: any) => state.auth);

   const token = localStorage.getItem('token');

   // Change theme mode
   const { themeMode } = useSelector((state: any) => state.UI);
   const theme = themeMode === 'dark' ? darkTheme : lightTheme;

   useEffect(() => {
      if (!token) {
         dispatch(signOut());
         navigate('/');
      }

      localStorage.setItem('themeMode', themeMode);
   }, [themeMode, token, user]);

   return (
      <div className="static  top-0  left-0 right-0  w-full select-none  ">
         <header
            id="navbar"
            className={`  flex items-center justify-between py-3  px-3  md:px-4 ${theme.bgColor} ${theme.textColor} border-b ${theme.borderColor}`}
         >
            <div
               id="moblie-nav"
               className={` ml-3 flex h-10 w-10 items-center justify-between  rounded-sm hover:opacity-80 md:hidden`}
            >
               {isMobileNavOpen ? (
                  <MdClose
                     id="menu-closed"
                     className="cursor-check h-9 w-9 cursor-pointer"
                     onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                  />
               ) : (
                  <BiMenu
                     id="menu-open"
                     className="cursor-check h-9 w-9 cursor-pointer"
                     onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                  />
               )}
            </div>

            <Link
               to="/"
               id="title"
               className="hover:animate-pulse  text-4xl font-bold md:pl-1 md:pr-10 md:text-5xl"
            >
               <span className=" font-normal italic text-yellow-400">
                  e
               </span>
               Shop
            </Link>

            <div className="hidden w-9/12 items-center md:flex">
               <SearchBar theme={theme} barSize={'big'} />
               <div className="pl-3">
                  <ThemeMode size="big" style="md:pr-6   " />
               </div>
            </div>

            {/* Right Side of Nav */}
            <div id="nav-right" className="mr-1 flex   items-center    ">
               <Cart theme={theme} />

               {!isMobileNavOpen ? (
                  <>
                     {user ? (
                        <>
                           <div className="hidden bg-opacity-30 md:flex md:pr-1">
                              <div
                                 onClick={() =>
                                    setIsProfileOpen(!isProfileOpen)
                                 }
                                 className={`cursor-check flex h-10 w-10 cursor-pointer items-center rounded-sm border-2 ${theme.borderColor} ${theme.bgColor} justify-center ${theme.hoverColor} ${theme.hoverTextColor}   `}
                              >
                                 <div className=" text-2xl font-medium capitalize ">
                                    {user.name[0]}
                                 </div>
                              </div>

                              {isProfileOpen ? (
                                 <UserMenu user={user} theme={theme} />
                              ) : (
                                 <> </>
                              )}
                           </div>
                        </>
                     ) : (
                        <>
                           <SignDropdown theme={theme} />
                        </>
                     )}
                  </>
               ) : (
                  <></>
               )}
            </div>
         </header>

         {isMobileNavOpen ? (
            <div
               className={`menu ${theme.mainBg} border-b-[1px] dark:bg-opacity-70 ${theme.borderColor} h-fill py-3`}
            >
               <div className="mr-3 ml-3  flex items-center">
                  <SearchBar theme={theme} barSize={'small'} />

                  <ThemeMode size="small" style="" />
               </div>
               {user ? (
                  <>
                     <div className="font bold ml-4 flex justify-center p-3 text-2xl font-bold capitalize">
                        <span>{user.name}</span>
                        <BiUserCircle className="ml-2 h-7 w-7" />
                     </div>
                     <div
                        className={` mx-10 -mt-1 mb-5 border-b ${theme.borderColor} opacity-30`}
                     />

                     <div className={` text-center text-lg opacity-90`}>
                        <div
                           className={`cursor-check h-10 cursor-pointer  hover:opacity-50`}
                        >
                           Account
                        </div>
                        <div
                           className={`cursor-check h-10 cursor-pointer  hover:opacity-50`}
                           onClick={() => console.log(window.innerWidth)}
                        >
                           Print To Console
                        </div>
                        <div
                           className={`cursor-check h-10 cursor-pointer  hover:opacity-50`}
                        >
                           Delivery
                        </div>
                        <div
                           className={`cursor-check h-10 cursor-pointer  hover:opacity-50`}
                        >
                           About
                        </div>
                        <div
                           className={`cursor-check h-10 cursor-pointer  hover:opacity-50`}
                           onClick={() => dispatch(signOut())}
                        >
                           Logout
                        </div>
                     </div>
                  </>
               ) : (
                  <div className="  mt-2 text-center text-lg opacity-90">
                     <div className="font bold ml-2 flex justify-center p-3 text-2xl font-bold capitalize">
                        Guest
                        <BiUserCircle className="ml-2 h-7 w-7" />
                     </div>
                     <div
                        className={` mx-10 -mt-1 mb-7 border-b ${theme.borderColor} opacity-30`}
                     />
                     <div>
                        <Link
                           to={'/signin'}
                           className={`cursor-check block h-10  cursor-pointer hover:opacity-50`}
                        >
                           Sign in
                        </Link>
                     </div>

                     <div>
                        <Link
                           to={'/signup'}
                           className={`cursor-check block h-10  cursor-pointer hover:opacity-50`}
                        >
                           Sign up
                        </Link>
                     </div>
                  </div>
               )}
            </div>
         ) : (
            <></>
         )}
         <Categories theme={theme} />
      </div>
   );
};

export default Nav;
