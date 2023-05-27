import React from 'react';
import { Item } from '../services/types';
import Categories from './NavBar/Categories';

const ProductCard: React.FC<{ item: Item }> = ({ item }) => {
   console.log(item);
   return (
      <div className="parent relative  flex max-w-sm flex-wrap overflow-hidden rounded-sm bg-gray-400 shadow-lg">
         <div id="image" className=" min-w-full rounded-t-sm bg-gray-600 ">
            {item.quantity === 0 && (
               <div className="child absolute z-20 h-full w-full bg-gray-600 bg-opacity-80 pt-[25%] text-center text-4xl ">
                  <div className="whitespace-nowrap  font-extrabold">
                     Out of Stock
                  </div>
               </div>
            )}
            <img
               className="  h-full w-full bg-gradient-to-tr from-slate-600 to-slate-400 "
               src={
                  item.imageUrl +
                  '-/preview/800x800/-/quality/lightest/-/progressive/yes/'
               }
               alt="Image"
            />
         </div>
         <div className="z-50 bg-gray-400">
            <div className="flex flex-wrap  justify-between">
               <div
                  id="title"
                  className="mx-5 my-4 w-full text-start text-lg font-bold"
               >
                  {item.title}
               </div>

               <div
                  id="quantity"
                  className={`mx-5 my-4  whitespace-nowrap pt-1 text-xs font-bold  ${
                     item.quantity !== 0 ? 'text-green-400' : 'text-red-400'
                  } `}
               >
                  Quantity: {item.quantity}
               </div>

               <div id="price" className="text-md mx-5 my-4 pt-1 font-bold ">
                  $ {item.price}
               </div>
            </div>

            <div className="text-md mx-5 mb-3 flex w-full flex-wrap ">
               {item.categories.map((category, index) => (
                  <div
                     key={index}
                     className="mr-1 mb-1 cursor-pointer whitespace-nowrap rounded-xl border-2 border-blue-600 bg-slate-700 px-2 capitalize hover:bg-blue-700"
                  >
                     {category}
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};
export default ProductCard;
