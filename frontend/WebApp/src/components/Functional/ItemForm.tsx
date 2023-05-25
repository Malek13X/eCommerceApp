import React, { useEffect, useState } from 'react';

import { useAddItemMutation } from '../../features/items/itemApi';
import { NewItem } from '../../services/types';
import { IoMdClose } from 'react-icons/io';

type props = {
   theme: any;
   toggleAddItemForm: boolean;
   setToggleAddItemForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const ItemForm: React.FC<props> = ({
   theme,
   setToggleAddItemForm,
   toggleAddItemForm
}) => {
   const [newItem, setNewItem] = useState<NewItem>({
      title: '',
      description: '',
      categories: [],
      price: 0,
      quantity: 0,
      image: null
   });
   const [newCategory, setNewCategory] = useState('');
   const [addItem, { isLoading, error, isSuccess }] = useAddItemMutation();

   const handleCategoryAdd = () => {
      if (newCategory.trim() !== '') {
         setNewItem((prevItem) => ({
            ...prevItem,
            categories: [...prevItem.categories, newCategory.trim()]
         }));
         setNewCategory('');
      }
   };

   const handleCategoryDelete = (category: string) => {
      setNewItem((prevItem) => ({
         ...prevItem,
         categories: prevItem.categories.filter((cat) => cat !== category)
      }));
   };

   const handleInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setNewItem((prevItem) => ({
         ...prevItem,
         [name]: [value]
      }));
   };

   const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files && event.target.files[0];
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
            categories: [],
            price: 0,
            quantity: 0,
            image: null
         });
      }
      if (error !== undefined) {
         console.log('Error:', error);
      }
   }, [error, isSuccess, newItem]);

   if (isLoading) {
      <div>Loading...</div>;
   }
   if (!toggleAddItemForm) {
      return <></>;
   }
   return (
      <div className="fixed top-0  left-0 right-0 bottom-0 flex  items-center justify-center bg-gray-900 bg-opacity-50 md:scale-100">
         <div className="parent relative mx-3 flex max-w-7xl  border border-slate-300 bg-slate-700 p-2  shadow-xl  md:flex-row md:flex-nowrap ">
            <form
               onSubmit={handleSubmit}
               className={`${theme.mainBg} ${theme.textColor} p-10`}
            >
               <div className=" mb-4 items-center">
                  <label htmlFor="title" className="flex-1 ">
                     Title
                  </label>
                  <input
                     type="text"
                     id="title"
                     name="title"
                     value={newItem.title}
                     onChange={handleInfoChange}
                     className="w-full rounded-lg border border-gray-500 px-3 py-2 text-slate-600 focus:border-blue-400 focus:outline-none"
                  />
               </div>

               <div className="mb-4">
                  <label htmlFor="description" className="">
                     Description
                  </label>
                  <input
                     id="description"
                     name="description"
                     type="text"
                     value={newItem.description}
                     onChange={handleInfoChange}
                     className="w-full rounded-lg border border-gray-500 px-3 py-2 text-slate-600 focus:border-blue-400 focus:outline-none"
                  />
               </div>

               <div className="mb-4">
                  <label htmlFor="categories" className="">
                     Categories
                  </label>
                  <div>
                     <div className="flex flex-wrap items-center">
                        {newItem.categories.map((category) => (
                           <span
                              key={category}
                              className="mr-2 mb-2 rounded-lg border-2 border-blue-500 px-2"
                           >
                              {category}
                              <button
                                 type="button"
                                 className="ml-2 text-red-600"
                                 onClick={() => handleCategoryDelete(category)}
                              >
                                 &times;
                              </button>
                           </span>
                        ))}
                     </div>
                     <div>
                        <div className='flex'>
                           <input
                              className="rounded-lg text-slate-700 w-full"
                              name="categories"
                              type="text"
                              value={newCategory}
                              onChange={(e) => setNewCategory(e.target.value)}
                              placeholder="Enter a category"
                           />
                           <button
                              type="button"
                              className="focus:shadow-outline ml-1 rounded-lg bg-blue-500 py-2 px-3 font-bold text-white hover:bg-blue-600 focus:outline-none"
                              onClick={handleCategoryAdd}
                           >
                              Add
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="mb-4">
                  <label htmlFor="quantity" className="">
                     Quantity
                  </label>
                  <input
                     type="number"
                     name="quantity"
                     id="quantity"
                     value={newItem.quantity}
                     className="block w-full rounded-md border-gray-500 px-6 py-2 text-slate-600 focus:border-blue-400 focus:outline-none"
                     onChange={handleInfoChange}
                  />
               </div>

               <div className="mb-4">
                  <label htmlFor="price" className="">
                     Price
                  </label>
                  <div className="relative mt-1 rounded-md shadow-sm">
                     <span className="absolute inset-y-0 left-0  flex items-center pl-3 text-slate-600 ">
                        $
                     </span>
                     <input
                        type="number"
                        name="price"
                        id="price"
                        value={newItem.price}
                        step="0.01"
                        className="block w-full rounded-md border-gray-500 px-6 py-2 text-slate-600 focus:border-blue-400 focus:outline-none"
                        onChange={handleInfoChange}
                     />
                     <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-600">
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
                        type="file"
                        name="image"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-2 w-full text-slate-600"
                     />
                  </div>
               ) : (
                  <>
                     <img
                        className="max-w-50 h-60 bg-gray-100 "
                        src={URL.createObjectURL(newItem.image)}
                     />
                  </>
               )}

               <button
                  type="submit"
                  className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-600 focus:outline-none"
               >
                  Submit
               </button>
            </form>
            <IoMdClose
               className="child absolute right-0 top-0 h-7 w-9 rounded-sm bg-red-500 capitalize shadow-xl hover:bg-red-700"
               onClick={() => setToggleAddItemForm(false)}
            />
         </div>
      </div>
   );
};

export default ItemForm;
