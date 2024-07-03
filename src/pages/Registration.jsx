import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdEyeOff, IoMdEye  } from "react-icons/io";

const Registration = () => {
  const [passShow, setPassShow] = useState(false)
  const [user , setUser] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [userErr, setUserErr] = useState({
    nameErr: '',
    emailErr: '',
    passwordErr: ''
  })
  const handelSubmit = ()=>{
    const re  = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if(!user.name){
      setUserErr({...userErr, nameErr: "Name is required!"})
    }
    else if(!user.email){
      setUserErr({...userErr, emailErr: "Email is required!"})
    }
    else if(!user.password){
      setUserErr({...userErr, passwordErr: "Password is required!"})
    }
    // else if(!re.test(user.password)){
    //   setUserErr({...userErr, passwordErr: "Please enter a strong password!"})
    // }
    else{
      console.log("Success", user);
    }
   
 }
  return (
    <section className="h-screen flex items-center justify-center">
      <div className="form-container">
        <p className="title">Get started with easily register</p>
        <div className="form">
          <input onChange={(e)=> {
            setUser({...user, name: e.target.value});
            setUserErr('')
          }} type="text" className="input" placeholder="Full Name" />
           {
            userErr.nameErr &&
            <p className="text-red-500">{userErr.nameErr}</p>
           }
          <input onChange={(e)=> {setUser({...user, email: e.target.value}); setUserErr('')}}  type="email" className="input" placeholder="Email" />
          {
            userErr.emailErr &&
            <p className="text-red-500">{userErr.emailErr}</p>
           }
          <div className="relative">
            <input onChange={(e)=> {setUser({...user, password: e.target.value}); setUserErr('')}} type={passShow ? "text" : "password"} className="input w-full" placeholder="Password" />
           {
            passShow
            ?
            <IoMdEye onClick={()=>setPassShow(false)} className="absolute top-1/2 right-5 -translate-y-1/2 text-2xl cursor-pointer"/>
            :
            <IoMdEyeOff onClick={()=>setPassShow(true)} className="absolute top-1/2 right-5 -translate-y-1/2 text-2xl cursor-pointer"/>
           }
          </div>
          {
            userErr.passwordErr &&
            <p className="text-red-500">{userErr.passwordErr}</p>
           }
          <button onClick={handelSubmit} className="form-btn">Registration</button>
        </div>
        <p className="sign-up-label">
          Already have an account?
          <Link to="/login" className="sign-up-link pl-2">
            Sign In
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Registration;
