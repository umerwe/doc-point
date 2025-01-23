import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        email: '',
        password: ''
      })
    
      function handleSubmit(e) {
        e.preventDefault();
    
        let { email, password } = user;
    
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            console.log('Signed up')
            const user = userCredential.user;
            console.log(user)
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('error')
            // ..
          });
    
      }
      function handleChange(e) {
        const { name, value } = e.target;
    
        setUser(prev => {
          return {
            ...prev, [name]: value
          }
        })
    
      }
  return (
    <div>
      <form className="min-h-[88vh] flex items-center" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3 m-auto items-start p-7 sm:p-8 w-[350px] sm:w-[380px] border rounded-xl text-[#5E5E5E] text-xs sm:text-sm shadow-lg">
          <p className="text-xl sm:text-2xl font-semibold">Create Account</p>
          <p>Please sign up to book appointment</p>
          <div className="w-full ">
            <p>Full Name</p>
            <input className="border border-[#DADADA] rounded w-full p-2 mt-1" type="text" />
          </div>
          <div className="w-full ">
            <p>Email</p>
            <input onChange={handleChange} className="border border-[#DADADA] rounded w-full p-2 mt-1" type="email" name='email' value={user.email} />
          </div>
          <div className="w-full ">
            <p>Password</p>
            <input onChange={handleChange} className="border border-[#DADADA] rounded w-full p-2 mt-1" type="password" name='password' value={user.password} />
          </div>
          <button className="bg-primary text-white w-full py-2 my-2 rounded-md text-sm sm:text-base">Create account</button>
          <p>Create an new account?
            <span onClick={()=> navigate('/login')} className="text-primary underline cursor-pointer ml-1">Login</span>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Register
