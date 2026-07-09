import React, { lazy, Suspense } from 'react'
import {Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';

const Home = lazy(() => import('./pages/Home'))
const Doctors = lazy(() => import('./pages/Doctors'))
const Login = lazy(() => import('./pages/Login'))
const MyProfile = lazy(() => import('./pages/MyProfile'))
const MyAppointment = lazy(() => import('./pages/MyAppointment'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Appointment = lazy(() => import('./pages/Appointment'))

function App() {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <ToastContainer />
      <Navbar/>
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[60vh] text-gray-500">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-primary border-r-2"></div>
        </div>
      }>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/doctors' element={<Doctors/>} />
          <Route path='/doctors/:specialty' element={<Doctors/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/my-profile' element={<MyProfile/>} />
          <Route path='/my-appointments' element={<MyAppointment/>} />
          <Route path='/appointment/:docId' element={<Appointment/>} /> 
        </Routes>
      </Suspense>
      <Footer/>
    </div>
  )
}



export default App
