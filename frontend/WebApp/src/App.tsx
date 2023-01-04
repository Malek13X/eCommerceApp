import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Home from "./pages/Home";
import Login from "./pages/Login"
import Register from "./pages/Register"

import './App.css'

import { useGetDocsListQuery } from './services/docs'

const App: React.FC = () => {
  const { data, error, isLoading } = useGetDocsListQuery()

  return (
    <>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
