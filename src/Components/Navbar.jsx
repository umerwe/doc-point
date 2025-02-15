import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';  // Import useLocation
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { addAppointment, login, register, removeAppointments, updateProfileData, allDoctors } from '../store/slices/userSlice';
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let user = useSelector(store => store.userSlice.user);
  let profileDataFromRedux = useSelector(store => store.userSlice.profileData);
  let { profilePic: profileImg } = profileDataFromRedux;
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const defaultProfilePic =
    'data:image/png;base64,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';

  const [profilePic, setProfilePic] = useState(defaultProfilePic);

  // Function to handle click on links
  const handleClick = (link) => {
    if (link === 'img') {
      navigate('/');
    }
    setIsOpen(false);
  };

  // Get the active class based on current location
  const getActiveClass = (link) => {
    if (link === '/') {
      return location.pathname === '/' 
        ? 'bg-primary text-white lg:bg-transparent rounded-md px-6 py-2 lg:p-0 lg:text-primary'
        : '';
    }
    return location.pathname.startsWith(link) 
      ? 'bg-primary text-white lg:bg-transparent rounded-md px-6 py-2 lg:p-0 lg:text-primary'
      : '';
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Clear user state by setting it to null so that dependent queries won't run with an undefined UID
        dispatch(login(null));
        dispatch(register(null));
        dispatch(updateProfileData({ number: 'Empty', address: 'Empty', gender: 'Not Selected', birthDay: 'Not Selected' }));
        dispatch(addAppointment([]));
        dispatch(removeAppointments([]));
        localStorage.clear();
        window.notify("Logout successfully!", "success");
        navigate('/login');
      })
      .catch(error => {
        window.notify("Something went wrong!", error);
      });
  };

  useEffect(() => {
    const doctorsRef = collection(db, "doctors");

    // Real-time listener for doctors collection
    const unsubscribe = onSnapshot(doctorsRef, (snapshot) => {
      const doctorList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(allDoctors(doctorList));
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [dispatch]);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (user?.uid) {
        try {
          const docRef = doc(db, 'userForm', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            dispatch(updateProfileData(data));
            if (data.profilePic) {
              setProfilePic(data.profilePic);
            } else {
              setProfilePic(defaultProfilePic);
            }
          } else {
            dispatch(updateProfileData(profileDataFromRedux));
          }
        } catch (error) {
          window.notify(error.message || 'Something went wrong', 'error');
        }
      }
    };
    fetchProfileData();
  }, [user, dispatch, profileDataFromRedux]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div>
      <nav className='font-outfit font-medium flex justify-between items-center py-4 px-4 md:px-6 shadow-md bg-white mx-0 sm:mx-[8%]'>
        {/* Logo */}
        <div onClick={() => navigate('/')} className='flex items-center gap-1 cursor-pointer'>
          <img className='w-10 pt-1 lg:pt-0' src='/images/decktopus.svg' alt="" />
          <h1 className='text-xl font-bold text-blue-900 pt-1.5 lg:pt-0'>DocPoint</h1>
        </div>
        <div className={`lg:hidden mt-3 ${user?.email ? 'hidden' : ''}`}>
          <button
            className='text-3xl text-primary'
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
        <ul
          className={`flex lg:flex flex-col lg:flex-row gap-[17px] lg:gap-5 items-center text-[16px] lg:text-[13px] bg-white z-10
           ${isOpen ? 'block' : 'hidden'} absolute lg:static lg:w-auto top-[85px] py-8 lg:py-0 ${user?.email ? 'h-screen lg:h-auto' : 'pb-20'} lg:pb-0 left-0 w-[100%] text-center`}
        >
          <NavLink to={'/'}>
            <li
              className={`lg:py-[1px] cursor-pointer ${getActiveClass('/')}`}
              onClick={handleClick}
            >
              HOME
            </li>
            <hr className={`border-none lg:bg-primary w-[30px] lg:w-3/5 h-0.5 mx-auto ${getActiveClass('/') ? 'block' : 'hidden'}`} />
          </NavLink>
          <NavLink to={'/alldoctors'}>
            <li
              className={`lg:py-[1px] cursor-pointer ${getActiveClass('/alldoctors')}`}
              onClick={handleClick}
            >
              ALL DOCTORS
            </li>
            <hr className={`border-none lg:bg-primary w-[60px] lg:w-3/5 h-0.5 mx-auto ${getActiveClass('/alldoctors') ? 'block' : 'hidden'}`} />
          </NavLink>
          <NavLink to={'/about'}>
            <li
              className={`lg:py-[1px] cursor-pointer ${getActiveClass('/about')}`}
              onClick={handleClick}
            >
              ABOUT
            </li>
            <hr className={`border-none lg:bg-primary w-[30px] lg:w-3/5 h-0.5 mx-auto ${getActiveClass('/about') ? 'block' : 'hidden'}`} />
          </NavLink>
          <NavLink to={'/contact'}>
            <li
              className={`lg:py-[1px] cursor-pointer ${getActiveClass('/contact')}`}
              onClick={handleClick}
            >
              CONTACT
            </li>
            <hr className={`border-none lg:bg-primary w-[30px] lg:w-3/5 h-0.5 mx-auto ${getActiveClass('/contact') ? 'block' : 'hidden'}`} />
          </NavLink>
        </ul>
        <div
          className={`${isOpen ? 'block' : 'hidden'} bg-white pb-[200%] lg:p-0 absolute lg:static top-[310px] left-0 w-[100%] text-center lg:w-auto z-10 ${user?.email ? 'hidden' : 'lg:block'}`}
        >
          <NavLink to={'/login'}>
            <button
              className='bg-primary text-white text-[.9rem] font-normal rounded-full px-8 py-3 lg:px-6 lg:py-2'
              onClick={() => handleClick('/login')}
            >
              Login/Register
            </button>
          </NavLink>
        </div>
        <div className={`items-center justify-center gap-4 ${user?.email ? 'flex' : 'hidden'}`}>
          <div className="lg:hidden mt-3">
            <button
              className="text-3xl text-primary"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <HiX /> : <HiMenuAlt3 />}
            </button>
          </div>
          {/* Profile dropdown */}
          <div
            ref={dropdownRef}
            className={`${user?.email ? 'block ml-[2%]' : 'hidden'} flex items-center gap-2 cursor-pointer relative mt-1.5`}
          >
            <div onClick={() => setProfileDropdown(!profileDropdown)}>
              <img
                className={`w-9 h-9 rounded-full object-cover bg-[#EFEBFF] ${profileImg ? 'border-[2px] border-primary shadow-[0_0_7px_#3b82f6]' : ''}`}
                src={profileImg ? profileImg : defaultProfilePic}
                alt="Profile"
              />
            </div>
            {profileDropdown && (
              <div className="absolute top-14 right-0 text-base font-medium text-gray-600 z-20">
                <div className="min-w-48 bg-gray-50 rounded flex flex-col gap-4 p-4">
                  <NavLink to="my-profile" onClick={() => setProfileDropdown(false)}>
                    <p className="hover:text-black cursor-pointer">My Profile</p>
                  </NavLink>
                  <NavLink to="my-appointments" onClick={() => setProfileDropdown(false)}>
                    <p className="hover:text-black cursor-pointer">My Appointments</p>
                  </NavLink>
                  <p
                    onClick={() => {
                      handleSignOut();
                      setProfileDropdown(false);
                    }}
                    className="hover:text-black cursor-pointer"
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
