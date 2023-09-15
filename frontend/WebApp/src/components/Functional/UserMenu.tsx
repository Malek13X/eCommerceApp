import React from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from '../../features/user/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../app/store';
import ThemeMode from './ThemeMode';

const UserMenu: React.FC<{ user: any; theme: any }> = ({ user, theme }) => {
   const dispatch = useDispatch<AppDispatch>();
   const navigate = useNavigate();
   const onSignOutClick = () => {
      dispatch(signOut());
      navigate('/');
      // ? window.location.reload(false);
   };

   return (
      <div className="absolute right-4 top-16 z-[100] ">
         <div
            id="dropdownAvatar"
            className={`w-48  divide-y divide-gray-100 rounded-sm  dark:divide-opacity-60 ${theme.borderColor} ${theme.mainBg} ${theme.textColor} shadow-xl dark:divide-gray-600`}
         >
            <div className=" text-md px-4 py-3 ">
               <div className="flex justify-between ">
                  <div className="font-bold capitalize">{user.name}</div>
               </div>
               <div className="truncate pl-[4px]  text-xs font-medium">
                  {user.email}
               </div>
            </div>
            <ul
               className="py-2 text-sm "
               aria-labelledby="dropdownUserAvatarButton"
            >
               <li>
                  <Link
                     to="/account"
                     className={`text-md block px-4 py-2 font-medium hover:opacity-80 `}
                  >
                     Account
                  </Link>
               </li>
               <li>
                  <a
                     href="#"
                     className={`text-md block px-4 py-2 font-medium hover:opacity-80 `}
                  >
                     Delivery
                  </a>
               </li>
               <li>
                  <Link
                     to="/orders"
                     className={`text-md block px-4 py-2 font-medium hover:opacity-80 `}
                  >
                     Orders History
                  </Link>
               </li>
               {user.role === 'admin' ? (
                  <li>
                     <Link
                        to="/admin/dashboard"
                        className={`text-md block px-4 py-2 font-medium hover:opacity-80 `}
                     >
                        Admin Dashboard
                     </Link>
                  </li>
               ) : (
                  <></>
               )}
            </ul>
            <div className="py-2">
               <a
                  href="#"
                  className={`block px-4 py-2 text-sm font-medium hover:opacity-80 `}
                  onClick={onSignOutClick}
               >
                  Log Out
               </a>
            </div>
         </div>
      </div>
   );
};

export default UserMenu;
