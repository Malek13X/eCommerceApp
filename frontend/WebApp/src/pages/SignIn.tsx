import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signIn, reset } from '../features/user/authSlice';
import { AppDispatch } from '../app/store';
import { darkTheme, lightTheme } from '../components/data';

export default function SignIn() {
   const [formData, setFormData] = useState({
      email: '',
      password: ''
   });
   const [errorMessage, setErrorMessage] = useState('');

   const { email, password } = formData;

   const dispatch = useDispatch<AppDispatch>();
   const navigate = useNavigate();

   const { user, isError, isSuccess, isLoading, message } = useSelector(
      (state: any) => state.auth || {}
   );

   // Change theme mode
   const { themeMode } = useSelector((state: any) => state.UI);
   const theme = themeMode === 'dark' ? darkTheme : lightTheme;

   useEffect(() => {
      if (isError) {
         setErrorMessage(message);
      }

      if (isSuccess) {
         navigate('/');
      }

      if (user) {
         navigate('/');
      }

      dispatch(reset());
   }, [user, isError, isSuccess, message, dispatch, navigate]);

   const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const userData = {
         email,
         password
      };

      dispatch(signIn(userData));
   };

   const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prevState) => ({
         ...prevState,
         [event.target.name]: event.target.value
      }));
   };

   const navToSignUp = () => navigate('/signup');

   return (
      <section className="relative flex flex-wrap items-center justify-center">
         <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
            <div className={`rounded-sm ${theme.mainBg} p-10 shadow-md`}>
               {/* Sign in heading */}
               <div className="mx-auto max-w-lg text-center">
                  <h1 className="text-2xl font-bold sm:text-3xl">
                     Sign in, and start shopping!
                  </h1>

                  {/* Empty space */}
                  <p className="mt-4 text-red-500">
                     {' '}
                     {errorMessage ? '- ' + errorMessage : ' '}
                  </p>
               </div>

               {/* Sign in form */}
               <form
                  action=""
                  onSubmit={onSubmit}
                  className="mx-auto mt-8 mb-0 max-w-md space-y-4"
               >
                  {/* Email input */}
                  <div className="relative">
                     <label htmlFor="email" className="sr-only">
                        Email
                     </label>
                     <input
                        type="email"
                        name="email"
                        className="block w-full rounded-sm border-gray-200 p-4 text-sm text-slate-700  shadow-sm focus:dark:border-0 dark:focus:border-opacity-0 focus:dark:ring-2 focus:dark:ring-slate-400"
                        placeholder="Enter email"
                        onChange={onChange}
                     />

                     <span className="absolute inset-y-0 right-4 inline-flex items-center">
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           className="h-5 w-5 text-gray-400"
                           fill="none"
                           viewBox="0 0 24 24"
                           stroke="currentColor"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                           />
                        </svg>
                     </span>
                  </div>

                  {/* Password input */}
                  <div className="relative">
                     <label htmlFor="password" className="sr-only">
                        Password
                     </label>
                     <input
                        type="password"
                        name="password"
                        className="block w-full rounded-sm border-gray-200 p-4 text-sm text-slate-700  shadow-sm focus:dark:border-0 dark:focus:border-opacity-0 focus:dark:ring-2 focus:dark:ring-slate-400"
                        placeholder="Enter password"
                        onChange={onChange}
                     />

                     <span className="absolute inset-y-0 right-4 inline-flex items-center">
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           className="h-5 w-5 text-gray-400"
                           fill="none"
                           viewBox="0 0 24 24"
                           stroke="currentColor"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                           />
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                           />
                        </svg>
                     </span>
                  </div>

                  <div className="flex items-center justify-between">
                     {/* Sign up URL */}
                     <p className="pl-2 text-sm text-gray-500">
                        No account?{' '}
                        <a
                           onClick={navToSignUp}
                           className="cursor-pointer text-sm font-bold underline"
                        >
                           Sign Up!
                        </a>
                     </p>

                     {/* Submit button */}
                     <button
                        type="submit"
                        className="ml-3 inline-block rounded-sm bg-blue-500 px-5 py-3 text-sm font-medium text-white shadow-md"
                     >
                        Sign in
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </section>
   );
}
