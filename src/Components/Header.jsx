import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { IoIosArrowRoundForward } from "react-icons/io";

const header = () => {
    const ScrollButton = () => {
        const element = document.getElementById('speciality');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' }); // Smooth scrolling effect
        }
    }
    return (
        <div className='bg-primary flex flex-col-reverse lg:flex-row lg:justify-between lg:gap-5 rounded-lg text-white lg:px-[75px] xl:pt-[120px] lg:pt-[90px] my-6 min-[1281px]:pt-[60px]'>
            <div className='pb-14 flex flex-col justify-center items-center lg:block min-[1370px]:w-[600px] min-[1370px]:pt-[100px] min-[1370px]:pl-[30px] max-[1370px]:pt-[60px] max-[1280px]:pt-[10px]'>
                <div>
                    <p className='max-[400px]:text-[25px] max-[568px]:text-[32px] min-[568px]:text-[36px] min-[1000px]:text-[33px] min-[1100px]:text-[40px] min-[1280px]:text-[46px] font-bold leading-[1.3] text-center lg:text-left text-3xl'>
                        Book Appointment <br />
                        <span>With Trusted <br className='max-[1100px]:hidden max-[1370px]:block' /> Doctors</span>
                    </p>
                </div>
                <div className='flex flex-col items-center gap-2 max-[400px]:gap-0 lg:flex lg:items-start lg:flex-row lg:gap-4 py-4 text-sm'>
                    <img className='max-[400px]:w-[90px] w-22 h-10' src={assets.group_profiles} alt="" />
                    <p className='min-[1024px]:text-xs max-[1024px]:text-base max-[420px]:text-sm max-[400px]:px-2 max-[400px]:mt-2 max-[500px]:mx-5 text-center lg:text-left xl:text-[15px] xl:leading-5'>Simply browse through our extensive list of <br className='hidden min-[490px]:block' />
                        trusted doctors, <br className='hidden xl:block' />
                        schedule your appointment hassle-free.</p>
                </div>
                <div>
                    <button className='flex items-center gap-1 bg-white text-[#565656] px-7 py-2 max-[1100px]:px-6 rounded-full 
                    text-sm max-[400px]:px-6 max-[400px]:text-xs max-[400px]:mt-2 
                    hover:scale-105 transition-all duration-300'
                        onClick={ScrollButton}
                    >Book Appointment
                        <span className='text-2xl mt-[3px]'><IoIosArrowRoundForward /></span>
                    </button>
                </div>
            </div>
            <div className="w-[500px] max-[1040px]:w-[350px] max-[1370px]:w-[400px]  relative m-auto lg:m-0 mt-4 mb-4 lg:mt-0 max-[500px]:w-[270px] max-[361px]:w-[250px]">
                <img className=' w-full static lg:absolute lg:bottom-0 lg:h-auto rounded-lg' src={assets.header_img} alt="" />
            </div>
        </div>
    )
}

export default header
