import React, { useEffect, useState } from 'react'
import Footer from '../Components/Footer'
import { collection, getDocs } from "firebase/firestore/lite";
import { db } from '../config/firebase';
import AppoitmentLoader from '../Loader/AppointmentLoader';

const MyAppointments = () => {
  const [appointment, setAppointment] = useState([]);

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const querySnapshot = await getDocs(collection(db, "appointment"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Collect all documents in an array
        setAppointment(data); // Update state once
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    }

    fetchAppointments();
  }, []);
  console.log(appointment)
  return (
    <div>
      <p className="pb-3 mt-12 text-lg font-medium text-gray-600 border-b">My appointments</p>
      <div className='flex flex-col'>
        {appointment.length > 0 ? (
          appointment.map((appointment, i) => (
            <div key={i} className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b">
              <div>
                <img
                  className="w-36 bg-[#EAEFFF]"
                  src={appointment.image}
                  alt=""
                />
              </div>

              <div className="flex-1 text-sm text-[#5E5E5E]">
                <p className="text-[#262626] text-base font-semibold">{appointment.name}</p>
                <p>{appointment.speciality}</p>
                <p className="text-[#464646] font-medium mt-1">Address:</p>
                <p>{appointment.address.line1}</p>
                <p>{appointment.address.line2}</p>
                <p className="mt-1">
                  <span className="text-sm text-[#3C3C3C] font-medium">Date & Time:</span> {appointment.date} | {appointment.time}
                </p>
              </div>

              <div className="flex flex-col gap-2 justify-end text-sm text-center">
                <button className="text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300">
                  Pay Online
                </button>
                <button className="text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300">
                  Cancel appointment
                </button>
              </div>
            </div>

          ))
        ) : (
          <AppoitmentLoader />
        )}
      </div>
      <Footer />
    </div>
  )
}

export default MyAppointments
