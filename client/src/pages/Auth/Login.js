import React, { useState } from "react";
import Layoutt from "../../components/Layout/Layoutt";
import { toast } from 'react-toastify';
import axios from "axios"
import { useNavigate } from "react-router-dom";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";

const Login = () => {
   const[auth,setAuth]=useAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
  
    const navigate=useNavigate()
   //form func
    const handleSubmit=async(e)=>{
    e.preventDefault()
    console.log(email,password)
    
    try {
        const res=await axios.post('/api/v1/auth/login',
        {email,password}
    );
    if(res && res.data.success){
        toast.success(res.data.message)
    setAuth({
        ...auth,
user:res.data.user,
token:res.data.token
    })
    localStorage.setItem('auth', JSON.stringify(res.data))
        navigate("/")
    
    }
    
    else
    {
        toast.error(res.data.message)
    
    }
    } catch (error) {
        console.log(error)
        toast.success("Something went wrong!")
    }
    }
  return (
    <Layoutt title={"Login - BeautyStore"}>
      <div className="form-container">
      
      <form onSubmit={handleSubmit}>
      <h4 className="title">LOGIN FORM</h4>
      
      <div className="mb-3">
        <input
          type="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
  
          className="form-control"
          id="exampleInputEmail1"
          placeholder="Enter Your Email "
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
       
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Enter Your Password"
          required
        />
      </div>
     
     
      <button type="submit" className="btn btn-primary">
        LOGIN
      </button>
    </form>
      </div>
    </Layoutt>
  )
}

export default Login
