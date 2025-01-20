import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom';

const SpecialityMenu = () => {
    const { specialityData } = useContext(AppContext);
    const navigate = useNavigate();
    return (
        <div id='speciality' className='py-16 max-[500px]:py-14 flex flex-col justify-center items-center gap-3'>
            <div className='text-center'>
                <p className='text-3xl font-semibold mb-3 max-[332px]:text-[25px]'>Find by Speciality</p>
                <p className='text-sm'>Simply browse through our extensive list of trusted <br className='hidden md:block' />
                    doctors, schedule your appointment hassle-free.</p>
            </div>
            <div className="flex sm:gap-5 md:justify-center items-center text-center text-xs cursor-pointer w-full overflow-x-scroll scrollbar-hide py-5">
                {
                    specialityData.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className="w-[100px] sm:w-[90px] flex-shrink-0 text-center hover:-translate-y-2 duration-300"
                                onClick={() => {
                                    navigate(`/alldoctors/${item.speciality}`);
                                    scrollTo(0, 0);
                                }}
                            >
                                <img
                                    className="sm:w-full h-auto w-[80px] m-auto"
                                    src={item.image}
                                    alt=""
                                />
                                <p className="mt-2">{item.speciality}</p>
                            </div>
                        );
                    })
                }
            </div>

        </div>
    )
}

export default SpecialityMenu
