import React, { useEffect, useState } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slices/userSlice';
import { Eye, EyeOff } from 'lucide-react';
import Loader from '../Loader/Loader';
import Footer from '../Components/Footer';

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector(store => store.userSlice.user);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        const { email, uid, displayName } = authUser;
        localStorage.setItem('user', JSON.stringify({ email, uid, displayName }));
        dispatch(login({ email, uid, displayName }));
      } else {
        localStorage.removeItem('user');
        dispatch(login({}));
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    if (user?.email) navigate('/');
  }, [user, navigate]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

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
    <div className='mx-[8%]'>
      {user.email ? (
        <Loader />
      ) : (
        <form className="min-h-[83vh] lg:min-h-[86vh] flex items-center" onSubmit={handleSubmit}>
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
            <div className="w-full relative">
              <p>Password</p>
              <input
                onChange={handleChange}
                className="border border-[#DADADA] rounded w-full p-2 mt-1 pr-10"
                type={showPassword ? "text" : "password"}
                name="password"
                value={credentials.password}
                disabled={loading}
                required
              />
              <button
                type="button"
                className="absolute right-2 top-[70%] translate-y-[-50%] text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
            <button className="bg-primary text-white w-full py-2 my-2 rounded-md text-sm sm:text-base flex items-center justify-center disabled:opacity-50" disabled={loading}>
              {loading ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin opacity-75"></span> : 'Login'}
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
