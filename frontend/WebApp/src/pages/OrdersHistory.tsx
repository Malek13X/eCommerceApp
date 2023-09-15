import { useState, useEffect } from 'react';
import {
   useGetAllOrdersQuery,
   useGetItemsQuery
} from '../features/api/apiSlice';
import { Item, Order } from '../services/types';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { ImSpinner2 } from 'react-icons/im';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';

const OrdersHistory: React.FC<{ theme: any }> = ({ theme }) => {
   const [selectedOrder, setSelectedOrder] = useState<Order | null>();

   const {
      user,
      isSuccess,
      isError,
      isLoading: isLoadingUser,
      message
   } = useSelector((state: any) => state.auth);
   const {
      data: orders,
      isLoading,
      error,
      refetch
   } = useGetAllOrdersQuery(user._id);

   const navigate = useNavigate();

   const handleSelectOrder = (order: Order | null) => {
      setSelectedOrder(order);
   };
   const {
      data: itemsData,
      isLoading: isLoadingGetItems,

      error: getItemsError,
      refetch: refetchItems
   } = useGetItemsQuery('');
   const formatDateTime = (date: Date | string): string => {
      let parsedDate: Date;

      if (typeof date === 'string') {
         // Try parsing the string as a date
         parsedDate = new Date(date);

         // Check if the parsing was successful
         if (isNaN(parsedDate.getTime())) {
            return 'Invalid Date'; // Handle invalid date string
         }
      } else if (date instanceof Date) {
         parsedDate = date;
      } else {
         return 'Invalid Date'; // Handle other cases where date is neither a string nor a Date
      }

      const day = String(parsedDate.getDate()).padStart(2, '0');
      const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
      const year = String(parsedDate.getFullYear());
      const hour = String(parsedDate.getHours() % 12 || 12).padStart(2, '0'); // Convert to 12-hour format
      const minutes = String(parsedDate.getMinutes()).padStart(2, '0');
      const period = parsedDate.getHours() >= 12 ? 'PM' : 'AM'; // Determine AM or PM

      return `${day}/${month}/${year} - ${hour}:${minutes} ${period}`;
   };

   const countTotalItems = (items: { itemId: string; quantity: number }[]) => {
      let total = 0;
      items.forEach((item) => {
         total += item.quantity;
      });
      return total;
   };

   const calculateItemQuantity = (item: {
      itemId: string;
      quantity: number;
   }): number => {
      let total = 0;
      if (itemsData) {
         const itemPrice =
            itemsData?.find((i) => i._id === item.itemId)?.price || 0;
         const itemQuantity =
            itemsData?.find((i) => i._id === item.itemId)?.quantity || 0;

         total = itemPrice * item.quantity;
      }

      return total;
   };

   if (isLoading) {
      return (
         <h1 className="flex justify-center pt-10 text-4xl font-bold">
            Loading...
         </h1>
      );
   }

   return (
      <div className={` ${theme.textColor} container  mx-auto mt-10 px-2 `}>
         <div className=" mx-auto max-w-7xl">
            <div className=" flex justify-between whitespace-nowrap  ">
               <h1 className="mb-4 text-2xl font-semibold md:text-3xl">
                  Orders History
               </h1>
            </div>
            <div className="flex flex-col">
               <div className="overflow-x-auto  shadow-md  sm:rounded-sm ">
                  <div className="inline-block h-[500px]  min-w-full align-middle">
                     <div className="mr-2 overflow-hidden rounded-md">
                        <table className="min-w-full table-fixed   ">
                           <thead
                              className={`border-b-2 bg-teal-600  ${theme.borderColor} mb- text-sm font-bold text-white`}
                           >
                              <tr className="">
                                 <th
                                    scope="col"
                                    className=" py-3 pl-2 md:px-3 "
                                 >
                                    Date
                                 </th>
                                 <th scope="col" className="py-3 md:px-6">
                                    Order Id
                                 </th>
                                 <th
                                    scope="col"
                                    className="ont-bold py-3 md:px-3"
                                 >
                                    Items Quantity
                                 </th>
                                 <th
                                    scope="col"
                                    className="ont-bold py-3 md:px-3"
                                 >
                                    Bill
                                 </th>
                              </tr>
                           </thead>
                           <tbody
                              className={`divide-y text-xs dark:divide-gray-600  ${theme.mainBg} md:text-sm`}
                           >
                              {orders?.toReversed()?.map((order) => (
                                 <tr
                                    key={order._id}
                                    className={`${theme.hoverColor} ${theme.hoverTextColor} hover:bg-opacity-90`}
                                    onClick={() => handleSelectOrder(order)}
                                 >
                                    <td className="whitespace-nowrap py-4 px-4 text-center font-medium">
                                       <p>{formatDateTime(order.orderDate)}</p>
                                    </td>
                                    <td className=" mx-5 flex items-center justify-center whitespace-nowrap py-4 px-6 font-medium ">
                                       <p>{order._id}</p>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-4 text-center font-medium">
                                       {countTotalItems(order.items)}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-4 text-center font-medium">
                                       {order.totalPrice.toLocaleString(
                                          'en-US',
                                          {
                                             style: 'currency',
                                             currency: 'USD'
                                          }
                                       )}
                                    </td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {selectedOrder && (
            <div className="fixed top-0  left-0 right-0 bottom-0 flex  items-center justify-center bg-gray-900 bg-opacity-50 ">
               <div
                  className={` container relative flex  h-fit w-fit py-2  ${theme.mainBg} flex-col ${theme.textColor} {theme.borderColor} items-center justify-center border shadow-xl   `}
               >
                  <div className="m-3 flex h-full w-fit flex-col   gap-4 text-sm font-medium md:text-base ">
                     <h1 className="ml-3 text-2xl font-bold">Receipt</h1>
                     <div className="ml-3">
                        <h1>Date: {formatDateTime(selectedOrder.orderDate)}</h1>
                        <h1>OrderId: {selectedOrder._id}</h1>
                     </div>

                     <div className="overflow-x-auto    ">
                        <div className="inline-block h-[400px]  min-w-fit align-middle">
                           <div
                              className={` border ${theme.borderColor}  overflow-hidden `}
                           >
                              <table className="min-w-full table-fixed   ">
                                 <thead
                                    className={` border-b-2 bg-gray-600 ${theme.borderColor}  text-sm font-bold text-white`}
                                 >
                                    <tr className="">
                                       <th
                                          scope="col"
                                          className="py-3 font-medium md:px-3"
                                       >
                                          Title
                                       </th>
                                       <th
                                          scope="col"
                                          className="py-3  pl-2 font-medium md:px-3 "
                                       >
                                          Quantity
                                       </th>

                                       <th
                                          scope="col"
                                          className="py-3 font-medium md:px-3"
                                       >
                                          Price
                                       </th>
                                    </tr>
                                 </thead>

                                 <tbody
                                    className={`divide-y text-xs dark:divide-gray-600  ${theme.mainBg} md:text-sm`}
                                 >
                                    {selectedOrder.items.map((item) => (
                                       <tr className=" font-medium">
                                          <td className=" whitespace-nowrap px-4 py-4 text-left font-medium">
                                             {
                                                itemsData?.find(
                                                   (i) => i._id === item.itemId
                                                )?.title
                                             }{' '}
                                          </td>
                                          <td className="whitespace-nowrap px-4 py-4 text-center font-medium">
                                             x{item.quantity}
                                          </td>

                                          <td className="flex flex-row content-center items-center gap-1 whitespace-nowrap px-4 py-4 text-center font-medium">
                                             {calculateItemQuantity(
                                                item
                                             ).toLocaleString('en-US', {
                                                style: 'currency',
                                                currency: 'USD'
                                             })}
                                             <p className="text-xs font-normal">
                                                (
                                                {itemsData
                                                   ?.find(
                                                      (i) =>
                                                         i._id === item.itemId
                                                   )
                                                   ?.price.toLocaleString(
                                                      'en-US',
                                                      {
                                                         style: 'currency',
                                                         currency: 'USD'
                                                      }
                                                   )}
                                                )
                                             </p>
                                          </td>
                                       </tr>
                                    ))}
                                 </tbody>
                              </table>
                           </div>
                           <div
                              className={`my-4 mr-4 flex flex-row justify-end gap-2 text-lg`}
                           >
                              <h1>Total:</h1>
                              <h1 className="font-normal">
                                 {selectedOrder.totalPrice.toLocaleString(
                                    'en-US',
                                    {
                                       style: 'currency',
                                       currency: 'USD'
                                    }
                                 )}
                              </h1>
                           </div>
                        </div>
                     </div>
                  </div>
                  <IoMdClose
                     className={`child absolute  right-2 top-2 h-7 w-9 cursor-pointer rounded-sm capitalize text-red-500  hover:text-red-600`}
                     onClick={() => handleSelectOrder(null)}
                  />
               </div>
            </div>
         )}
      </div>
   );
};
export default OrdersHistory;
