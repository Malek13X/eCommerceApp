import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import { useGetDocsListQuery } from './services/docs';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import Home from './pages/Home';
import Test from './pages/Test';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';

import { useEffect, useState } from 'react';
import Nav from './components/NavBar//Nav';
import { darkTheme, lightTheme } from './components/data';
import {  useSelector } from 'react-redux';



const App: React.FC = () => {
   const { data, error, isLoading } = useGetDocsListQuery();
   const { themeMode } = useSelector((state: any) => state.UI);
   const { user } = useSelector((state:any) => state.auth)
   const token = localStorage.getItem('token');
   const theme = themeMode === 'dark' ? darkTheme : lightTheme;

   useEffect(() => {
      
   }, [user, token]);

   return (
      <>
         <Router>
            <div
               className={`min-h-screen   ${theme.bgColor} ${theme.textColor}  `}
            >
               <Nav />
               <Routes>
                  <Route path="/" element={<Home theme={theme} />} />
                  <Route path="/signup" element={<SignUp theme={theme} />} />
                  <Route path="/signin" element={<SignIn theme={theme} />} />
                  <Route path="/profile" element={<Profile theme={theme} />} />
                  <Route path="/test" element={<Test theme={theme} />} />
               </Routes>
            </div>
         </Router>
         <ToastContainer />
      </>
   );
};

export default App;
