import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { auth } from '../config/firebase';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../store/slices/userSlice';
import Loader from '../Loader/Loader';
import { Eye, EyeOff } from 'lucide-react'; // Import eye icons

const Register = () => {
  const navigate = useNavigate();
  const user = useSelector(store => store.userSlice.user);
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Force a reload to ensure the profile is updated
        await currentUser.reload();
        const updatedUser = auth.currentUser;
        dispatch(register({
          email: updatedUser.email,
          uid: updatedUser.uid,
          displayName: updatedUser.displayName,
        }));
        localStorage.setItem('register', JSON.stringify({
          email: updatedUser.email,
          uid: updatedUser.uid,
          displayName: updatedUser.displayName,
        }));
      }
    });
    return () => unsubscribe();
  }, [dispatch]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { fullName, email, password } = credentials;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update user's displayName
      await updateProfile(user, { displayName: fullName });

      window.notify(`Welcome ${fullName}`, "success");

      setCredentials({ email: '', password: '', fullName: '' });
    } catch (error) {
      window.notify(error.message || "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (user.email) navigate('/');
  }, [user, navigate]);

  return (
    <div className='mx-[8%]'>
      {user.email ? (
        <Loader />
      ) : (
        <form className="min-h-[88vh] flex items-center" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3 m-auto items-start p-7 sm:p-8 w-[350px] sm:w-[380px] border rounded-xl text-[#5E5E5E] text-xs sm:text-sm shadow-lg">
            <p className="text-xl sm:text-2xl font-semibold">Create Account</p>
            <p>Please sign up to book an appointment</p>

            <div className="w-full">
              <p>Full Name</p>
              <input
                onChange={handleChange}
                className="border border-[#DADADA] rounded w-full p-2 mt-1"
                type="text"
                name="fullName"
                value={credentials.fullName}
                required
              />
            </div>

            <div className="w-full">
              <p>Email</p>
              <input
                onChange={handleChange}
                className="border border-[#DADADA] rounded w-full p-2 mt-1"
                type="email"
                name="email"
                value={credentials.email}
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
              {loading ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin opacity-75"></span> : 'Register'}
            </button>
            <p>
              Already have an account?
              <span onClick={() => navigate('/login')} className="text-primary underline cursor-pointer ml-1">
                Login
              </span>
            </p>
          </div>
        </form>
      )}
      <Footer />
    </div>
  );
};

export default Register;
