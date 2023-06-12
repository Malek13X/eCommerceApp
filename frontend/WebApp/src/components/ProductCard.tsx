import React from 'react';
import { Item } from '../services/types';
import Categories from './NavBar/Categories';
import {
   useAddItemToCartMutation,
   useGetCartQuery
} from '../features/api/apiSlice';
import { MdOutlineAddShoppingCart } from 'react-icons/md';
import { palenightPalette } from './data';

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
   return (
      <div
         className={`h-full w-full  max-w-sm  rounded-md border border-b-2 ${theme.textColor} ${theme.mainBg} ${theme.borderColor}  shadow-md `}
      >
         <div className="">
            <img
               className="h-80 w-full rounded-t-lg object-fill  p-4  "
               src={
                  item.imageUrl +
                  '-/preview/800x800/-/quality/lightest/-/progressive/yes/'
               }
               alt="product image"
            />
         </div>
         <div className=" px-5 pb-8  ">
            <a href="#" className="">
               <h5 className="  text-left text-xl font-semibold capitalize tracking-tight ">
                  {item.title}
               </h5>
            </a>

            <div className="flex  items-center justify-between pt-7 ">
               <span className="ml-2 flex items-end text-2xl font-bold  ">
                  {item.price.toLocaleString('en-US', {
                     style: 'currency',
                     currency: 'USD'
                  })}
                  <p className="ml-3 text-base font-normal  ">
                     <del>
                        {(item.price * 1.2).toLocaleString('en-US', {
                           style: 'currency',
                           currency: 'USD'
                        })}
                     </del>{' '}
                  </p>
               </span>
               <div
                  className={`cursor-pointer rounded bg-teal-600  px-2 py-2 text-center text-sm font-medium text-white hover:bg-teal-800 focus:outline-none focus:ring-4   dark:hover:bg-teal-700 `}
                  onClick={() =>
                     addItemToCart({ itemId: item._id, quantity: 1 }).then(() =>
                        refetch()
                     )
                  }
               >
                  <MdOutlineAddShoppingCart className="" size={25} />
               </div>
            </div>
         </div>
      </div>
      // <div className="parent  relative flex max-w-sm flex-wrap overflow-hidden rounded-sm bg-gray-400 shadow-lg">\

      //    <div id="image" className=" min-w-full rounded-t-sm bg-gray-600 ">
      //       {item.quantity === 0 && (
      //          <div className="child absolute z-20 h-full w-full bg-gray-600 bg-opacity-80 pt-[25%] text-center text-4xl ">
      //             <div className="whitespace-nowrap  font-extrabold">
      //                Out of Stock
      //             </div>
      //          </div>
      //       )}
      //       <img
      //          className="  h-full w-full bg-gradient-to-tr from-slate-600 to-slate-400 "
      //          src={
      //             item.imageUrl +
      //             '-/preview/800x800/-/quality/lightest/-/progressive/yes/'
      //          }
      //          alt="Image"
      //       />
      //    </div>
      //    <div className="z-50 bg-gray-400">
      //       <div className="flex flex-wrap  justify-between">
      //          <div
      //             id="title"
      //             className="mx-5 my-4 w-full text-start text-lg font-bold"
      //          >
      //             {item.title}
      //          </div>

      //          <div
      //             id="quantity"
      //             className={`mx-5 my-4  whitespace-nowrap pt-1 text-xs font-bold  ${
      //                item.quantity !== 0 ? 'text-green-400' : 'text-red-400'
      //             } `}
      //          >
      //             Quantity: {item.quantity}
      //          </div>

      //          <div id="price" className="text-md mx-5 my-4 pt-1 font-bold ">
      //             $ {item.price}
      //          </div>
      //       </div>

      //       <div className="text-md mx-5 mb-3 flex w-full flex-wrap ">
      //          {item.categories.map((category, index) => (
      //             <div
      //                key={index}
      //                className="mr-1 mb-1 cursor-pointer whitespace-nowrap rounded-xl border-2 border-blue-600 bg-slate-700 px-2 capitalize hover:bg-blue-700"
      //             >
      //                {category}
      //             </div>
      //          ))}
      //       </div>
      //    </div>
      // </div>
   );
};
export default ProductCard;
