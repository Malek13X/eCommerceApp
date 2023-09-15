import { Link, useInRouterContext, useNavigate } from 'react-router-dom';

import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../../app/store';

// UI Components and Icons
import { MdClose } from 'react-icons/md';
import { BiMenu, BiUserCircle } from 'react-icons/bi';
import { darkTheme, lightTheme } from '../../components/data';
import Categories from './Categories';
import { signOut } from '../../features/user/authSlice';
import SearchBar from './SearchBar';
import ThemeMode from '../Functional/ThemeMode';
import Cart from './Cart';
import UserMenu from '../Functional/UserMenu';
import SignDropdown from './SignDropDown';

const Nav = () => {
   const dispatch = useDispatch<AppDispatch>();
   const navigate = useNavigate();

   const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

   const [isProfileOpen, setIsProfileOpen] = useState(false);
   const [isMobileMode, setIsMobileMode] = useState(false);
   const [showMenu, setShowMenu] = useState(false);

   const handleShowMenu = (toggle: boolean) => setShowMenu(toggle);
   // Get user from State
   const { user } = useSelector((state: any) => state.auth);

   const token = localStorage.getItem('token');

   // Change theme mode
   const { themeMode } = useSelector((state: any) => state.UI);
   const theme = themeMode === 'dark' ? darkTheme : lightTheme;

   const catMenu = useRef<HTMLDivElement | null>(null);

   const closeOpenMenus = (e: MouseEvent) => {
      if (
         catMenu.current &&
         isProfileOpen &&
         !catMenu.current.contains(e.target as Node)
      ) {
         setIsProfileOpen(false);
      }

      if (
         catMenu.current &&
         isMobileNavOpen &&
         !catMenu.current.contains(e.target as Node)
      ) {
         setIsMobileNavOpen(false);
      }
      if (
         catMenu.current &&
         showMenu &&
         !catMenu.current.contains(e.target as Node)
      ) {
         setShowMenu(false);
      }
   };

   document.addEventListener('mousedown', closeOpenMenus);
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
               className="text-4xl font-bold  md:pl-1 md:pr-10 md:text-5xl"
            >
               <span className=" font-normal italic  text-[#ffcb6b]">e</span>
               Shop
            </Link>

            <div className="hidden w-9/12 items-center md:flex">
               <SearchBar
                  showMenu={showMenu}
                  handleShowMenu={handleShowMenu}
                  theme={theme}
                  barSize={'big'}
               />
               <div className="pl-3">
                  <ThemeMode size="big" style="md:pr-6   " />
               </div>
            </div>

            {/* Right Side of Nav */}
            <div id="nav-right" className="mr-1 flex   items-center    ">
               {user && <Cart theme={theme} />}

               {!isMobileNavOpen ? (
                  <>
                     {user ? (
                        <>
                           <div
                              ref={catMenu}
                              className="hidden bg-opacity-30 md:flex md:pr-1"
                           >
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
               ref={catMenu}
               className={`menu ${theme.mainBg} border-b-[1px] dark:bg-opacity-70 ${theme.borderColor} h-fill py-3`}
            >
               <div className="mr-3 ml-3  flex items-center">
                  <SearchBar
                     showMenu={showMenu}
                     handleShowMenu={handleShowMenu}
                     theme={theme}
                     barSize={'small'}
                  />

                  <ThemeMode size="small" style="" />
               </div>
               {user ? (
                  <>
                     <div className="font bold ml-4 flex justify-center p-3 text-2xl font-bold capitalize">
                        <span>{user.name}</span>
                        <BiUserCircle className="ml-2 h-7 w-7" />
                     </div>
                     <div
                        className={` mx-20 -mt-1 mb-5 border-b ${theme.borderColor} opacity-30`}
                     />

                     <div className={` text-center text-lg opacity-90`}>
                        <div
                           className={`cursor-check h-10 cursor-pointer  hover:opacity-50`}
                           onClick={() => navigate('/account')}
                        >
                           Account
                        </div>
                        <div
                           className={`cursor-check h-10 cursor-pointer  hover:opacity-50`}
                        >
                           Delivery
                        </div>
                        <div
                           className={`cursor-check h-10 cursor-pointer  hover:opacity-50`}
                           onClick={() => navigate('/orders')}
                        >
                           Orders History
                        </div>
                        <div
                           className={`cursor-check h-10 cursor-pointer  hover:opacity-50`}
                           onClick={() => navigate('/admin/dashboard')}
                        >
                           Admin Dashboard
                        </div>
                        <div
                           className={` mx-20 mt-2 mb-5 border-b ${theme.borderColor} opacity-30`}
                        />
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
``;
