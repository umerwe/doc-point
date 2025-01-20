import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets_frontend/assets';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';  // Import useLocation
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Use useLocation to access the current route

  const navigate = useNavigate();

  // Function to handle click
  const handleClick = (link) => {
    if (link === 'img') {
      navigate('/');
    }
    setIsOpen(false);
  };

  // Get the active class based on current location
  const getActiveClass = (link) => {
    if (link === '/') {
      return location.pathname === '/' ? 'bg-primary text-white lg:bg-transparent rounded-md px-6 py-2 lg:p-0 lg:text-primary' : '';
    }
    return location.pathname.startsWith(link) ? 'bg-primary text-white lg:bg-transparent rounded-md px-6 py-2 lg:p-0 lg:text-primary' : '';
  };

  return (
    <div>
      <nav className='font-outfit font-medium flex justify-between items-center py-4 px-4 md:px-6 shadow-md bg-white'>
        {/* Logo */}    
        <div>
          <img
            onClick={() => handleClick('img')}
            className='max-[400px]:w-[150px] w-[160px] cursor-pointer'
            src={assets.logo}
            alt="Logo"
          />
        </div>
        <div className="lg:hidden mt-3">
          <button
            className='text-3xl text-primary'
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
        <ul
          className={`flex lg:flex flex-col lg:flex-row gap-[17px] lg:gap-5 items-center text-[16px] lg:text-[13px] bg-white z-10
         ${isOpen ? 'block' : 'hidden'} absolute lg:static lg:w-auto top-[85px] py-6 lg:py-0 left-0 w-[100%] text-center`}
        >
          <NavLink to={'/'}>
            <li
              className={`lg:py-[1px] cursor-pointer ${getActiveClass('/')}`}
              onClick={handleClick}
            >
              HOME
            </li>
            <hr
              className={`border-none lg:bg-primary w-[30px] lg:w-3/5 h-0.5 mx-auto ${getActiveClass('/') ? 'block' : 'hidden'
                }`}
            />
          </NavLink>
          <NavLink to={'/alldoctors'}>
            <li
              className={`lg:py-[1px] cursor-pointer ${getActiveClass('/alldoctors')}`}
              onClick={handleClick}
            >
              ALL DOCTORS
            </li>
            <hr
              className={`border-none lg:bg-primary w-[60px] lg:w-3/5 h-0.5 mx-auto ${getActiveClass('/alldoctors') ? 'block' : 'hidden'
                }`}
            />
          </NavLink>
          <NavLink to={'/about'}>
            <li
              className={`lg:py-[1px] cursor-pointer ${getActiveClass('/about')}`}
              onClick={handleClick}
            >
              ABOUT
            </li>
            <hr
              className={`border-none lg:bg-primary w-[30px] lg:w-3/5 h-0.5 mx-auto ${getActiveClass('/about') ? 'block' : 'hidden'
                }`}
            />
          </NavLink>
          <NavLink to={'/contact'}>
            <li
              className={`lg:py-[1px] cursor-pointer ${getActiveClass('/contact')}`}
              onClick={handleClick}
            >
              CONTACT
            </li>
            <hr
              className={`border-none lg:bg-primary w-[30px] lg:w-3/5 h-0.5 mx-auto ${getActiveClass('/contact') ? 'block' : 'hidden'
                }`}
            />
          </NavLink>
          <NavLink to={'/admin'}>
            <li className='border-[1px] py-1 text-sm rounded-full mt-[2px] w-[110px] m-auto'>
              <button
                href="#"
                target='blank'
                onClick={() => handleClick('/admin')}
              >
                Admin Panel
              </button>
            </li>
          </NavLink>
        </ul>
        <div
          className={`lg:block ${isOpen ? 'block' : 'hidden'} bg-white pt-8 pb-[200%] lg:p-0 absolute lg:static top-[325px] left-0 w-[100%] text-center lg:w-auto z-10`}
        >
          <NavLink to={'/login'}>
            <button
              className='bg-primary text-white text-[.9rem] font-normal rounded-full px-8 py-3 lg:px-6 lg:py-2'
              onClick={() => handleClick('/login')}
            >
              Create account
            </button>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
