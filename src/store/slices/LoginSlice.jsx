import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) ||
    JSON.parse(localStorage.getItem("register")) || {},
  appointmentUser: JSON.parse(localStorage.getItem("userData")) || [],
  doctors: JSON.parse(localStorage.getItem("doctors")) || [],
  profileData: JSON.parse(localStorage.getItem("profileData")) || {},
};

export const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    allDoctors: (state, action) => {
      state.doctors = action.payload;
      localStorage.setItem("doctors", JSON.stringify(state.doctors));
    },
    login: (state, action) => {
      state.user = action.payload;
    },
    register: (state, action) => {
      state.user = action.payload;
    },
    addAppointment: (state, action) => {
      state.appointmentUser = action.payload;
      localStorage.setItem("userData", JSON.stringify(state.appointmentUser));
    },
    removeAppointments: (state, action) => {
      state.appointmentUser = state.appointmentUser.filter(
        (appt) => appt.id !== action.payload
      );
      localStorage.setItem("userData", JSON.stringify(state.appointmentUser));
    },
    updateProfileData: (state, action) => {
      state.profileData = action.payload;
      localStorage.setItem("profileData", JSON.stringify(state.profileData));
    },
  },
});

export const { allDoctors, login, register, addAppointment, removeAppointments, updateProfileData } =
  loginSlice.actions;
export default loginSlice.reducer;
