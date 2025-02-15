import React, { useEffect } from 'react'
import { assets } from '../assets/assets_frontend/assets'
import Footer from '../Components/Footer'


const About = () => {
  return (
    <div className='mx-[8%]'>
      <div className="text-center text-2xl pt-14 text-[#707070]"><p>ABOUT <span className="text-gray-700 font-semibold">US</span></p></div>
      <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-8">
        <div className='w-[80%] sm:w-[60%] md:w-[40%] lg:w-[37%] 2xl:w-[20%] flex items-center justify-center'>
        <img className="w-full rounded-full" src={assets.about_image} alt="" />
        </div>
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p>Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
          <p>Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.</p>
          <b className="text-gray-800">Our Vision</b><p>Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
        </div>
      </div>
      <div className="text-xl mt-8 mb-4">
        <p>WHY
          <span className="text-gray-700 font-semibold ml-1.5">CHOOSE US</span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>EFFICIENCY:</b>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>CONVENIENCE: </b>
          <p>Access to a network of trusted healthcare professionals in your area.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>PERSONALIZATION:</b>
          <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default About
