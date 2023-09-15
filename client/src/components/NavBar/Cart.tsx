import React, { useState } from 'react';
import { MdShoppingCartCheckout } from 'react-icons/md';
import CartSlideOver from './CartSlideOver';
import { useSelector } from 'react-redux';
import { useGetCartQuery } from '../../features/api/apiSlice';
import { ImSpinner2 } from 'react-icons/im';

const Cart: React.FC<{ theme: any }> = ({ theme }) => {
   const [toggleCart, setToggleCart] = useState(false);
   const { data: cartData, isLoading, error, isFetching } = useGetCartQuery();

   if (isLoading) {
      return (
         <div className="flex items-center justify-center md:w-36 ">
            <ImSpinner2 className="h-7 w-7 animate-spin" />
         </div>
      );
   }

   return (
      <div>
         <div
            id="cart"
            className={`mr-2 flex  items-end justify-evenly md:mr-6 md:px-2 `}
            onClick={() => setToggleCart(!toggleCart)}
         >
            <div className=" hidden font-bold  cursor-pointer  whitespace-nowrap pr-3 text-xs sm:text-sm  md:flex">
               {cartData?.totalPrice.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD'
               }) || '$00.00'}
            </div>
            <div
               className="reletive  flex cursor-pointer   hover:opacity-80 "
            >
               <MdShoppingCartCheckout 
               className={` cursor-check   h-7 w-7 cursor-pointer rounded-md md:flex  `}
               ></MdShoppingCartCheckout>
               <div className="absolute  ml-4 mt-3 h-[20px] w-[20px] items-center rounded-full  bg-[#ff5370] "
               hidden={cartData && cartData?.items.length === 0 ? true : false}
               >
                  <p className="py-[2px] text-center font-['arial'] font-bold text-xs text-[#eeeeee]">
                     {cartData?.items.length}
                  </p>
               </div>
            </div>
         </div>

         <CartSlideOver
            theme={theme}
            setToggleCart={setToggleCart}
            toggleCart={toggleCart}
         />
      </div>
   );
};

export default Cart;
