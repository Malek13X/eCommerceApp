import React from 'react';
import {MdOutlineAddShoppingCart } from 'react-icons/md';

const Cart: React.FC<{ theme:any }> = ({ theme }) => {
   return (
      <div
         id="cart"
         className={` flex items-center  justify-evenly md:px-2 md:mr-6 mr-2 `}
      >
         <div className="  hidden whitespace-nowrap pr-3 text-xs sm:text-sm  md:flex">
            47.69 $
         </div>
         <div className="flex  hover:opacity-80 ">
            <MdOutlineAddShoppingCart
               className={` cursor-check  h-7 w-7 cursor-pointer rounded-md md:flex  `}
            ></MdOutlineAddShoppingCart>
            <div className="absolute  ml-4 mt-3 h-5 w-5 rounded-full items-center  bg-red-500 text-center">
               <p className="py-[2px] font-['arial'] text-xs text-[#eeeeee]">99</p>
            </div>
         </div>
      </div>
   );
};

export default Cart;
