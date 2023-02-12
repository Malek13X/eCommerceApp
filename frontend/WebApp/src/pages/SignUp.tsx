import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signUp, reset } from '../features/user/authSlice';
import { AppDispatch } from '../app/store';
import { toast } from 'react-toastify';


export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName:  '',
    email:  '',
    password:  '',
    password2:  '',
  })
  const [userExist, setUserExist] = useState(false)

  const { firstName, lastName, email, password, password2} = formData;
  
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  const { user, isError, isSuccess, isLoading, message } = useSelector((state:any) => state.auth || {})


  useEffect(() => {
    if (isError) {
      if (message.includes('400')) {
        toast.error('User Already Exist!', {toastId: 'errorId1'} )
        setUserExist(true)
      }
    }

    if (isSuccess) {
      navigate('/')
      toast.success(`Registered Successfuly!` , {toastId: 'messageId1'} )
      toast.success(`Welcome ${firstName}!` , {toastId: 'messageId2'} )
    }
    
    if (user != null) {
      navigate('/')
    }

    dispatch(reset());


  }, [user, isError, isSuccess, message, dispatch, navigate ])
  


  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== password2) {
      toast.error("Passwords do not match!")
    } 
    else { 
      const userData = {
        firstName,
        lastName,
        email,
        password
      }
      dispatch(signUp(userData));
    }

  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prevState) => ({ 
      ...prevState, 
      [event.target.name]: event.target.value
    }))
  }
  
  const navToSignIn = () => navigate('/sign-in');
  return (
    <section className="relative flex flex-wrap    items-center justify-center">
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">       
         <div className='p-10 rounded-lg bg-[#222831]  shadow-md'>


            <div className="mx-auto max-w-lg text-center">
              <div className="text-2xl font-bold sm:text-3xl text-[#FFD369]">Sign up, and start shopping!</div>
              <p className="mt-4 text-gray-700">
              </p>
            </div>

          
          <form action="" onSubmit={onSubmit} className="mx-auto  mt-8 mb-0 max-w-md space-y-4 text-slate-800 font-bold ">


            <div className='flex '>
              {/* First Name */}
              <label htmlFor="firstName" className="sr-only">First Name</label>

              <div className="relative flex-1 ">              
                <input type="text" name='firstName' className="w-full rounded-lg border-gray-700 p-4 pr-20 text-sm shadow-sm" placeholder="First Name" onChange={onChange}/>              

                <span className="absolute inset-y-0 right-4 inline-flex items-center pr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5  text-slate-800" fill="none" viewBox="0 0 20 20" stroke="currentColor">
                    <path d="M10,10.9c2.373,0,4.303-1.932,4.303-4.306c0-2.372-1.93-4.302-4.303-4.302S5.696,4.223,5.696,6.594C5.696,8.969,7.627,10.9,10,10.9z M10,3.331c1.801,0,3.266,1.463,3.266,3.263c0,1.802-1.465,3.267-3.266,3.267c-1.8,0-3.265-1.465-3.265-3.267C6.735,4.794,8.2,3.331,10,3.331z"></path>
                    <path fill="none" d="M10,12.503c-4.418,0-7.878,2.058-7.878,4.685c0,0.288,0.231,0.52,0.52,0.52c0.287,0,0.519-0.231,0.519-0.52c0-1.976,3.132-3.646,6.84-3.646c3.707,0,6.838,1.671,6.838,3.646c0,0.288,0.234,0.52,0.521,0.52s0.52-0.231,0.52-0.52C17.879,14.561,14.418,12.503,10,12.503z"></path>
                  </svg>
                </span>

              </div>  
              {/* Last Name */}
              <label htmlFor="lastName" className="sr-only">Last Name</label>
              <div className="relative pl-2 flex-1">
                <input type="text" name='lastName' className="w-full rounded-lg border-gray-200 p-4 pr-20 text-sm shadow-sm" placeholder="Last Name" onChange={onChange} />
                  
                <span className="absolute inset-y-0 right-4 inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-800" fill="none" viewBox="0 0 20 20" stroke="currentColor" >
                      <path d="M10,10.9c2.373,0,4.303-1.932,4.303-4.306c0-2.372-1.93-4.302-4.303-4.302S5.696,4.223,5.696,6.594C5.696,8.969,7.627,10.9,10,10.9z M10,3.331c1.801,0,3.266,1.463,3.266,3.263c0,1.802-1.465,3.267-3.266,3.267c-1.8,0-3.265-1.465-3.265-3.267C6.735,4.794,8.2,3.331,10,3.331z"></path>
                      <path fill="none" d="M10,12.503c-4.418,0-7.878,2.058-7.878,4.685c0,0.288,0.231,0.52,0.52,0.52c0.287,0,0.519-0.231,0.519-0.52c0-1.976,3.132-3.646,6.84-3.646c3.707,0,6.838,1.671,6.838,3.646c0,0.288,0.234,0.52,0.521,0.52s0.52-0.231,0.52-0.52C17.879,14.561,14.418,12.503,10,12.503z"></path>
                  </svg>
                </span>

              </div>
            </div>

            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <div className="relative">
                <input
                  type="email"
                  name='email'
                  className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                  placeholder="Email"
                  onChange={onChange}
                />

                <span className="absolute inset-y-0 right-4 inline-flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-slate-800"
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
            </div>

            <div className='flex '>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative pr-2">
                <input
                  type="password"
                  name='password'
                  className="w-full rounded-lg border-gray-200  p-4 pr-20 text-sm shadow-sm"
                  placeholder="Password"
                  onChange={onChange}
                />
                <span className="absolute inset-y-0 right-4 inline-flex items-center pr-2">
                  <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-slate-800"
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
              <label htmlFor="password2" className="sr-only">Confirm Password</label>
              <div className="relative">
                <input
                  type="password"
                  name='password2'
                  className="w-full rounded-lg border-gray-200 p-4 pr-20 text-sm shadow-sm"
                  placeholder="Confirm Password"
                  onChange={onChange}
                />
              <span className="absolute inset-y-0 right-4 inline-flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-slate-800"
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
            </div>

          <div className="flex items-center justify-between">
              <p className="text-sm  lg:pl-2 dark:text-[#eeeeee] font-normal">
                Already have an account? <a  onClick={navToSignIn} className="underline text-sm cursor-pointer font-bold text-[#FFD369]" >Sign In!</a>
              </p>
              <button
                type="submit"
                className="ml-3 inline-block rounded-lg  bg-[#FFD369] px-5 py-3 text-sm font-medium text-white shadow-md"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}