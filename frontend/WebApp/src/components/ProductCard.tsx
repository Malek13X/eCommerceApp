import React from 'react';
import { Item } from '../services/types';
import Categories from './NavBar/Categories';
import {
   useAddItemToCartMutation,
   useGetCartQuery
} from '../features/api/apiSlice';
import { MdOutlineAddShoppingCart } from 'react-icons/md';
import { palenightPalette } from './data';
import { ImSpinner2 } from 'react-icons/im';
import { BsCheckLg } from 'react-icons/bs';
import { FaCheck } from 'react-icons/fa';
import { HiOutlineCheck } from 'react-icons/hi';
import { Link } from 'react-router-dom';

// Accessing colors from palenightPalette
const {
   Black,
   DarkGray,
   DarkGreen,
   DarkYellow,
   DarkBlue,
   DarkCyan,
   Gray,
   White,
   Red,
   DarkRed,
   Yellow,
   Green,
   Cyan,
   Blue,
   Magenta,
   DarkMagenta
} = palenightPalette;

interface Props {
   item: Item;
   theme: any;
}
const ProductCard: React.FC<Props> = ({ item, theme }) => {
   const [addItemToCart, { isLoading: isAdding, isSuccess: isAdded }] =
      useAddItemToCartMutation();
   const {
      data: cartData,
      isLoading,
      isSuccess,
      isError,
      refetch,
      isFetching
   } = useGetCartQuery();

   const itemInCart = () =>
      cartData?.items.find((i) => i._id === item._id) ? true : false;
   return (
      <div
         className={` h-full w-80  rounded-md shadow-md  ${theme.textColor} ${theme.mainBg} bg-opacity-50 ${theme.borderColor}   `}
      >
         <div className="">
            <img
               title={item.description}
               className="cursor-check h-72 w-96 cursor-pointer  rounded-t-lg object-contain   p-4  "
               src={
                  item.imageUrl +
                  '-/preview/800x800/-/quality/lightest/-/progressive/yes/'
               }
               alt="product image"
            />
         </div>
         <div className="mt-5 flex h-40 flex-col justify-between px-5 pb-8 ">
            <div>
               <div className="flex content-center items-center justify-between  ">
                  <h5 className="cursor-check    cursor-pointer text-left  text-lg font-bold capitalize tracking-tight ">
                     {item.title}
                  </h5>
                  {!itemInCart() ? (
                     <button
                        className={`cursor-check  rounded bg-teal-600 px-2  py-2 text-center text-sm font-medium text-white hover:bg-teal-800 focus:outline-none   disabled:cursor-default disabled:bg-teal-800 dark:hover:bg-teal-700    dark:disabled:bg-teal-700 dark:disabled:text-gray-300`}
                        disabled={itemInCart()}
                        onClick={() =>
                           addItemToCart({
                              itemId: item._id,
                              quantity: 1
                           }).then(() => refetch())
                        }
                     >
                        {isAdding ? (
                           <ImSpinner2 className=" animate-spin" size={25} />
                        ) : (
                           <MdOutlineAddShoppingCart className="" size={25} />
                        )}
                     </button>
                  ) : (
                     <h1 className="mr-2 -mb-1 whitespace-nowrap p-1 text-base font-medium text-teal-600">
                        In-Cart
                     </h1>
                  )}
               </div>
            </div>
            <div className="mx-2  flex items-center justify-between pt-7">
               <div className="cursor-check ml-2 cursor-pointer text-teal-600  hover:text-teal-400">
                  <Link
                     to={'/' + item.category}
                     className="  text-left text-base font-medium capitalize tracking-tight "
                  >
                     {item.category}
                  </Link>
               </div>
               <span className="ml-2 flex items-end text-xl font-bold  ">
                  {item.price.toLocaleString('en-US', {
                     style: 'currency',
                     currency: 'USD'
                  })}
                  {/* <p className="ml-3 text-base font-normal  ">
                     <del>
                        {(item.price * 1.2).toLocaleString('en-US', {
                           style: 'currency',
                           currency: 'USD'
                        })}
                     </del>{' '}
                  </p> */}
               </span>
            </div>
         </div>
      </div>
   );
};
export default ProductCard;
