import React, { useEffect, useState } from 'react';
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/NavBar/SearchBar';
import UserMenu from '../components/Functional/UserMenu';
import SignDropdown from '../components/NavBar/SignDropDown';
import axios from 'axios';
import { useGetItemsQuery } from '../features/items/itemApi';
import { Item } from '../services/types';

const Test: React.FC<{ theme: any }> = ({ theme }) => {
   const [items, setItems] = useState<Item[]>();

   const { data: itemsData, isLoading, error } = useGetItemsQuery('');
   useEffect(() => {
      if (itemsData) {
         setItems(itemsData);
      }

      return () => {};
   }, [itemsData]);

   return (
      <div className={`pt-6  ${theme.textColor} `}>
         <div className=" h-full  p-10">
            <ul>
               <div
                  className={`md:pt-auto flex flex-col-reverse flex-wrap justify-between border-2 pt-10 md:flex-row md:flex-nowrap md:px-12 lg:px-20 xl:px-40 ${theme.borderColor} m-2 mb-16 items-center rounded-md px-5  py-10  text-center`}
               >
                  <div
                     className={` py-12 text-left text-2xl md:py-10 md:pr-10 md:text-3xl lg:text-5xl  `}
                  >
                     50% Discount On{' '}
                     <span className="font-bold text-yellow-400">
                        RTX 1080 Ti
                     </span>
                  </div>

                  <div
                     className={`  ${theme.borderColor}  rounded-full  text-gray-500 `}
                  >
                     <img
                        className="w-64  md:w-96 "
                        src={
                           items
                              ? items[1].imageUrl +
                                '-/preview/800x800/-/progressive/yes/-/quality/lightest/'
                              : ''
                        }
                     />
                  </div>
               </div>

               <div className="flex  flex-wrap justify-center text-xs ">
                  {items
                     ?.filter((i) => i.quantity > 0)
                     .map((item: Item) => (
                        <div
                           key={item._id}
                           className={`m-2 rounded-md p-2 text-center `}
                        >
                           <ProductCard item={item} />
                        </div>
                     ))}
               </div>
            </ul>
         </div>
      </div>
   );
};

export default Test;
