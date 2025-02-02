import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { doctors,specialityData } from '../assets/assets_frontend/assets';
import Footer from '../Components/Footer';

const AllDoctors = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filterDoc, setFilterDoc] = useState([]);
  const { speciality } = useParams();
  const navigate = useNavigate();
  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    }
    else {
      setFilterDoc(doctors)
    }
  }
  useEffect(() => {
    applyFilter();
  }, [doctors, speciality])

  return (
    <div className='text-gray-500'>
      <p className='font-medium py-5'>Browse through the doctors specialist.</p>
      <button onClick={() => setIsOpen(!isOpen)} className={`py-1 px-3 border rounded text-sm  transition-all lg:hidden mb-3 text-black ${isOpen ? 'bg-primary text-white ' : ''}`}>Filters</button>
      <div className='flex gap-5 '>
        <div className={`lg:flex lg:flex-col lg:static absolute top-10px bg-white w-[82%] sm:w-[400px] lg:gap-5 lg:w-[210px] ${isOpen ? 'block' : 'hidden'}`}>
          {specialityData.map((item, index) => {
            return (
              <p key={index} onClick={() => {
                speciality === `${item.speciality}`
                  ? navigate('/alldoctors')
                  : navigate(`/alldoctors/${item.speciality}`);
                setIsOpen(!open);
              }}
               className={`text-[13px] font-medium border border-gray-300 rounded py-1.5 text-left pl-4 pr-16 cursor-pointer duration-75 mb-3 lg:mb-0 ${speciality === item.speciality ? 'bg-[#EAEFFF] text-black' : ' text-gray-500'}`}>{item.speciality}</p>
            )
          })}
        </div>
        <div className={`grid max-[470px]:grid-cols-1 min-[720px]:grid-cols-3 gap-5 m-auto lg:m-0 max-[720px]:grid-cols-2 ${isOpen ? 'max-[1024px]:mt-[290px]' : 'max-[1024px]:mt-[20px]'}`}>
          {filterDoc.map((item, index) => {
            return (
              <div key={index} onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} className='border border-[#C9D8FF] rounded-xl overflow-hidden hover:translate-y-[-10px] transition-all duration-500 cursor-pointer' >
                <div className='bg-[#EAEFFF]'>
                  <img className='w-[255px]' src={item.image} alt="" />
                </div>
                <div className='px-4 pt-3 pb-4'>
                  <div className='flex items-center gap-2 text-sm max-[540px]:text-[13px] text-center text-green-500'>
                    <p className="w-2 h-2 rounded-full bg-green-500"></p>
                    <p>Available</p>
                  </div>
                  <div>
                    <p className='lg:text-[17px] xl:text-[18px] text-[#262626] font-semibold'>{item.name}</p>
                    <p className='text-[#5C5C5C] text-[13px]'>{item.speciality}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AllDoctors
