import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface SignDropDownProps {
   theme: any;
}

const SignDropdown: React.FC<SignDropDownProps> = ({ theme }) => {
   const [isOpen, setIsOpen] = useState(false);

   return (
      <div className="relative z-[100] mr-1 hidden whitespace-nowrap text-left md:inline-block">
         <div>
            <button
               onClick={() => setIsOpen(!isOpen)}
               type="button"
               className={`inline-flex w-full justify-center rounded-sm border-b ${theme.borderColor}  ${theme.hoverColor} px-2 py-3  text-sm font-medium  shadow-sm hover:dark:bg-opacity-10 `}
               id="options-menu"
               aria-expanded="true"
               aria-haspopup="true"
            >
               Sign In/Up
               <svg
                  className="-mr-2  h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
               >
                  <path
                     fillRule="evenodd"
                     d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                     clipRule="evenodd"
                  />
               </svg>
            </button>
         </div>

         {isOpen && (
            <div
               className={` absolute right-0 mt-1 w-[94px] origin-top-right rounded-sm shadow-lg ${theme.borderColor} ${theme.mainBg} `}
               role="menu"
               aria-orientation="vertical"
               aria-labelledby="options-menu"
            >
               <div className="py-1" role="none">
                  <Link
                     to={'/sign-in'}
                     className={`cursor-check block cursor-pointer px-4  py-2 text-sm hover:opacity-80 `}
                     role="menuitem"
                  >
                     Sign In
                  </Link>
                  <div className={` mx-2 border-b ${theme.borderColor} opacity-30`} />

                  <Link
                     to={'/sign-up'}
                     className={`cursor-check block cursor-pointer px-4  py-2 text-sm hover:opacity-80 `}
                     role="menuitem"
                  >
                     Sign Up
                  </Link>
               </div>
            </div>
         )}
      </div>
   );
};

export default SignDropdown;
