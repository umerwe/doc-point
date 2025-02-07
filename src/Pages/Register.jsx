import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../store/slices/LoginSlice';
import Loader from '../Loader/Loader';
import { updateProfile } from "firebase/auth";

const Register = () => {
  const navigate = useNavigate()
  const user = useSelector(store => store.LoginSlice.user);
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState({
    fullName: '',
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        console.log(authUser)
        const { email, uid, displayName } = authUser;
        dispatch(register({ email, uid, displayName }))
        localStorage.setItem('register', JSON.stringify({ email, uid, displayName }))
      } else {
        localStorage.removeItem('register')
        dispatch(register({}))
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { fullName, email, password } = credentials;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update user's displayName
      await updateProfile(user, { displayName: fullName });
      const name = user.displayName;

      window.notify(`Welcome ${name}`, "success");

      setCredentials({ email: '', password: '', fullName: '' });
    } catch (error) {
      window.notify(error.message || "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };


  function handleChange(e) {
    const { name, value } = e.target;

    setCredentials(prev => {
      return {
        ...prev, [name]: value
      }
    })

  }
  useEffect(() => {
    if (user.email) navigate('/');
  }, [user, navigate]);

  return (
    <div>
      {
        user.email ?
          <Loader /> :
          <form className="min-h-[88vh] flex items-center" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3 m-auto items-start p-7 sm:p-8 w-[350px] sm:w-[380px] border rounded-xl text-[#5E5E5E] text-xs sm:text-sm shadow-lg">
              <p className="text-xl sm:text-2xl font-semibold">Create Account</p>
              <p>Please sign up to book appointment</p>
              <div className="w-full ">
                <p>Full Name</p>
                <input onChange={handleChange} className="border border-[#DADADA] rounded w-full p-2 mt-1" type="text" name='fullName' value={credentials.fullName} required />
              </div>
              <div className="w-full ">
                <p>Email</p>
                <input onChange={handleChange} className="border border-[#DADADA] rounded w-full p-2 mt-1" type="email" name='email' value={credentials.email} required />
              </div>
              <div className="w-full ">
                <p>Password</p>
                <input onChange={handleChange} className="border border-[#DADADA] rounded w-full p-2 mt-1" type="password" name='password' value={credentials.password} required />
              </div>
              <button
                className="bg-primary text-white w-full py-2 my-2 rounded-md text-sm sm:text-base flex items-center justify-center"
                disabled={loading}
              >
                {loading ? <span className="animate-pulse">Registering ...</span> : 'Register'}
              </button>
              <p>Create an new account?
                <span onClick={() => navigate('/login')} className="text-primary underline cursor-pointer ml-1">Login</span>
              </p>
            </div>
          </form>
      }
      <Footer />
    </div>
  )
}

export default Register
