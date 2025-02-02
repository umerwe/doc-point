import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate, useNavigate } from 'react-router-dom';
import React, { Suspense } from 'react';

// Lazy load components
const RootLayout = React.lazy(() => import('./Layout/RootLayout'));
const Home = React.lazy(() => import('./Pages/Home'));
const AllDoctors = React.lazy(() => import('./Pages/AllDoctors'));
const About = React.lazy(() => import('./Pages/About'));
const Contact = React.lazy(() => import('./Pages/Contact'));
const AdminPanel = React.lazy(() => import('./Pages/AdminPanel'));
const Login = React.lazy(() => import('./Pages/Login'));
const ErrorBoundary = React.lazy(() => import('./Components/ErrorBoundary'));
const Appointment = React.lazy(() => import('./Pages/Appointment'))
const Profile = React.lazy(() => import('./Pages/Profile'))
const MyAppointments = React.lazy(() => import('./Pages/MyAppointments'))
import Loader from './Loader/Loader';
import Footer from './Components/Footer';
import Register from './Pages/Register';
import { useSelector } from 'react-redux';

function App() {
  const user = useSelector(store => store.LoginSlice.user)

  // Define routes
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="alldoctors" element={<AllDoctors />} />
        <Route path='alldoctors/:speciality' element={<AllDoctors />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="admin" element={user.email ? <AdminPanel /> : <Navigate to={'/'} />} />
        <Route path="login" element={!(user.email) ? <Login /> : <Navigate to={'/'} />} />
        <Route path="register" element={<Register />} />
        <Route path='appointment' element={<Appointment />} />
        <Route path='appointment/:docId' element={<Appointment />} />
        <Route path='my-profile' element={<Profile />} />
        <Route path='my-appointments' element={<MyAppointments />} />
        <Route path="*" element={<ErrorBoundary />} />
      </Route>
    )
  );
  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>

  );
}

export default App;
