import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { useGetItemsQuery } from '../features/api/apiSlice';
import { Item } from '../services/types';
import { palenightPalette } from '../components/data';

const Home: React.FC<{ theme: any }> = ({ theme }) => {
   const [items, setItems] = useState<Item[]>();

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

   const { data: itemsData, isLoading, error } = useGetItemsQuery('');
   useEffect(() => {
      if (itemsData) {
         setItems(itemsData);
      }

      return () => {};
   }, [itemsData]);
   if (itemsData?.length === 0) {
      <h1>No items available</h1>;
   }
   return (
      <div className={`flex justify-center pt-6 ${theme.textColor} `}>
         <div className=" mx-2 h-full xl:mx-40">
            <ul>
               <div
                  className={`md:pt-auto ${theme.mainBg} flex h-80 flex-row  justify-between bg-opacity-50 pt-10 shadow-md md:flex-row  md:px-10 lg:px-16  xl:px-32 ${theme.borderColor} m-2 mb-6 items-center rounded-md px-5  py-10  text-center`}
               >
                  <div
                     className={` w-1/2 py-40  text-xl  md:py-10 md:pr-10 md:text-2xl  lg:text-4xl  `}
                  >
                     The New Smartphone From Apple:{' '}
                     <span className={`font-bold  ${Yellow['text-Yellow']}`}>
                        {items?.[items.length - 1].title}
                     </span>
                  </div>

                  <div
                     className={`${theme.borderColor}  w-1/2 text-gray-500 2xl:w-1/3 `}
                  >
                     <img
                        className=" h-72 w-64 md:w-96  object-cover"
                        src={
                           items?.[items.length - 1].imageUrl +
                           '-/preview/800x800/-/progressive/yes/-/quality/lightest/'
                        }
                     />
                  </div>
               </div>

               <div className="flex flex-wrap justify-center  gap-4 text-xs ">
                  {items
                     ?.filter((i) => i.quantity > 0)
                     .map((item: Item) => (
                        <div
                           key={item._id}
                           className={`my-2 rounded-md sm:m-2`}
                        >
                           <ProductCard item={item} theme={theme} />
                        </div>
                     ))}
               </div>
            </ul>
         </div>
      </div>
   );
};

export default Home;
