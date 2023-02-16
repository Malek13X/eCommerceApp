import React, { useEffect, useState } from 'react';
import { iTheme, darkTheme, lightTheme, navLinks } from '../components/data';
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/NavBar/SearchBar';
import UserMenu from '../components/Functional/UserMenu';
import SignDropdown from '../components/NavBar/SignDropDown';

const Test: React.FC<{ theme: iTheme }> = ({ theme }) => {
   const paragraphs = [
      {
         id: 1,
         title: 'Nvidia GTX 1080',
         price: '145.99$',
         description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
      },
      {
         id: 2,
         title: 'Nvidia GTX 1070',
         price: '123.99$',
         description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
      },
      {
         id: 3,
         title: 'Nvidia GTX 1060',
         price: '101.45$',
         description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
      },
      {
         id: 4,
         title: 'Nvidia GTX 1050',
         price: '92.99$',
         description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
      },
      {
         id: 5,
         title: 'Nvidia GTX 1080 Ti',
         price: '215.99$',
         description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
      }
   ];

   return (
      <div className={`pt-6  ${theme.textColor} `}>
         <div className=" h-full  p-10">
            <ul>
               <div
                  className={`flex border-2 ${theme.borderColor} m-2 mb-16 items-center rounded-md p-5  py-10  text-center`}
               >
                  <div
                     className={`text-md rounded-sm px-12 py-12 text-left md:px-20 md:py-20 md:text-3xl lg:text-5xl  ${theme.bgColor}`}
                  >
                     Upto 50% Discount On All Of These Items
                  </div>
                  
                  <div className="flex  items-end">
                     <div
                        className={`${theme.borderColor} h-10 w-10 rounded-full bg-gray-500  text-gray-500 hover:h-32 hover:w-32  md:h-20 md:w-20`}
                     >
                        .
                     </div>
                     <div
                        className={` ${theme.borderColor} h-16 w-16 bg-gray-600 text-gray-600 hover:animate-bounce md:h-32 md:w-32 `}
                     >
                        .
                     </div>
                  </div>
               </div>

               <div className="flex  flex-wrap justify-center text-xs ">
                  {paragraphs.map((item) => (
                     <div
                        key={item.id}
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
