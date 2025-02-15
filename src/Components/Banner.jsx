import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Banner = () => {
    const user = useSelector(store => store.userSlice.user)
    return (
        <div className='mt-[60px] bg-primary text-white flex justify-center md:justify-between px-[80px] max-[740px]:px-0 rounded-lg '>
            <div className='px-8 py-[20px] lg:py-[60px] xl:py-[90px] xl:w-[500px] text-lg sm:text-2xl md:text-[23px] lg:text-4xl xl:text-5xl font-bold text-white flex flex-col lg:gap-2 max-[438px]:px-0 text-center md:text-left'>
                <p>
                    Book Appointment
                </p>
                <span className='mt-3'>With 100+ Trusted
                    <br />Doctors</span>
                <NavLink to={user.email ? '/alldoctors' : '/login'} onClick={() => scrollTo(0, 0)} className='text-center md:text-start'>
                    <button className='bg-white text-xs lg:text-sm font-semibold lg:font-normal text-[#595959] px-6 py-2 lg:px-8 lg:py-3 rounded-full mt-6 hover:scale-105 transition-all '>
                        {
                            user.email ?
                                'All Doctors' :
                                'Create account'
                        }
                    </button>
                </NavLink>
            </div>
            <div className='w-[200px] lg:w-[300px] xl:w-[350px] md:flex md:justify-end relative hidden'>
                <img className='w-full absolute bottom-0 right-10 lg:right-0' src={assets.appointment_img} alt="" />
            </div>
        </div>
    )
}

export default Banner
