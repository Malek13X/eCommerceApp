import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Home from "./pages/Home";
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"

import './App.css'

import { useGetDocsListQuery } from './services/docs'
import Header from "./components/Header";
import Footer from "./components/Footer";

const App: React.FC = () => {
  const { data, error, isLoading } = useGetDocsListQuery()

  return (
    <>
      <Router>
        <div className="container">
          
          <Routes>
            <Route path="/" element={<><Header /><Home /><Footer /></>} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
          </Routes>
          
        </div>
      </Router>
    </>
  )
}

export default App
