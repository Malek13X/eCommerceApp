import { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUserProfile } from '../features/user/authSlice';
import { AppDispatch } from '../app/store';
import Phone from '../components/Functional/Phone';
import {
   useGetAllOrdersQuery,
   useGetOrderByIdQuery
} from '../features/api/apiSlice';

// import Layout from "../components/Layout";

const Account: React.FC<{ theme: any }> = ({ theme }) => {
   // State variables for collapsible sections
   const [openPanel, setOpenPanel] = useState(1);
   const [errorMessage, setErrorMessage] = useState('');
   const [phoneInfo, setPhoneInfo] = useState({
      region: '',
      number: ''
   });

   // State variables for form inputs
   const [updatedInfo, setUpdatedInfo] = useState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
   });
   const { firstName, lastName, email, phone, password, confirmPassword } =
      updatedInfo;
   const { user, isSuccess, isError, isLoading, message } = useSelector(
      (state: any) => state.auth
   );

   const navigate = useNavigate();
   const dispatch = useDispatch<AppDispatch>();

   const {
      data: getAllOrders,
      isLoading: isLoadingOrders,
      error,
      isFetching,

      refetch
   } = useGetAllOrdersQuery(user._id);

   useEffect(() => {
      if (isError) {
         if ('message'.includes('400')) {
            setErrorMessage(message);
         }
         setErrorMessage(message);
      }
      if (!user) {
         navigate('/');
      }

      console.log(updatedInfo);
      return () => {};
   }, [user, phoneInfo, updatedInfo, message, isSuccess, isError]);

   const handleUpdatedInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
      setUpdatedInfo((prevState) => ({
         ...prevState,
         [event.target.name]: event.target.value
      }));
   };

   // Handler function for form submission
   const onUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (password !== confirmPassword) {
         setErrorMessage('Passwords do not match!');
      } else {
         const userData = {
            firstName,
            lastName,
            phone: phoneInfo.number
               ? `${phoneInfo.region} ${phoneInfo.number}`
               : user.phone,
            email,
            password
         };
         dispatch(updateUserProfile(userData));
      }

      // Clear form inputs after submission
      setUpdatedInfo({
         firstName: '',
         lastName: '',
         email: '',
         phone: '',
         password: '',
         confirmPassword: ''
      });
   };

   return (
      <div className="mx-0 max-w-7xl  py-20 lg:mx-auto">
         {/* Personal Information Panel */}
         <div className="mb-4">
            <button
               type="button"
               className={`flex w-full justify-between rounded-sm ${theme.mainBg} ${theme.textColor} over:dark:bg-opacity-70 px-4 py-4 text-left font-medium focus:outline-none focus-visible:ring  focus-visible:ring-opacity-50`}
               onClick={() => setOpenPanel(openPanel === 1 ? 0 : 1)}
            >
               <span className="px-5 text-xl">Personal Information</span>
               <svg
                  className={`h-5 w-5 ${
                     openPanel === 1 ? 'rotate-180 transform' : ''
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
               >
                  <path
                     fillRule="evenodd"
                     d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                     clipRule="evenodd"
                  />
               </svg>
            </button>
            <Transition show={openPanel === 1}>
               {user ? (
                  <div
                     className={` rounded-b-sm ${theme.mainBg} px-4 py-2 pb-6`}
                  >
                     <ul className="ml-10">
                        <li className="py-1 capitalize">
                           <strong className="pr-7 ">Name:</strong> {user.name}
                        </li>
                        <li className="py-1">
                           <strong className="pr-8">Email:</strong>
                           {user.email}
                        </li>
                        <li className="py-1">
                           <strong className="pr-6">Phone:</strong>
                           {user.phone}
                        </li>
                        <li className="py-1">
                           <strong className="pr-2">Address:</strong> 123 Main
                           St. Anytown, USA 12345
                        </li>
                     </ul>
                  </div>
               ) : (
                  <></>
               )}
            </Transition>
         </div>

         {/* Orders Panel */}
         {/* <div className="mb-4">
            <button
               type="button"
               className={`flex w-full justify-between rounded-sm ${theme.mainBg} ${theme.textColor} over:dark:bg-opacity-70 px-4 py-4 text-left font-medium focus:outline-none focus-visible:ring  focus-visible:ring-opacity-50`}
               onClick={() => setOpenPanel(openPanel === 2 ? 0 : 2)}
            >
               <span className="px-5 text-xl">Orders History</span>
               <svg
                  className={`h-5 w-5 ${
                     openPanel === 2 ? 'rotate-180 transform' : ''
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
               >
                  <path
                     fillRule="evenodd"
                     d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                     clipRule="evenodd"
                  />
               </svg>
            </button>
            <Transition show={openPanel === 2}>
               <div
                  className={`${
                     openPanel === 2 ? 'invesible' : ''
                  } rounded-b-sm ${theme.mainBg} px-16 py-2 `}
               >
                  <ul>
                     {getAllOrders?.map((order) => (
                        <li
                           key={order._id}
                           className="my-2 justify-between bg-slate-400 bg-opacity-30 px-2 py-4 md:flex md:px-12"
                        >
                           <h3>OrderId:{order._id}</h3>
                           <div className="md:text-md flex  w-2/6 items-center justify-between whitespace-nowrap text-sm ">
                              <p>${order.totalPrice}</p>
                           </div>
                        </li>
                     ))}
                  </ul>
               </div>
            </Transition>
         </div> */}

         {/* Settings Panel */}

         <form className="mb-4" onSubmit={onUpdate}>
            <button
               type="button"
               className={`flex w-full justify-between rounded-sm ${theme.mainBg} ${theme.textColor} over:dark:bg-opacity-70 px-4 py-4 text-left font-medium focus:outline-none focus-visible:ring  focus-visible:ring-opacity-50`}
               onClick={() => setOpenPanel(openPanel === 3 ? 0 : 3)}
            >
               <span className="px-5 text-xl">Settings</span>
               <svg
                  className={`h-5 w-5 ${
                     openPanel === 3 ? 'rotate-180 transform' : ''
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
               >
                  <path
                     fillRule="evenodd"
                     d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                     clipRule="evenodd"
                  />
               </svg>
            </button>
            <Transition show={openPanel === 3}>
               <div
                  className={` rounded-b-sm ${theme.mainBg} px-3 py-4 pb-6 md:px-16`}
               >
                  <section className="  ">
                     <p className="mt-4 text-red-500">
                        {' '}
                        {errorMessage ? errorMessage : ' '}
                     </p>
                     <div className="container mx-auto max-w-7xl md:w-3/4">
                        <div className="w-full  items-center space-y-4  p-4 md:inline-flex md:space-y-0">
                           <h2 className="mx-auto max-w-sm text-lg font-bold md:w-1/3">
                              Account
                           </h2>
                           <div className="mx-auto max-w-sm space-y-5 md:w-2/3">
                              <div>
                                 <label className="text-sm ">Email</label>
                                 <div className="relative inline-flex w-full border">
                                    <input
                                       type="email"
                                       value={email}
                                       name="email"
                                       className="block w-full rounded-sm border-0 border-gray-200 p-3 text-sm  text-slate-700 shadow-sm focus:dark:ring-2 focus:dark:ring-slate-400"
                                       placeholder={user ? user.email : ''}
                                       onChange={handleUpdatedInfo}
                                    />
                                    <span className="absolute right-2 inline-flex  h-full items-center ">
                                       <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-6 w-6 text-slate-700"
                                          fill="none"
                                          viewBox="0 0 23 20"
                                          stroke="currentColor"
                                       >
                                          <path
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                             strokeWidth="2"
                                             d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                          />
                                       </svg>
                                    </span>
                                 </div>
                              </div>
                              <div>
                                 <label className="text-sm ">
                                    Phone Number
                                 </label>
                                 <Phone
                                    setPhoneInfo={setPhoneInfo}
                                    phoneInfo={phoneInfo}
                                    userPhone={user.phone}
                                    theme={theme}
                                 />
                              </div>
                           </div>
                        </div>

                        <hr />
                        <div className="w-full  items-center space-y-4  p-4 md:inline-flex md:space-y-0">
                           <h2 className="mx-auto max-w-sm text-lg font-bold md:w-1/3">
                              Personal info
                           </h2>
                           <div className="mx-auto max-w-sm space-y-5 md:w-2/3">
                              <div>
                                 <label className="text-sm">First Name</label>
                                 <div className="relative inline-flex w-full ">
                                    <input
                                       type="text"
                                       value={firstName}
                                       name="firstName"
                                       className="block w-full rounded-sm border-0 p-3  text-sm text-slate-700  shadow-sm placeholder:capitalize  focus:dark:ring-2 focus:dark:ring-slate-400"
                                       placeholder={
                                          user ? user.name.split(' ')[0] : ''
                                       }
                                       onChange={handleUpdatedInfo}
                                    />
                                    <span className="absolute right-2 inline-flex  h-full items-center ">
                                       <svg
                                          fill="none"
                                          className="h-6 w-6 text-slate-700"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                       >
                                          <path
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                             strokeWidth="2"
                                             d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                          />
                                       </svg>
                                    </span>
                                 </div>
                              </div>
                              <div>
                                 <label className="text-sm ">Last Name</label>
                                 <div className="relative inline-flex w-full border">
                                    <input
                                       type="text"
                                       value={lastName}
                                       name="lastName"
                                       className="block w-full rounded-sm border-0 border-gray-200 p-3 text-sm text-slate-700  shadow-sm placeholder:capitalize  focus:dark:ring-2 focus:dark:ring-slate-400"
                                       placeholder={
                                          user ? user.name.split(' ')[1] : ''
                                       }
                                       onChange={handleUpdatedInfo}
                                    />
                                    <span className="absolute right-2 inline-flex  h-full items-center ">
                                       <svg
                                          fill="none"
                                          className="h-6 w-6 text-slate-700"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                       >
                                          <path
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                             strokeWidth="2"
                                             d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                          />
                                       </svg>
                                    </span>
                                 </div>
                              </div>
                           </div>
                        </div>

                        <hr />

                        <div className="w-full  items-center space-y-4  p-4 md:inline-flex md:space-y-0">
                           <h2 className="mx-auto max-w-sm text-lg font-bold md:w-4/12">
                              Change password
                           </h2>
                           <div className="mx-auto max-w-sm space-y-5 md:w-2/3">
                              <div>
                                 <label className="text-sm ">
                                    New Password
                                 </label>
                                 <div className="relative inline-flex w-full border">
                                    <input
                                       type="password"
                                       value={password}
                                       name="password"
                                       className="block w-full rounded-sm border-0 border-gray-200 p-3 text-sm  text-slate-700 shadow-sm focus:dark:ring-2 focus:dark:ring-slate-400"
                                       placeholder="***********"
                                       onChange={handleUpdatedInfo}
                                    />
                                    <span className="absolute right-2 inline-flex  h-full items-center ">
                                       <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-6 w-6 text-slate-700"
                                          fill="none"
                                          viewBox="0 0 23 20"
                                          stroke="currentColor"
                                       >
                                          <path
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                             strokeWidth="2"
                                             d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                          />
                                       </svg>
                                    </span>
                                 </div>
                              </div>

                              <div>
                                 <label className="text-sm ">
                                    Confirm Password
                                 </label>
                                 <div className="relative inline-flex w-full border">
                                    <input
                                       type="password"
                                       value={confirmPassword}
                                       name="confirmPassword"
                                       className="block w-full rounded-sm border-0 border-gray-200 p-3 text-sm  text-slate-700 shadow-sm focus:dark:ring-2 focus:dark:ring-slate-400"
                                       placeholder="***********"
                                       onChange={handleUpdatedInfo}
                                    />
                                    <span className="absolute right-2 inline-flex  h-full items-center ">
                                       <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-6 w-6 text-slate-700"
                                          fill="none"
                                          viewBox="0 0 23 20"
                                          stroke="currentColor"
                                       >
                                          <path
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                             strokeWidth="2"
                                             d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                          />
                                       </svg>
                                    </span>
                                 </div>
                              </div>
                           </div>
                        </div>

                        <hr />
                        <div className="my-3 flex  justify-between">
                           <button className=" inline-flex items-center text-red-500 focus:outline-none">
                              <svg
                                 fill="none"
                                 type="submit"
                                 className="mr-2 w-4"
                                 viewBox="0 0 24 24"
                                 stroke="currentColor"
                              >
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                 />
                              </svg>
                              Delete account
                           </button>

                           <button
                              className=" inline-flex w-28   max-w-sm items-center rounded-md bg-indigo-400 py-2 px-4 text-center text-white focus:outline-none "
                              type="submit"
                           >
                              <svg
                                 fill="none"
                                 className="mr-2 w-4 text-white"
                                 viewBox="0 0 24 24"
                                 stroke="currentColor"
                              >
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                 />
                              </svg>
                              Update
                           </button>
                        </div>
                     </div>
                  </section>
               </div>
            </Transition>
         </form>
      </div>
   );
};
export default Account;
