import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Home from "./pages/Home";
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import { useGetDocsListQuery } from './services/docs'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Test from "./pages/Test";
import { useEffect, useState } from "react";
import Nav from "./components/NavBar//Nav";
import { darkTheme, lightTheme } from "./components/data";
import { useSelector } from "react-redux";


const App: React.FC = () => {
  const { data, error, isLoading } = useGetDocsListQuery()
  const {themeMode} = useSelector((state:any) => state.UI);
  
  const theme = themeMode === 'dark' ? darkTheme : lightTheme;
  
  useEffect(() => {    

  }, [])
  
  return (
    <>
      <Router>
        <div className={`shrink min-h-screen  ${theme.bgColor} ${theme.textColor}  `}>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/test" element={ <Test theme={theme}/>} />
          </Routes>
          
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
