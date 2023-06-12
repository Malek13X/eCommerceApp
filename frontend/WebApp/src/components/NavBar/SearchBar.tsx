import { useEffect, useState } from 'react';
import { useGetItemsQuery } from '../../features/api/apiSlice';
import { Item } from '../../services/types';

type props = {
   theme: any;
   barSize: string;
};

const SearchBar: React.FC<props> = ({ theme, barSize }) => {
   const [searchText, setSearchText] = useState('');
   const [showMenu, setShowMenu] = useState(false);

   const {
      data: items,
      isLoading,
      error
   } = useGetItemsQuery(searchText, { skip: !searchText ? true : false });

   const handleOnChangeSearch = (
      event: React.ChangeEvent<HTMLInputElement>
   ) => {
      setSearchText(event.target.value);
   };

   const onSubmitSearch = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
   };

   useEffect(() => {
      if (searchText) {
         setShowMenu(true);
      } else {
         setShowMenu(false);
      }
   }, [items, searchText]);

   return (
      <>
         <form
            className={`relative ${
               barSize === 'big'
                  ? 'hidden w-full md:block '
                  : 'mx-auto block w-full md:hidden'
            } `}
            onSubmit={onSubmitSearch}
         >
            <div className="relative">
               <input
                  type="search"
                  id="search-dropdown"
                  className={`z-20 block w-full rounded-sm text-slate-700 focus:dark:border-0 dark:focus:border-opacity-0 focus:dark:ring-2 focus:dark:ring-slate-400`}
                  placeholder="Search Product..."
                  onChange={handleOnChangeSearch}
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

               {/* Menu */}
               {showMenu && (
                  <div
                     className={`absolute top-full left-0 z-10 max-h-80 w-full divide-y  divide-gray-500 overflow-y-auto  rounded-sm border border-gray-500 ${theme.mainBg}`}
                  >
                     {items && items.length > 0 ? (
                        <>
                           {items
                              .filter((item: Item) => item.quantity != 0)
                              .map((item: Item) => (
                                 <div
                                    key={item._id}
                                    className="flex cursor-pointer items-center p-5 text-sm font-bold"
                                 >
                                    <img
                                       className="mr-4 w-16 rounded"
                                       src={
                                          item.imageUrl + '-/preview/200x200/'
                                       }
                                    />
                                    <div className="">
                                       <div className='mb-1' >{item.title}</div>
                                       <div className='ml-1 font-normal'>
                                          {item.price.toLocaleString('en-US', {
                                             style: 'currency',
                                             currency: 'USD'
                                          })}
                                       </div>
                                    </div>
                                 </div>
                              ))}
                        </>
                     ) : (
                        <div className=" p-2">
                           <div>Product not found... </div>
                        </div>
                     )}
                  </div>
               )}
            </div>
         </form>
      </>
   );
};

export default SearchBar;
