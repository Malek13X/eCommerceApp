import { useState, useEffect } from 'react';
import {
   useGetItemsQuery,
   useDeleteItemMutation,
   useEditItemMutation
} from '../features/api/apiSlice';
import { Item } from '../services/types';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { ImSpinner2 } from 'react-icons/im';

import EditItemModal from '../components/Functional/EditItemModal';
import ItemForm from '../components/Functional/ItemForm';

const AdminDashboard: React.FC<{ theme: any }> = ({ theme }) => {
   const { data: items, isLoading, error, refetch } = useGetItemsQuery('');
   const [editItem, { error: editError, isLoading: isEditing }] =
      useEditItemMutation();
   const [
      deleteItem,
      { isLoading: isDeleting, error: deleteError, isSuccess: isDeleted }
   ] = useDeleteItemMutation();

   const [toggleAddItemForm, setToggleAddItemForm] = useState(false);
   const [selectedItemToEdit, setSelectedItemToEdit] = useState<Item | null>();
   const [selectedItemToDelete, setSelectedItemToDelete] = useState('');

   const [showOutOfStock, setShowOutOfStock] = useState(false);
   const [filterProducts, setFilterProducts] = useState('');

   // Handle Filtring Items
   const handleFilterProducts = (
      event: React.ChangeEvent<HTMLInputElement>
   ) => {
      setFilterProducts(event.target.value);
   };
   // ----------------------------------------------------

   // Handle Item Delete

   const handleOnDelete = (itemId: string) => {
      setSelectedItemToDelete(itemId);
      deleteItem(itemId).then(() => {
         setSelectedItemToDelete('');
         refetch();
      });
   };
   // ----------------------------------------------------

   // Handle Item Edit

   const handleOnEdit = (item: Item) => {
      setSelectedItemToEdit(item);
   };
   const onEditItemSubmit = (event: React.FormEvent) => {
      event.preventDefault();

      if (selectedItemToEdit) {
         editItem(selectedItemToEdit).then(() => {
            setSelectedItemToEdit(null);
            refetch();
         });
      }
   };
   // ----------------------------------------------------

   const checkStatus = (item: any) => {
      let hiddenStatus;
      let quantityStatus;

      if (item.quantity === 0) {
         quantityStatus = (
            <div
               className="my-2 h-3 w-3 rounded-full bg-red-500 md:h-4 md:w-4"
               title="Out of stock"
            ></div>
         );
      } else if (item.quantity >= 1) {
         quantityStatus = (
            <div
               className="my-2 h-3 w-3 rounded-full bg-green-500 md:h-4 md:w-4"
               title="In stock"
            ></div>
         );
      }

      return (
         <>
            {quantityStatus}
            {hiddenStatus}
         </>
      );
   };

   useEffect(() => {
      console.log(error);
   }, [error, isDeleting]);

   if (isLoading) {
      return (
         <h1 className="flex justify-center pt-10 text-4xl font-bold">
            Loading...
         </h1>
      );
   }
   return (
      <div className={` ${theme.textColor} container  mx-auto mt-10 px-2 `}>
         <div className=" flex justify-between whitespace-nowrap xl:px-32 ">
            <h1 className="mb-4 text-2xl font-semibold md:text-3xl">
               Product Dashboard
            </h1>
            <div className="flex ">
               <button
                  className={`mx-2 h-8 w-fit rounded-sm bg-green-500 py-2  px-2 text-xs  font-bold text-white shadow-lg hover:bg-green-700 md:h-10 md:text-base`}
                  onClick={() => setToggleAddItemForm(true)}
               >
                  Add Item
               </button>
               <button
                  className="h-8 w-fit rounded-sm bg-teal-600 px-2  text-xs font-bold capitalize text-white shadow-lg  hover:bg-teal-800 md:h-10 md:text-base"
                  onClick={() => setShowOutOfStock(!showOutOfStock)}
               >
                  {showOutOfStock ? 'Show Out Of Stock' : 'Hide Out Of Stock'}
               </button>
            </div>
         </div>
         <div className=" mx-auto max-w-7xl">
            <div className="mb-5">
               <div className="relative">
                  <input
                     type="text"
                     id="filter-products"
                     className={`z-20 block w-full rounded-sm text-slate-700 focus:dark:border-0 dark:focus:border-opacity-0 focus:dark:ring-2 focus:dark:ring-slate-400`}
                     placeholder="Filter Products..."
                     onChange={handleFilterProducts}
                  />
               </div>
            </div>
            <div className="flex flex-col">
               <div className="overflow-x-auto  shadow-md  sm:rounded-sm ">
                  <div className="inline-block h-[500px]  min-w-full align-middle">
                     <div className="mr-2 overflow-hidden rounded-md">
                        <table className="min-w-full table-fixed   ">
                           <thead
                              className={`bg-teal-600 border-b-2  ${theme.borderColor} text-sm font-bold text-white mb-`}
                           >
                              <tr className="">
                                 <th
                                    scope="col"
                                    className=" py-3 pl-2 md:px-3 "
                                 >
                                    Status
                                 </th>
                                 <th scope="col" className="py-3 md:px-6">
                                    Product
                                 </th>
                                 <th
                                    scope="col"
                                    className="ont-bold py-3 md:px-3"
                                 >
                                    Quantity
                                 </th>
                                 <th scope="col" className="py-3 px-5 md:px-6">
                                    Price
                                 </th>
                                 <th scope="col" className="py-3 md:px-6">
                                    Actions
                                 </th>
                              </tr>
                           </thead>
                           <tbody
                              className={`divide-y text-xs dark:divide-gray-600  ${theme.mainBg} md:text-sm`}
                           >
                              {items
                                 ?.filter((item: Item) =>
                                    // showOutOfStock
                                    //    ? item.quantity > 0
                                    //    :
                                    item.title
                                       .toLowerCase()
                                       .includes(filterProducts.toLowerCase())
                                 )
                                 .map((item) => (
                                    <tr
                                       key={item._id}
                                       hidden={
                                          showOutOfStock && item.quantity === 0
                                             ? true
                                             : false
                                       }
                                       className={`${theme.hoverColor} ${
                                          theme.hoverTextColor
                                       } hover:bg-opacity-90 ${
                                          selectedItemToDelete &&
                                          selectedItemToDelete === item._id
                                             ? 'animate-pulse bg-gradient-to-r from-red-500 to-red-400'
                                             : selectedItemToEdit &&
                                               selectedItemToEdit._id ===
                                                  item._id
                                             ? 'animate-pulse bg-gradient-to-r from-blue-500 to-blue-400'
                                             : ''
                                       }`}
                                    >
                                       <td className=" h-1 w-1 px-4 md:px-6 ">
                                          {checkStatus(item)}
                                       </td>
                                       <td className="-ml-5  flex items-center  truncate whitespace-nowrap py-4 px-6  font-medium md:-ml-0">
                                          <img
                                             className="mr-5 w-14 rounded md:w-20"
                                             title={item.description}
                                             src={
                                                item.imageUrl +
                                                '-/preview/200x200/'
                                             }
                                          />
                                          <p className="" title={item.title}>
                                             {item.title}
                                          </p>
                                       </td>

                                       <td className="whitespace-nowrap py-4  text-center font-medium ">
                                          {item.quantity}
                                       </td>
                                       <td className="whitespace-nowrap py-4 text-center  font-medium ">
                                          {item.price.toLocaleString('en-US', {
                                             style: 'currency',
                                             currency: 'USD'
                                          })}
                                       </td>

                                       <td className="whitespace-nowrap py-4 text-center  ">
                                          <button
                                             className="mr-2 rounded bg-red-500 py-2 px-2  text-white hover:bg-red-700"
                                             onClick={() =>
                                                handleOnDelete(item._id)
                                             }
                                          >
                                             {selectedItemToDelete ===
                                             item._id ? (
                                                <ImSpinner2 className="animate-spin" />
                                             ) : (
                                                <FaTrash />
                                             )}
                                          </button>
                                          <button
                                             className="mx-2 rounded bg-blue-500 py-2 px-2  text-white hover:bg-blue-700"
                                             onClick={() => handleOnEdit(item)}
                                          >
                                             {selectedItemToEdit?._id ===
                                             item._id ? (
                                                <ImSpinner2 className="animate-spin" />
                                             ) : (
                                                <FaEdit />
                                             )}
                                          </button>
                                       </td>
                                    </tr>
                                 ))}
                           </tbody>
                        </table>
                     </div>
                  </div>
               </div>
            </div>
            <EditItemModal
               theme={theme}
               selectedItemToEdit={selectedItemToEdit}
               setSelectedItemToEdit={setSelectedItemToEdit}
               onEditItemSubmit={onEditItemSubmit}
            />
            <ItemForm
               theme={theme}
               toggleAddItemForm={toggleAddItemForm}
               setToggleAddItemForm={setToggleAddItemForm}
            />
         </div>

         
      </div>
   );
};
export default AdminDashboard;
