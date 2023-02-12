import { Link } from 'react-router-dom';

import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../../app/store';

// UI Components and Icons
import { MdClose } from 'react-icons/md';
import { BiMenu, BiUserCircle } from 'react-icons/bi';
import { IoMdArrowDropdown } from 'react-icons/io';
import { BsMoon, BsSun } from 'react-icons/bs';
import { switchTheme } from '../../features/user/UISlice';
import { darkTheme, lightTheme } from '../../components/data';
import Categories from './Categories';
import { signOut } from '../../features/user/authSlice';
import SearchBar from './SearchBar';
import ThemeMode from '../Functional/ThemeMode';
import Cart from '../Functional/Cart';
import UserMenu from '../Functional/UserMenu';

const Nav = () => {
   const links = [
      { name: 'Home', link: '/' },
      { name: 'Categories', link: '/test' },
      { name: 'Delivery', link: '/sign-in' }
   ];
   const dispatch = useDispatch<AppDispatch>();

   const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

   const [isProfileOpen, setIsProfileOpen] = useState(false);
   const [isMobileMode, setIsMobileMode] = useState(false);

   // Get user from State
   const { user } = useSelector((state: any) => state.auth);

   // Change theme mode
   const { themeMode } = useSelector((state: any) => state.UI);
   const theme = themeMode === 'dark' ? darkTheme : lightTheme;

   const menuRef = useRef<HTMLInputElement>(null);

   useEffect(() => {
      localStorage.setItem('themeMode', themeMode);

      const closeOpenMenus = (e: any) => {
         if (
            menuRef.current &&
            isProfileOpen &&
            !menuRef.current.contains(e.target)
         ) {
            setIsProfileOpen(false);
         }
      };
      document.addEventListener('mousedown', closeOpenMenus);

      return () => {
         document.removeEventListener('mousedown', closeOpenMenus);
         closeOpenMenus;
      };
   }, [user, themeMode]);

   return (
      <div className="static  top-0  left-0 right-0  w-full select-none  ">
         <header
            id="navbar"
            className={`  flex items-center justify-between py-3 ${theme.bgColor} ${theme.textColor} border-b-[1px] ${theme.borderColor}`}
         >
            <div
               id="moblie-nav"
               className={` 0 ml-2 flex h-10 w-10 items-center justify-center  rounded-md hover:opacity-80 md:hidden`}
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

            <Link to="/">
               <div
                  id="title"
                  className="items-center  text-4xl font-bold  md:pr-10 md:pl-5 lg:pl-5  "
               >
                  <span className="text-4xl  ">&#9428;</span>
                  |Shop
               </div>
            </Link>

            <SearchBar theme={theme} size={'big'} />
            <ThemeMode theme={theme} size="big" />

            {/* Right Side of Nav */}
            <div id="nav-right" className="ml-5 mr-2 flex   items-center    ">
               <Cart theme={theme} />

               {!isMobileNavOpen ? (
                  <>
                     {user !== null ? (
                        <>
                           <div
                              ref={menuRef}
                              className="hidden bg-opacity-30 md:flex md:pr-1"
                           >
                              <div
                                 onClick={() =>
                                    setIsProfileOpen(!isProfileOpen)
                                 }
                                 className={`cursor-check flex h-9 w-9 cursor-pointer items-center rounded-full border-2 ${theme.borderColor} ${theme.bgColor} justify-center ${theme.hoverColor} ${theme.hoverTextColor}   `}
                              >
                                 <div className=" text-xl font-medium capitalize ">
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
                        <div className="hidden whitespace-nowrap md:flex">
                           <Link
                              to={'/sign-in'}
                              className={` cursor-check flex cursor-pointer items-center rounded px-2  py-1 text-sm  hover:dark:bg-slate-100 hover:dark:bg-opacity-10 `}
                           >
                              <span className="mx-1">Sign in</span>
                           </Link>

                           <Link
                              to={'/sign-up'}
                              className={`cursor-check flex cursor-pointer items-center rounded px-2  py-1 text-sm  hover:dark:bg-slate-100 hover:dark:bg-opacity-10 `}
                           >
                              <span className="mx-1">Sign up</span>
                           </Link>
                        </div>
                     )}
                  </>
               ) : (
                  <></>
               )}
            </div>
         </header>

         {isMobileNavOpen ? (
            <div
               ref={menuRef}
               className={`menu ${theme.mainBg} border-b-[1px] dark:bg-opacity-70 ${theme.borderColor} h-fill py-3`}
            >
               <div className="mr-3 ml-3  flex items-center">
                  <SearchBar theme={theme} size={'small'} />
                  <ThemeMode theme={theme} size="small" />
               </div>
               {user !== null ? (
                  <>
                     <div className="font bold ml-2 flex justify-center p-3 text-2xl font-bold capitalize">
                        <span>{user.name}</span>
                        <BiUserCircle className="ml-2 h-7 w-7" />
                     </div>

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
                  <div className="hidden whitespace-nowrap md:flex ">
                     <Link
                        to={'/sign-in'}
                        className={` cursor-check flex cursor-pointer items-center rounded px-2  py-1 text-sm  hover:dark:bg-slate-100 hover:dark:bg-opacity-10 `}
                     >
                        <span className="mx-1">Sign in</span>
                     </Link>

                     <Link
                        to={'/sign-up'}
                        className={`cursor-check flex cursor-pointer items-center rounded px-2  py-1 text-sm  hover:dark:bg-slate-100 hover:dark:bg-opacity-10 `}
                     >
                        <span className="mx-1">Sign up</span>
                     </Link>
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
