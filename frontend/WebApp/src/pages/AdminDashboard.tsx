import { useState, useEffect } from 'react';
import {
   useGetItemsQuery,
   useDeleteItemMutation,
   useEditItemMutation
} from '../features/items/itemApi';
import { INewItem, Item } from '../services/types';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { ImSpinner, ImSpinner2 } from 'react-icons/im';

import EditItemModal from '../components/Functional/EditItemModal';
import ItemForm from '../components/Functional/ItemForm';

const AdminDashboard: React.FC<{ theme: any }> = ({ theme }) => {
   const { data: items, isLoading, error, refetch } = useGetItemsQuery('');
   const [selectedItemToDelete, setSelectedItemToDelete] = useState('');
   const [showOutOfStock, setShowOutOfStock] = useState(false);
   const [toggleAddItemForm, setToggleAddItemForm] = useState(false);

   const [selectedItemToEdit, setSelectedItemToEdit] = useState<Item | null>();
   const [
      deleteItem,
      { isLoading: isDeleting, error: deleteError, isSuccess: isDeleted }
   ] = useDeleteItemMutation();

   const handleOnDelete = (itemId: string) => {
      setSelectedItemToDelete(itemId);
      deleteItem(itemId).then(() => {
         setSelectedItemToDelete('');
         refetch();
      });
   };
   const handleOnEdit = (item: Item) => {
      setSelectedItemToEdit(item);
   };
   const checkStatus = (item: any) => {
      let hiddenStatus;
      let quantityStatus;

      if (item.quantity === 0) {
         quantityStatus = (
            <div
               className="my-2 h-4 w-4 rounded-full bg-red-500"
               title="Out of stock"
            ></div>
         );
      } else if (item.quantity >= 1) {
         quantityStatus = (
            <div
               className="my-2 h-4 w-4 rounded-full bg-green-500"
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

   useEffect(() => {}, [error, isDeleting]);

   if (isLoading) {
      return (
         <h1 className="flex justify-center pt-10 text-4xl font-bold">
            Loading...
         </h1>
      );
   }
   return (
      <div className="container mx-auto mt-10">
         <div className=" flex justify-between whitespace-nowrap 2xl:px-32 ">
            <h1 className="mb-4 text-2xl font-semibold md:text-3xl">
               Product Dashboard
            </h1>
            <div className="flex ">
               <button
                  className="mx-2 h-8 w-fit rounded-sm bg-green-500 py-2  px-2 text-xs  font-bold text-white shadow-lg hover:bg-green-700 md:h-10 md:text-base"
                  onClick={() => setToggleAddItemForm(true)}
               >
                  Add Item
               </button>
               <button
                  className="h-8 w-fit rounded-sm bg-slate-500   px-2  text-xs capitalize shadow-lg hover:bg-slate-600 md:h-10  md:text-base"
                  onClick={() => setShowOutOfStock(!showOutOfStock)}
               >
                  {showOutOfStock ? 'Show Out Of Stock' : 'Hide Out Of Stock'}
               </button>
            </div>
         </div>

         <div className="mx-auto max-w-7xl">
            <div className="flex flex-col">
               <div className="overflow-x-auto  shadow-md sm:rounded-lg">
                  <div className="inline-block min-w-full align-middle">
                     <div className="overflow-hidden ">
                        <table className="min-w-full  table-fixed divide-y divide-gray-200 dark:divide-gray-700">
                           <thead className="bg-gray-100 dark:bg-gray-700">
                              <tr>
                                 <th
                                    scope="col"
                                    className="py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-400 md:px-3"
                                 >
                                    Status
                                 </th>
                                 <th
                                    scope="col"
                                    className="py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-700  dark:text-gray-400 md:px-6"
                                 >
                                    Product
                                 </th>
                                 <th
                                    scope="col"
                                    className="py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-400 md:px-3"
                                 >
                                    Quantity
                                 </th>
                                 <th
                                    scope="col"
                                    className="py-3 px-5 text-center text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-400 md:px-6"
                                 >
                                    Price
                                 </th>
                                 <th
                                    scope="col"
                                    className="py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-400 md:px-6"
                                 >
                                    Actions
                                 </th>
                              </tr>
                           </thead>
                           <tbody className="w-40 divide-y divide-gray-200 bg-white dark:divide-gray-600 dark:bg-gray-800">
                              {items
                                 ?.filter((item) =>
                                    showOutOfStock ? item.quantity > 0 : item
                                 )
                                 .map((item) => (
                                    <tr
                                       key={item._id}
                                       className={`hover:bg-gray-100 dark:hover:bg-gray-700  ${
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
                                       <td className=" h-4 w-4 px-6 ">
                                          {checkStatus(item)}
                                       </td>
                                       <td
                                          className="flex  items-center truncate whitespace-nowrap py-4 px-6 text-sm font-medium text-gray-900 dark:text-white"
                                          title={item.description}
                                       >
                                          <img
                                             className="mr-5 w-20 rounded"
                                             src={
                                                item.imageUrl +
                                                '-/preview/200x200/'
                                             }
                                          />
                                          {item.title}
                                       </td>

                                       <td className="whitespace-nowrap py-4  text-center text-sm font-medium text-gray-500 dark:text-white">
                                          {item.quantity}
                                       </td>
                                       <td className="whitespace-nowrap py-4  text-center text-sm font-medium text-gray-900 dark:text-white">
                                          ${item.price}
                                       </td>

                                       <td className="whitespace-nowrap py-4 text-center text-sm ">
                                          <button
                                             className="mr-2 rounded bg-red-500 py-2 px-2 font-bold text-white hover:bg-red-700"
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
                                             className="mx-2 rounded bg-blue-500 py-2 px-2 font-bold text-white hover:bg-blue-700"
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
               selectedItemToEdit={selectedItemToEdit}
               setSelectedItemToEdit={setSelectedItemToEdit}
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
