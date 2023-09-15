import React, { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { Item } from '../../services/types';

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

interface EditItemModalProps {
   selectedItemToEdit: Item | null | undefined;
   setSelectedItemToEdit: (item: Item | null) => void;
   onEditItemSubmit: (event: React.FormEvent<Element>) => void;
   theme: any;
}

const EditItemModal: React.FC<EditItemModalProps> = ({
   selectedItemToEdit,
   setSelectedItemToEdit,
   onEditItemSubmit,
   theme
}) => {
   const [isDoubleDropdownOpen, setIsDoubleDropdownOpen] = useState(false);

   const toggleDoubleDropdown = () => {
      console.log('Toggle Double Dropdown');
      setIsDoubleDropdownOpen(!isDoubleDropdownOpen);
   };
   const handleSetCategory = (category: string) => {
      toggleDoubleDropdown();

      if (selectedItemToEdit) {
         setSelectedItemToEdit({
            ...selectedItemToEdit,
            category
         });
      }
   };

   const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;

      if (selectedItemToEdit) {
         setSelectedItemToEdit({
            ...selectedItemToEdit,
            [name]: value
         });
      }
   };

   const onTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { name, value } = event.target;

      if (selectedItemToEdit) {
         setSelectedItemToEdit({
            ...selectedItemToEdit,
            [name]: value
         });
      }
   };

   if (!selectedItemToEdit) return null;
   return (
      <div className="fixed top-0 left-0 right-0 bottom-0 flex  items-center  justify-center overflow-x-auto bg-gray-900 bg-opacity-50">
         <div
            className={`parent relative mx-3 flex h-fit w-full  flex-col-reverse flex-wrap justify-between overflow-hidden  border md:w-fit  md:flex-row dark:${theme.textColor} ${theme.mainBg} ${theme.borderColor}  p-1 shadow-xl   `}
         >
            <form
               onSubmit={onEditItemSubmit}
               key={selectedItemToEdit._id}
               className="parent relative my-2    p-2    "
            >
               <div className=" my-5  pl-5 ">
                  <div className="flex items-center">
                     <span className="pr-2 font-medium">Title:</span>
                     <input
                        type="text"
                        name="title"
                        value={selectedItemToEdit.title}
                        onChange={onChange}
                        className="w-full rounded  border border-gray-300 px-2 py-1 text-slate-800 "
                     />
                  </div>
                  <div className="flex   items-center whitespace-nowrap py-4 text-center text-sm  ">
                     <span className="pr-2 font-medium">Quantity:</span>
                     <input
                        type="number"
                        name="quantity"
                        value={selectedItemToEdit.quantity}
                        onChange={onChange}
                        className="w-full rounded border  border-gray-300 px-2 py-1 text-slate-800 "
                     />
                  </div>
                  <div className="flex items-center whitespace-nowrap  text-center text-sm  ">
                     <span className="pr-2 font-medium ">Price:</span>
                     <input
                        type="number"
                        name="price"
                        value={selectedItemToEdit.price}
                        onChange={onChange}
                        className="relative w-full rounded border  border-gray-300 px-2 py-1 text-slate-800 "
                     ></input>
                     <div className="absolute right-5 font-bold">$</div>
                  </div>
                  <ul className="relative py-3  ">
                     <label
                        htmlFor="description"
                        className="text-sm font-medium"
                     >
                        Categories
                     </label>
                     <li>
                        <button
                           className="mt-1 inline-flex w-full items-center justify-between rounded-lg bg-teal-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-300 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
                           type="button"
                           onClick={toggleDoubleDropdown}
                        >
                           <p>{selectedItemToEdit.category}</p>
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
                              className={`absolute z-[100] h-40  w-full  divide-y  divide-gray-100 overflow-y-auto rounded-sm  border-b-4 border-b-slate-800 shadow-xl    dark:divide-opacity-60 ${theme.mainBg} ${theme.textColor}  dark:divide-gray-600`}
                           >
                              <ul
                                 className={` ${theme.borderColor}  ${theme.bgColor} ${theme.textColor}  h-2 py-2 text-sm  `}
                                 aria-labelledby="dropdownUserAvatarButton"
                              >
                                 {categories.map((category) => (
                                    <li>
                                       <div
                                          className={`text-md block  border-b border-gray-300 ${theme.bgColor} px-4 py-2  font-medium hover:bg-teal-600 dark:hover:bg-teal-600  `}
                                          onClick={() =>
                                             handleSetCategory(category)
                                          }
                                       >
                                          {category}
                                       </div>
                                    </li>
                                 ))}
                              </ul>
                           </div>
                        )}
                     </li>
                  </ul>
                  <div className="font- flex items-center whitespace-nowrap text-center text-sm">
                     <span className="pr-2 ">Description:</span>
                     <textarea
                        name="description"
                        value={selectedItemToEdit.description}
                        onChange={onTextAreaChange}
                        className="px-full mb-7 h-32 w-full rounded border  border-gray-300 pb-5 text-sm text-slate-800 "
                     />
                  </div>
               </div>

               <button
                  type="submit"
                  className="child absolute bottom-0 right-0 h-10 w-20 rounded-sm  bg-blue-500 font-medium capitalize text-slate-100 shadow-xl hover:bg-blue-600  md:mr-2 lg:-bottom-5 lg:m-5"
               >
                  Save
               </button>
            </form>
            <div className="flex flex-wrap   justify-center sm:max-w-xs    ">
               <img
                  className="h-64 md:h-full"
                  src={
                     selectedItemToEdit.imageUrl +
                     '-/preview/800x800/-/progressive/yes/-/quality/lightest/'
                  }
                  alt={selectedItemToEdit.title}
               />
            </div>
            <IoMdClose
               className={`child absolute  right-2 top-2 h-7 w-9 cursor-pointer rounded-sm capitalize text-red-500  hover:text-red-600`}
               onClick={() => setSelectedItemToEdit(null)}
            />
         </div>
      </div>
   );
};

export default EditItemModal;
