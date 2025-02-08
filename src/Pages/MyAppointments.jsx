import React, { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { db, auth } from "../config/firebase";
import AppointmentLoader from "../Loader/AppointmentLoader";
import { onAuthStateChanged } from "firebase/auth";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        const q = query(collection(db, "appointment"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        setAppointments(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <p className="pb-3 mt-12 text-lg font-medium text-gray-600 border-b">
        My Appointments
      </p>
      <div className="flex flex-col">
        {loading ? (
          <AppointmentLoader />
        ) : appointments.length > 0 ? (
          appointments.map(({ id, name, speciality, address, image, date, time }) => (
            <div key={id} className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b">
              <img className="w-36 bg-[#EAEFFF]" src={image} alt="Doctor" />
              <div className="flex-1 text-sm text-[#5E5E5E]">
                <p className="text-[#262626] text-base font-semibold">{name}</p>
                <p>{speciality}</p>
                <p className="text-[#464646] font-medium mt-1">Address:</p>
                <p>{address?.line1}</p>
                <p>{address?.line2}</p>
                <p className="mt-1">
                  <span className="text-sm text-[#3C3C3C] font-medium">Date & Time:</span> {date} | {time}
                </p>
              </div>
              <div className="flex flex-col gap-2 justify-end text-sm text-center">
                <button className="text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300">
                  Pay Online
                </button>
                <button className="text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300">
                  Cancel Appointment
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-4">No appointments found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyAppointments;
