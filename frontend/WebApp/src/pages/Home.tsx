import { ButtonUnstyled } from "@mui/base"
import Content from "../components/Content"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../app/store"
import { signOut } from "../features/user/authSlice"

function Home() {

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  
  const {user} = useSelector((state:any) => state.auth) 
  
  
  useEffect(() => {
  
  }, [user])

  const onSignOutClick = () => {
    dispatch(signOut());
     
    // ? window.location.reload(false); 
  }
  

  return (
    <div className="home min-h-screen t-16" >
      {
        user
        ? <>
            <h1 className="text-xl2">Hello {user.name}</h1>
            <div>
              <button onClick={onSignOutClick}>Logout</button>
            </div>
          </>
        : <h1 className="text-3xl">Please Login or Register to view your name here.</h1>
        
      }
    </div>
  )
}

export default Home