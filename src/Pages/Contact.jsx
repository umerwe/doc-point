import Reactv from 'react'
import { assets } from '../assets/assets_frontend/assets'
import Footer from '../Components/Footer'
const Contact = () => {
  return (
    <div className='mx-[8%]'>
      <div className="text-center text-2xl pt-14 text-[#707070]">
        <p>CONTACT
          <span className="text-gray-700 font-semibold ml-1.5">US</span>
        </p>
        <div className="md:ml-20 mt-10 flex flex-col justify-center md:flex-row gap-10 lg:gap-0 text-sm text-left">
          <div className='w-[80%] sm:w-[60%] md:w-[40%] lg:w-[36%] 2xl:w-[30%] m-auto'>
            <img className="w-full rounded-full" src={assets.contact_image} alt="" />
          </div>
          <div className="flex flex-col justify-center items-start gap-6 md:w-[45%] 2xl:w-[40%] md:mr-20">
            <p className=" font-semibold text-lg text-gray-600">OUR OFFICE</p>
            <p className=" text-gray-500">00000 Willms Station <br />
              Suite 000, Washington, USA</p>
            <p className=" text-gray-500">Tel: (000) 000-0000 <br />
              Email: tubey3976@gmail.com</p>
            <p className=" font-semibold text-lg text-gray-600">CAREERS AT PRESCRIPTO</p>
            <p className=" text-gray-500">Learn more about our teams and job openings.</p>
            <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">Explore Jobs</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Contact
