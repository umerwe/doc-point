import React, { useEffect, useState } from "react";
import { Modal, message, Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { collection, getDocs, query, where, doc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../config/firebase";
import Footer from "../Components/Footer";
import AppointmentLoader from "../Loader/AppointmentLoader";
import { useDispatch, useSelector } from "react-redux";
import { removeAppointments } from '../store/slices/LoginSlice';

const MyAppointments = () => {
  const dispatch = useDispatch();  // Added dispatch here
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const appointmentUser = useSelector(store => store.LoginSlice.appointmentUser);
  console.log(appointmentUser);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, "appointment"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);

      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Show the confirmation modal and store the appointment ID to delete.
  const showDeleteModal = (id) => {
    setSelectedAppointmentId(id);
    setIsModalVisible(true);
  };

  // Delete the appointment when the user confirms.
  const handleModalOk = async () => {
    setIsDeleting(true);
    try {
      await deleteDoc(doc(db, "appointment", selectedAppointmentId));
      dispatch(removeAppointments(selectedAppointmentId));
      message.success("Appointment cancelled successfully!");
    } catch (error) {
      message.error("Failed to cancel appointment.");
    } finally {
      setIsDeleting(false);
      setIsModalVisible(false);
      setSelectedAppointmentId(null);
    }
  };

  // Close the modal if the user cancels the deletion.
  const handleModalCancel = () => {
    setIsModalVisible(false);
    message.info("Appointment not cancelled.");
    setSelectedAppointmentId(null);
  };

  return (
    <div className="min-h-screen p-4">
      <p className="pb-3 mt-4 text-md font-medium text-gray-600 border-b">
        My Appointments
      </p>
      <div className="flex flex-col">
        {loading ? (
          <AppointmentLoader />
        ) : appointmentUser.length > 0 ? (
          appointmentUser.map(
            ({ id, name, speciality, address, image, date, time }) => (
              <div
                key={id}
                className="flex flex-col justify-between min-[721px]:flex-row items-start min-[721px]:items-center gap-4 min-[721px]:gap-6 py-4 border-b"
              >
                <div className="flex gap-4">
                  <img
                    className="w-28 min-[721px]:w-36 bg-[#EAEFFF] object-cover"
                    src={image}
                    alt="Doctor"
                  />
                  <div className="flex-1 text-xs min-[450px]:text-sm text-[#5E5E5E]">
                    <p className="text-[#262626] text-sm min-[450px]:text-base font-semibold">{name}</p>
                    <p>{speciality}</p>
                    <p className="text-[#464646] font-medium mt-1">Address:</p>
                    <p>{address?.line1}</p>
                    <p>{address?.line2}</p>
                    <p className="mt-1">
                      <span className="text-xs min-[450px]:text-sm text-[#3C3C3C] font-medium">
                        Date & Time:
                      </span>{" "}
                      {date} | {time}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-full min-[721px]:w-auto text-sm text-center">
                  <button
                    className="text-[#696969] w-full min-[721px]:w-auto py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    Pay Online
                  </button>
                  <button
                    onClick={() => showDeleteModal(id)}
                    className="text-[#696969] w-full min-[721px]:w-auto py-2 px-4 lg:px-8 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                  >
                    Cancel Appointment
                  </button>
                </div>
              </div>
            )
          )
        ) : (
          <p className="text-center text-gray-500 py-4">
            No appointments found.
          </p>
        )}
      </div>

      {/* Custom responsive modal without the default footer */}
      <Modal
        title={
          <div className="flex items-center">
            <ExclamationCircleOutlined className="text-red-500 mr-2" />
            <span>Cancel Appointment?</span>
          </div>
        }
        open={isModalVisible}
        onCancel={handleModalCancel}
        centered
        getContainer={false}
        width="90%"
        style={{ maxWidth: "500px" }}
        footer={null}
        className="responsive-modal !p-4"
      >
        <p className="text-gray-600">
          This action cannot be undone. Please confirm if you wish to cancel the appointment.
        </p>
        <div className="w-full flex justify-end mt-4 space-x-4">
          <Button type="primary" onClick={handleModalOk} loading={isDeleting}>
            Yes, Cancel
          </Button>
          <Button onClick={handleModalCancel}>No, Keep It</Button>
        </div>
      </Modal>

      <Footer />
    </div>
  );
};

export default MyAppointments;
