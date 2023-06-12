import React, { useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';

interface EditItemModalProps {
   selectedItemToEdit: any;
   setSelectedItemToEdit: (item: any) => void;
   onEditItemSubmit: (event: React.FormEvent<Element>) => void;
   theme: any;
}

const EditItemModal: React.FC<EditItemModalProps> = ({
   selectedItemToEdit,
   setSelectedItemToEdit,
   onEditItemSubmit,
   theme
}) => {
   if (!selectedItemToEdit) return null;

   const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setSelectedItemToEdit((prevItem: any) => ({
         ...prevItem,
         [name]: value
      }));
   };

   const onTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      setSelectedItemToEdit((prevItem: any) => ({
         ...prevItem,
         [name]: value
      }));
   };

   return (
      <div className="fixed overflow-x-auto top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
         <div
            className={`parent relative mx-3 overflow-hidden flex w-fit flex-col-reverse  md:flex-row flex-wrap justify-between border dark:${theme.textColor} ${theme.mainBg} ${theme.borderColor}  p-1 shadow-xl   `}
         >
            <form
               onSubmit={onEditItemSubmit}
               key={selectedItemToEdit._id}
               className="parent relative my-2   p-2    "
            >
               <div className=" my-5  pl-5 ">
                  <div className="flex items-center">
                     <span className="pr-2 ">Title:</span>
                     <input
                        type="text"
                        name="title"
                        value={selectedItemToEdit.title}
                        onChange={onChange}
                        className="rounded border border-gray-300 px-2 py-1 text-slate-800 "
                     />
                  </div>
                  <div className="flex items-center whitespace-nowrap py-4 text-center text-sm  ">
                     <span className="pr-2 ">Quantity:</span>
                     <input
                        type="number"
                        name="quantity"
                        value={selectedItemToEdit.quantity}
                        onChange={onChange}
                        className="rounded border border-gray-300 px-2 py-1 text-slate-800 "
                     />
                  </div>
                  <div className="flex items-center whitespace-nowrap  text-center text-sm  ">
                     <span className="pr-2 ">Price:</span>
                     <input
                        type="number"
                        name="price"
                        value={selectedItemToEdit.price}
                        onChange={onChange}
                        className="rounded border border-gray-300 px-2 py-1 text-slate-800 "
                     />
                  </div>
                  <div className="font- flex items-center whitespace-nowrap text-center text-sm">
                     <span className="pr-2 ">Description:</span>
                     <textarea
                        name="description"
                        value={selectedItemToEdit.description}
                        onChange={onTextAreaChange}
                        className="my-6 rounded border border-gray-300 px-2 text-sm text-slate-800 "
                     />
                  </div>
               </div>

               <button
                  type="submit"
                  className="child absolute bottom-0 right-0 md:mr-2 h-10 w-20 rounded-sm bg-blue-600 capitalize  shadow-xl hover:bg-blue-800 lg:m-5"
               >
                  Save
               </button>
            </form>
            <div className="flex max-w-xs flex-wrap justify-end    ">
               <img
                  className="bg-gradient-to-tr from-slate-600 to-slate-400"
                  src={
                     selectedItemToEdit.imageUrl +
                     '-/preview/800x800/-/progressive/yes/-/quality/lightest/'
                  }
                  alt={selectedItemToEdit.title}
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
