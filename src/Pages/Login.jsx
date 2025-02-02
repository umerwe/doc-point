import React, { useEffect, useState } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slices/LoginSlice';
import Loader from '../Loader/Loader';
import Footer from '../Components/Footer';

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector(store => store.LoginSlice.user);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  // Track user authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        const { email, uid } = authUser;
        localStorage.setItem('user', JSON.stringify({ email, uid })); // Add this
        dispatch(login({ email, uid }));
      } else {
        localStorage.removeItem('user'); // Add this
        dispatch(login({}));
      }
    });
    return () => unsubscribe();
  }, [dispatch]);


  // Redirect if user is already logged in
  useEffect(() => {
    if (user?.email) navigate('/');
  }, [user, navigate]);

  // Handle input changes
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Handle login submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { email, password } = credentials;
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      const name = userCredential.user.displayName;
      window.notify(`Welcome ${name}`, "success");
      setCredentials({ email: '', password: '' });
    } catch (error) {
      window.notify(error.message || "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {user.email ? (
        <Loader />
      ) : (
        <form className="min-h-[88vh] flex items-center" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3 m-auto items-start p-7 sm:p-8 w-[350px] sm:w-[380px] border rounded-xl text-[#5E5E5E] text-xs sm:text-sm shadow-lg">
            <p className="text-xl sm:text-2xl font-semibold">Login</p>
            <p>Please log in to book an appointment</p>
            <div className="w-full">
              <p>Email</p>
              <input
                onChange={handleChange}
                className="border border-[#DADADA] rounded w-full p-2 mt-1"
                type="email"
                name="email"
                value={credentials.email}
                disabled={loading}
                required
              />
            </div>
            <div className="w-full">
              <p>Password</p>
              <input
                onChange={handleChange}
                className="border border-[#DADADA] rounded w-full p-2 mt-1"
                type="password"
                name="password"
                value={credentials.password}
                disabled={loading}
                required
              />
            </div>
            <button
              className="bg-primary text-white w-full py-2 my-2 rounded-md text-sm sm:text-base flex items-center justify-center"
              disabled={loading}
            >
              {loading ? <span className="animate-pulse">Logging In...</span> : 'Login'}
            </button>
            <p>
              Create a new account?
              <span onClick={() => navigate('/register')} className="text-primary underline cursor-pointer ml-1">
                Register
              </span>
            </p>
          </div>
        </form>
      )}
      <Footer />
    </div>
  );
};

export default Login;
