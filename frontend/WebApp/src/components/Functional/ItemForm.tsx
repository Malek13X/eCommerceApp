import React, { useEffect, useState } from 'react';

import { useAddItemMutation } from '../../features/api/apiSlice';
import { INewItem } from '../../services/types';
import { IoMdClose } from 'react-icons/io';
import { BiLoaderCircle } from 'react-icons/bi';
import { AiOutlineLoading } from 'react-icons/ai';

type props = {
   theme: any;
   toggleAddItemForm: boolean;
   setToggleAddItemForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const categories = [
   'Art',
   'Electronics',
   'Entertainment',
   'Fashion',
   'Furniture',
   'Food',
   'Gifts',
   'Health',
   'Home',
   'Jewelry',
   'Kids',
   'Pet',
   'Sports',
   'Tools'
];

const ItemForm: React.FC<props> = ({
   theme,
   setToggleAddItemForm,
   toggleAddItemForm
}) => {
   const [selectedCategory, setSelectedCategory] =
      useState('Choose a Category');

   const [isDoubleDropdownOpen, setIsDoubleDropdownOpen] = useState(false);

   const toggleDoubleDropdown = () => {
      console.log('Toggle Double Dropdown');
      setIsDoubleDropdownOpen(!isDoubleDropdownOpen);
   };

   const [newItem, setNewItem] = useState<INewItem>({
      title: '',
      description: '',
      category: '',
      price: 0,
      quantity: 0,
      image: null
   });
   const [addItem, { isLoading, error, isSuccess }] = useAddItemMutation();

   const handleSetCategory = (category: string) => {
      setSelectedCategory(category);
      toggleDoubleDropdown();

      setNewItem((prevItem) => ({
         ...prevItem,
         category
      }));
   };

   const handleInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setNewItem((prevItem) => ({
         ...prevItem,
         [name]: value
      }));
   };

   const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files && event.target.files[0];
      console.log(file);

      setNewItem((prevItem) => ({
         ...prevItem,
         image: file || null
      }));
   };

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      addItem(newItem);
   };

   useEffect(() => {
      if (isSuccess) {
         setNewItem({
            title: '',
            description: '',
            category: '',
            price: 0,
            quantity: 0,
            image: null
         });
         setToggleAddItemForm(false);
      }
      if (error !== undefined) {
         console.log('Error:', error);
      }
      console.log(newItem);
   }, [error, isSuccess, newItem]);

   if (isLoading) {
      return (
         <div className="fixed top-0  left-0 right-0 bottom-0 flex  items-center justify-center bg-gray-900 bg-opacity-50 ">
            <div
               className={`flex h-40 ${theme.mainBg} flex-col ${theme.textColor} {theme.borderColor} items-center justify-center border px-32  shadow-xl  `}
            >
               <div className="mx-2 my-5 flex text-xl font-bold">
                  <AiOutlineLoading className="animate-spin " size={40} />
               </div>
               <button
                  type="button"
                  className="focus:shadow-outline h-10 rounded bg-red-600 py-2 px-4 font-bold text-white hover:bg-red-800 focus:outline-none"
               >
                  Cancel
               </button>
            </div>
         </div>
      );
   }
   if (!toggleAddItemForm) {
      return <></>;
   }

   return (
      <div className="fixed  top-0 left-0 right-0  bottom-0  flex items-center  justify-center overflow-x-auto  ">
         <div
            onClick={() => setToggleAddItemForm(false)}
            className="fixed  top-0 left-0 right-0  bottom-0  flex items-center  justify-center overflow-x-auto bg-gray-900 bg-opacity-60 "
         ></div>
         <div
            className={`parent relative mx-3 flex flex-col border  pt-10  ${theme.borderColor} ${theme.mainBg}  shadow-xl  `}
         >
            <form
               onSubmit={handleSubmit}
               className={`${theme.mainBg} ${theme.textColor} z-40 max-w-prose p-5`}
            >
               <div id="Left-side" className="md:1/2">
                  <div className=" mb-4 items-center">
                     <label htmlFor="title" className="flex-1  font-medium">
                        Title
                     </label>
                     <input
                        required
                        type="text"
                        id="title"
                        name="title"
                        value={newItem.title}
                        onChange={handleInfoChange}
                        className="w-full rounded-lg border border-gray-500 px-3 py-2 text-slate-700 focus:ring-teal-600  dark:focus:ring-teal-800"
                     />
                  </div>
                  <div className="mb-4 ">
                     <label htmlFor="description" className="font-medium">
                        Description
                     </label>
                     <input
                        required
                        id="description"
                        name="description"
                        type="text"
                        value={newItem.description}
                        onChange={handleInfoChange}
                        className="w-full rounded-lg border border-gray-500 px-3 py-2 text-slate-700 focus:outline-none"
                     />
                  </div>

                  <ul className="relative py-3  ">
                     <label htmlFor="description" className="font-medium">
                        Categories
                     </label>
                     <li>
                        <button
                           className="inline-flex w-full items-center justify-between rounded-lg bg-teal-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-300 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
                           type="button"
                           onClick={toggleDoubleDropdown}
                        >
                           <p>{selectedCategory}</p>
                           <svg
                              className="ml-2.5 h-2.5 w-2.5"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 10 6"
                           >
                              <path
                                 stroke="currentColor"
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth="2"
                                 d="m1 1 4 4 4-4"
                              />
                           </svg>
                        </button>
                     </li>
                     {/* Dropdown menu */}
                     <li className="">
                        {isDoubleDropdownOpen && (
                           <div
                              id="dropdownAvatar"
                              className={`absolute z-[100] h-52  w-full  divide-y  divide-gray-100 overflow-y-auto rounded-sm  border-b-4 border-b-slate-800 shadow-xl    dark:divide-opacity-60 ${theme.mainBg} ${theme.textColor}  dark:divide-gray-600`}
                           >
                              <ul
                                 className={` ${theme.borderColor}  ${theme.bgColor} ${theme.textColor}  h-2 py-2 text-sm  `}
                                 aria-labelledby="dropdownUserAvatarButton"
                              >
                                 {categories.map((cat) => (
                                    <li>
                                       <div
                                          className={`text-md block   ${theme.bgColor} px-4 py-2  font-medium hover:bg-teal-600 dark:hover:bg-teal-600  `}
                                          onClick={() => handleSetCategory(cat)}
                                       >
                                          {cat}
                                       </div>
                                    </li>
                                 ))}
                              </ul>
                           </div>
                        )}
                     </li>
                  </ul>
               </div>
               <div id="right-side" className="">
                  <div className="mb-4">
                     <label htmlFor="quantity" className="font-medium">
                        Quantity
                     </label>
                     <input
                        required
                        type="number"
                        name="quantity"
                        id="quantity"
                        value={newItem.quantity}
                        className="block w-full rounded-md border-gray-500 px-6 py-2 text-slate-700 focus:border-blue-400 focus:outline-none"
                        onChange={handleInfoChange}
                     />
                  </div>

                  <div className="mb-4">
                     <label htmlFor="price" className="font-medium">
                        Price
                     </label>
                     <div className="relative mt-1 rounded-md shadow-sm">
                        <span className="absolute inset-y-0 left-0  flex items-center pl-3 text-slate-700 ">
                           $
                        </span>
                        <input
                           required
                           type="number"
                           name="price"
                           id="price"
                           value={newItem.price}
                           step="0.01"
                           className="block w-full rounded-md border-gray-500 px-6 py-2 text-slate-700 focus:border-blue-400 focus:outline-none"
                           onChange={handleInfoChange}
                        />
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-700">
                           USD
                        </span>
                     </div>
                  </div>

                  {!newItem.image ? (
                     <div className="mb-4">
                        <label htmlFor="image" className="">
                           Image
                        </label>
                        <input
                           required
                           type="file"
                           name="image"
                           id="image"
                           accept="image/*"
                           onChange={handleImageChange}
                           className="mt-2 w-full text-slate-700 "
                        />
                     </div>
                  ) : (
                     <label
                        htmlFor="image"
                        className=" relative h-60 bg-gray-100"
                     >
                        <img
                           className="my-2 h-60 object-cover"
                           src={URL.createObjectURL(newItem.image)}
                           alt="Selected Image"
                        />
                        <input
                           type="file"
                           name="image"
                           id="image"
                           accept="image/*"
                           onChange={handleImageChange}
                           className="hidden"
                        />
                     </label>
                  )}

                  <div className='w-full flex justify-end'>
                     <button
                        type="submit"
                        className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-600 focus:outline-none"
                     >
                        Submit
                     </button>
                  </div>
               </div>
            </form>
            <IoMdClose
               className={`child absolute  right-2 top-2 h-7 w-9 cursor-pointer rounded-sm capitalize text-red-500  hover:text-red-600`}
               onClick={() => setToggleAddItemForm(false)}
            />
         </div>
      </div>
   );
};

export default ItemForm;
