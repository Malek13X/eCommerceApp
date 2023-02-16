import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar: React.FC<{ theme: any; size: string }> = ({ theme, size }) => {
   return (
      <>
         <div
            className={`relative ${
               size === 'big'
                  ? 'hidden w-full md:block '
                  : 'block w-full md:hidden mx-auto'
            } `}
         >
            <input
               type="search"
               id="search-dropdown"
               className={`z-20 block w-full rounded-sm   text-slate-700 focus:dark:border-0 dark:focus:border-opacity-0 focus:dark:ring-2 focus:dark:ring-slate-400`}
               placeholder="Search Product..."
               required 
            />

            <button
               type="submit"
               className="absolute top-0 right-0 h-full rounded-r-sm bg-slate-600 p-2.5 text-[#eeeeee] hover:bg-opacity-90"
            >
               <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth="2"
                     d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
               </svg>
               <span className="sr-only">Search</span>
            </button>
         </div>
      </>
   );
};

export default SearchBar;
