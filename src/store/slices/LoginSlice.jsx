import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) ||
    JSON.parse(localStorage.getItem('register')) || {},
  appointmentUser: JSON.parse(localStorage.getItem('userData')) || [],
  doctors: JSON.parse(localStorage.getItem('doctors')) || [],
};

export const LoginSlice = createSlice({
  name: 'loginSlice',
  initialState,
  reducers: {
    allDoctors: (state, action) => {
      state.doctors = action.payload;
      localStorage.setItem('doctors', JSON.stringify(state.doctors));
    }
    ,
    login: (state, action) => {
      state.user = action.payload;
    },
    register: (state, action) => {
      state.user = action.payload;
    },
    addAppointment: (state, action) => {
      state.appointmentUser.push(action.payload);
      localStorage.setItem('userData', JSON.stringify(state.appointmentUser));
    },
    removeAppointments: (state, action) => {
      state.appointmentUser = state.appointmentUser.filter(
        (appt) => appt.id !== action.payload
      );
      localStorage.setItem('userData', JSON.stringify(state.appointmentUser));
    },
  }
});

export const { allDoctors, login, register, addAppointment, removeAppointments } = LoginSlice.actions;
export default LoginSlice.reducer;
