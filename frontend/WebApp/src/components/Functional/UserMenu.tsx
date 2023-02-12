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
      <div
         className={`absolute -mx-40 mt-10 flex h-48 w-48 flex-wrap rounded-b ${theme.mainBg} border-[0.5px] text-opacity-90 ${theme.borderColor}   shadow-md `}
      >
         <div className="flex h-7  items-center justify-between  pb-1  pl-5 pt-8  font-medium capitalize ">
            {user.name}
         </div>
         <div className=" md:text-md  flex flex-wrap pl-5 pt-3 text-sm">
            <Link
               to="/"
               className=" h-8 w-24 rounded-md pt-[5px] pl-2 hover:dark:bg-slate-100  hover:dark:bg-opacity-10"
            >
               Account
            </Link>
            <Link
               to="/"
               className=" h-8 w-24 rounded-md pt-[5px] pl-2 hover:dark:bg-slate-100 hover:dark:bg-opacity-10"
            >
               Settings
            </Link>
            <Link
               to="/"
               className=" h-8 w-24 rounded-md pt-[5px] pl-2 hover:dark:bg-slate-100  hover:dark:bg-opacity-10"
            >
               About
            </Link>
            <div
               onClick={onSignOutClick}
               className=" h-8 w-24 rounded-md pt-1  pl-2 hover:dark:bg-slate-100  hover:dark:bg-opacity-10"
            >
               Logout
            </div>
         </div>
      </div>
   );
};

export default UserMenu;
