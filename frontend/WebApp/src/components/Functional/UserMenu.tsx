import React from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from '../../features/user/authSlice';
import { Link } from 'react-router-dom';
import { AppDispatch } from '../../app/store';

const UserMenu: React.FC<{ user: any; theme: any }> = ({ user, theme }) => {
   const dispatch = useDispatch<AppDispatch>();

   const onSignOutClick = () => {
      dispatch(signOut());
      // ? window.location.reload(false);
   };

   return (
      <div className="absolute right-4 top-16 z-[100] ">
         <div
            id="dropdownAvatar"
            className={`w-48  divide-y divide-gray-100 rounded-md border-[0.1px] dark:divide-opacity-60 ${theme.borderColor} ${theme.mainBg} ${theme.textColor} shadow-xl dark:divide-gray-600`}
         >
            <div className=" px-4 py-3 text-sm ">
               <div className="font-bold capitalize">{user.name}</div>
               <div className="truncate font-medium">{user.email}</div>
            </div>
            <ul
               className="py-2 text-sm "
               aria-labelledby="dropdownUserAvatarButton"
            >
               <li>
                  <a
                     href="#"
                     className={`text-md block px-4 py-2 font-medium hover:opacity-80 `}
                  >
                     Account
                  </a>
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
                  <a
                     href="#"
                     className={`text-md block px-4 py-2 font-medium hover:opacity-80 `}
                  >
                     History
                  </a>
               </li>
            </ul>
            <div className="py-2">
               <a
                  href="#"
                  className={`block px-4 py-2 text-sm font-medium hover:opacity-80 `}
               >
                  Log Out
               </a>
            </div>
         </div>
      </div>
   );
};

export default UserMenu;
