import React, { useEffect, useState } from 'react';
import { useEditItemMutation } from '../../features/items/itemApi';
import { IoMdClock, IoMdClose } from 'react-icons/io';
import ItemForm from './ItemForm';

interface EditItemModalProps {
   selectedItemToEdit: any;
   setSelectedItemToEdit: (item: any) => void;
}

const EditItemModal: React.FC<EditItemModalProps> = ({
   selectedItemToEdit,
   setSelectedItemToEdit
}) => {
   if (!selectedItemToEdit) return null;

   const [editCurrentItem, setEditCurrentItem] = useState(selectedItemToEdit);
   const [editItem, { error, isLoading }] = useEditItemMutation();
   const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setEditCurrentItem((prevItem: any) => ({
         ...prevItem,
         [name]: value
      }));
   };
   useEffect(() => {
      // console.log('Error:', error);
   }, [editCurrentItem, error]);

   const onSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      editItem(editCurrentItem);
      setSelectedItemToEdit(null);
   };

   return (
      <div className="fixed  top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
         <div className="parent relative mx-3 flex max-w-7xl flex-col-reverse flex-wrap justify-between border border-slate-300 bg-slate-700 p-2  shadow-xl  md:flex-row md:flex-nowrap ">
            <form
               onSubmit={onSubmit}
               key={editCurrentItem._id}
               className="parent relative my-2 w-full  p-2 hover:bg-gray-100 dark:hover:bg-gray-700 md:mx-2 md:my-0 md:w-1/2"
            >
               <div className=" my-5 md:my-1 md:p-5 ">
                  <div className="flex items-center">
                     <span className="pr-2 font-bold">Title:</span>
                     <input
                        type="text"
                        name="title"
                        value={editCurrentItem.title}
                        onChange={onChange}
                        className="rounded border border-gray-300 px-2 py-1 text-slate-800"
                     />
                  </div>
                  <div className="flex items-center whitespace-nowrap py-4 text-center text-sm font-medium text-gray-500 dark:text-white">
                     <span className="pr-2 font-bold">Quantity:</span>
                     <input
                        type="number"
                        name="quantity"
                        value={editCurrentItem.quantity}
                        onChange={onChange}
                        className="rounded border border-gray-300 px-2 py-1 text-slate-800"
                     />
                  </div>
                  <div className="flex items-center whitespace-nowrap  text-center text-sm font-medium text-gray-900 dark:text-white">
                     <span className="pr-2 font-bold">Price:</span>
                     <input
                        type="number"
                        name="price"
                        value={editCurrentItem.price}
                        onChange={onChange}
                        className="rounded border border-gray-300 px-2 py-1 text-slate-800"
                     />
                  </div>
                  <div className="flex items-center whitespace-nowrap text-center text-sm font-medium text-gray-900 dark:text-white">
                     <span className="pr-2 font-bold">Description:</span>
                     <textarea
                        name="description"
                        value={editCurrentItem.description}
                        onChange={onChange}
                        className="my-6 rounded border border-gray-300  px-2 text-slate-800"
                     />
                  </div>
               </div>

               <button
                  type="submit"
                  className="child absolute bottom-0 right-0 h-10 w-20 rounded-sm bg-blue-600 capitalize text-white shadow-xl hover:bg-blue-800 lg:m-5"
               >
                  Save
               </button>
            </form>
            <div className="flex w-96  flex-wrap justify-end   md:w-1/2   ">
               <img
                  className="bg-gradient-to-tr from-slate-600 to-slate-400"
                  src={editCurrentItem.imageUrl + '-/preview/400x400'}
                  alt={editCurrentItem.title}
               />
            </div>
            <IoMdClose
               className="child absolute right-0 top-0 h-7 w-9 rounded-sm bg-red-500 capitalize shadow-xl hover:bg-red-700"
               onClick={() => setSelectedItemToEdit(null)}
            />
         </div>
      </div>
   );
};

export default EditItemModal;
