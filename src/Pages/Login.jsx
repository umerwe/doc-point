import React, { useEffect, useState } from 'react'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../store/slices/loginSlice';

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector(store => store.LoginSlice.user);
  console.log(user);

  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        console.log('logged in');

        const { email, uid } = authUser;
        dispatch(login({ email, uid }))
      } else {
        console.log('user is logged out');
        dispatch(login({})) // Reset user info on logout
      }
    });
  }, [auth]);

  function handleChange(e) {
    const { name, value } = e.target;

    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  }


  function handleSubmit(e) {
    e.preventDefault();

    let { email, password } = credentials;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log('Logged In')
        window.notify("Login successfully!", "success");
        // ...
      })
      .catch(() => {
        window.notify("Something went wrong", "error");
      });
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setCredentials(prev => {
      return {
        ...prev, [name]: value
      }
    })
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(login({}))
        window.notify("Logout successfully!", "success");
      })
      .catch(error => {
        console.error(error)
        window.notify("SomeThing went wrong!", "error");
      })
  };

  return (
    <div>
      {
        user.email ?
          <div>
            <p>Loading ....</p>
            <p>Email - {user.email}</p>
            <p>UID - {user.uid}</p>
            <button
              onClick={handleSignOut}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Sign Out
            </button>
          </div>
          :
          <form className="min-h-[88vh] flex items-center" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3 m-auto items-start p-7 sm:p-8 w-[350px] sm:w-[380px] border rounded-xl text-[#5E5E5E] text-xs sm:text-sm shadow-lg">
              <p className="text-xl sm:text-2xl font-semibold">Login</p>
              <p>Please log in to book appointment</p>
              <div className="w-full ">
                <p>Email</p>
                <input onChange={handleChange} className="border border-[#DADADA] rounded w-full p-2 mt-1" type="email" name='email' value={credentials.email} />
              </div>
              <div className="w-full ">
                <p>Password</p>
                <input onChange={handleChange} className="border border-[#DADADA] rounded w-full p-2 mt-1" type="password" name='password' value={credentials.password} />
              </div>
              <button className="bg-primary text-white w-full py-2 my-2 rounded-md text-sm sm:text-base">Create account</button>
              <p>Create an new account?
                <span onClick={() => navigate('/register')} className="text-primary underline cursor-pointer ml-1">Register</span>
              </p>
            </div>
          </form>
      }
    </div>
  )
}

export default Login
