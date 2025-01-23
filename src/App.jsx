import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
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
import Loader from './Loader/Loader';
import Footer from './Components/Footer';
import Register from './Pages/Register';

function App() {
  // Define routes
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="alldoctors" element={<AllDoctors />} />
        <Route path='alldoctors/:speciality' element={<AllDoctors />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="admin" element={<AdminPanel />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path='appointment' element={<Appointment />} />
        <Route path='appointment/:docId' element={<Appointment />} />
        <Route path="*" element={<ErrorBoundary />} />
      </Route>
    )
  );
  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
      <Footer /> 
    </Suspense>
  );
}

export default App;
