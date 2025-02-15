import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate, useNavigate } from 'react-router-dom';
import React, {Suspense } from 'react';

// Lazy load components
const RootLayout = React.lazy(() => import('./Layout/RootLayout'));
const Home = React.lazy(() => import('./Pages/Home'));
const AllDoctors = React.lazy(() => import('./Pages/AllDoctors'));
const About = React.lazy(() => import('./Pages/About'));
const Contact = React.lazy(() => import('./Pages/Contact'));
const Login = React.lazy(() => import('./Pages/Login'));
const ErrorBoundary = React.lazy(() => import('./Components/Error/ErrorBoundary'));
const ErrorFallback = React.lazy(() => import('./Components/Error/ErrorFallback'));
const Appointment = React.lazy(() => import('./Pages/Appointment'))
const Profile = React.lazy(() => import('./Pages/Profile'))
const MyAppointments = React.lazy(() => import('./Pages/MyAppointments'))
const Register = React.lazy(() => import('./Pages/Register'))
import Loader from './Loader/Loader';
import { useSelector } from 'react-redux';

function App() {
  const user = useSelector(store => store.userSlice.user)

  // Define routes
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />} errorElement={<ErrorFallback />}>
        <Route index element={<Home />} />
        <Route path="alldoctors" element={<AllDoctors />} />
        <Route path='alldoctors/:speciality' element={<AllDoctors />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
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
