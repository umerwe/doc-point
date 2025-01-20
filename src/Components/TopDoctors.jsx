import React from 'react'
import { doctors } from '../assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom'
const TopDoctors = () => {
    let navigate = useNavigate()
    return (
        <div className='py-6 max-[500px]:py-1 flex flex-col justify-center items-center'>
            <p className='text-3xl font-semibold mb-3 max-[332px]:text-[25px]'>Top Doctors to Book</p>
            <p className='text-sm text-center'>Simply browse through our extensive list of trusted <br className='hidden md:block' />
                doctors.</p>
            {/* card */}
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-[30px] max-[540px]:grid-cols-1'>
                {doctors.slice(0, 8).map((item, index) => {
                    return (
                        <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0,0) }} key={index} className='border border-[#C9D8FF] rounded-xl overflow-hidden hover:translate-y-[-10px] transition-all duration-500 cursor-pointer max-[540px]:flex' >
                            <div className='bg-[#EAEFFF]'>
                                <img className='w-[220px] max-[540px]:w-[100px]' src={item.image} alt="" />
                            </div>
                            <div className='px-4 pt-3 pb-4'>
                                <div className='flex items-center gap-2 text-sm max-[540px]:text-[13px] text-center text-green-500'>
                                    <p className="w-2 h-2 rounded-full bg-green-500"></p>
                                    <p>Available</p>
                                </div>
                                <div>
                                    <p className='md:text-[18px] text-[#262626] font-semibold'>{item.name}</p>
                                    <p className='text-[#5C5C5C] text-[13px]'>{item.speciality}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <button onClick={() => { navigate('/alldoctors'); scrollTo(0, 0) }} className='bg-[#EAEFFF] text-gray-600 max-[500px]:text-sm px-12 py-3 max-[500px]:px-9 max-[500px]:py-2 rounded-full'>more</button>
        </div>
    )
}

export default TopDoctors
