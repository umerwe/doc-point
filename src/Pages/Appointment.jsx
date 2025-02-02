import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../Loader/Loader';
import { assets,doctors } from '../assets/assets_frontend/assets';
import Footer from '../Components/Footer';

const Appointment = () => {
    const navigate = useNavigate()
    const { docId } = useParams();
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const [docInfo, setDocInfo] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [docSlots, setDocSlots] = useState([]);
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState({}); // Track selected times per day

    const [relatedDoc, setRelatedDoc] = useState([])

    function handleTimeClick(time) {
        setSlotTime({
            [slotIndex]: time
        })
    }
    // Update the selected time for the currently active day
    function fetchDocInfo() {
        const result = doctors.find(doc => doc._id === docId)
        setDocInfo(result)
    }
    function RelatedDoctors() {
        const filteredOutput = doctors.filter(
            item => item._id !== docId && item.speciality === docInfo.speciality
        );
        setRelatedDoc(filteredOutput);
    }


    function getAppoinmentTime() {
        setDocSlots([]);

        const today = new Date();

        for (let i = 0; i < 7; i++) {
            let currentDate = new Date();
            currentDate.setDate(today.getDate() + i);

            let endTime = new Date();
            endTime.setDate(today.getDate() + i);
            endTime.setHours(20, 0, 0, 0)

            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 12 ? currentDate.getHours() : 12)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            }
            else {
                currentDate.setHours(12);
                currentDate.setMinutes(0);
            }
            let timeSlot = []
            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                timeSlot.push({
                    dateTime: new Date(currentDate),
                    time: formattedTime
                })
                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }
            setDocSlots(prev => ([...prev, timeSlot]))
        }
    }


    useEffect(() => {
        fetchDocInfo()
        setIsLoading(false);
    }, [docId, doctors])

    useEffect(() => {
        getAppoinmentTime()
    }, [docInfo])

    useEffect(() => {
        if (docInfo && docInfo.speciality) {
            RelatedDoctors();
        }
    }, [doctors, docInfo]);


    return (
        <div className=' mt-6'>
            {
                isLoading ?
                    <Loader />
                    :
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div>
                            <img className="bg-primary w-full sm:max-w-60 lg:max-w-72 rounded-lg" src={docInfo.image} alt="" />
                        </div>
                        <div className="flex-1 border border-[#ADADAD] rounded-lg px-4 min-[1024px]:p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-70px] sm:mt-0">
                            <p className="flex items-center gap-2 text-2xl lg:text-3xl font-medium text-gray-700">{docInfo.name}
                                <img className="w-5" src={assets.verified_icon} alt="" />
                            </p>
                            <div className="max-[1024px]:text-sm  flex items-center gap-2 mt-1 text-gray-600">
                                <p>{docInfo.degree} - {docInfo.speciality}</p>
                                <button className="py-0.5 px-2 border text-xs rounded-full">{docInfo.experience}</button>
                            </div>
                            <div>
                                <p className="flex items-center gap-1 text-sm font-medium text-[#262626] mt-3">About
                                    <img className="w-3" src={assets.info_icon} alt="" />
                                </p>
                                <p className="text-xs min-[1024px]:text-sm text-gray-600 max-w-[700px] mt-1">{docInfo.about}</p>
                            </div>
                            <p className="text-gray-600 font-semibold mt-4 max-[1024px]:text-sm">Appointment fee:
                                <span className="text-gray-800 font-bold"> ${docInfo.fees}</span>
                            </p>
                        </div>
                    </div>
            }

            {/* ----------- Booking Slots ----------- */}

            <div className='lg:ml-72 sm:pl-4 mt-4 font-medium text-[#565656]'>
                <p>Booking Slots</p>
                <div className='flex gap-3 items-center w-full overflow-x-scroll scrollbar-hide mt-4 '>
                    {
                        docSlots.map((item, index) => {
                            return (
                                <div onClick={() => setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer border ${slotIndex === index ? 'bg-primary text-white' : ''}`} key={index}>
                                    <p>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
                                    <p>{item[0] && item[0].dateTime.getDate()}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="flex items-center min-[690px]:flex-wrap gap-3 w-full overflow-x-scroll scrollbar-hide mt-4">
                    {docSlots[slotIndex]?.map((item, index) => (
                        <p
                            key={index}
                            onClick={() => {
                                handleTimeClick(item.time);
                                setTimeIndex(index);
                            }}
                            className={`text-sm font-normal flex-shrink-0 border px-5 py-1.5 rounded-full cursor-pointer ${slotTime[slotIndex] === item.time
                                ? 'bg-primary text-white'
                                : 'text-gray-400 border border-gray-300'
                                }`}
                        >
                            {item.time}
                        </p>
                    ))}
                </div>

                <button className="bg-primary text-white text-sm font-base px-16 md:px-20 py-3 rounded-full my-6">Book an appointment</button>
            </div>
            <div className='text-center mt-16 mb-8'>
                <p className='text-3xl font-semibold mb-3 max-[332px]:text-[25px]'>Related Doctors</p>
                <p className='text-sm'>Simply browse through our extensive list of trusted<br className='hidden md:block' />
                    doctors
                </p>
            </div>
            <div className={'w-full grid grid-cols-1 min-[530px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 px-3 sm:px-0'}>
                {
                    relatedDoc?.map((item, index) => {
                        return (
                            <div
                                key={index}
                                onClick={() => {
                                    navigate(`/appointment/${item._id}`);
                                    window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scrolling
                                }}
                                className='border border-[#C9D8FF] rounded-xl overflow-hidden hover:translate-y-[-10px] transition-all duration-500 cursor-pointer max-[530px]:max-w-[300px] max-[530px]:m-auto'
                            >
                                <div className='bg-[#EAEFFF]'>
                                    <img className='m-auto' src={item.image} alt="" />
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
                    })
                }
            </div>
            <Footer />
        </div >
    )
}

export default Appointment

