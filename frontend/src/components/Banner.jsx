import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div
      className='relative flex overflow-hidden rounded-2xl my-20 md:mx-10'
      style={{
        background: "linear-gradient(135deg, #5f6FFF 0%, #7c86ff 60%, #a5b0ff 100%)"
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute top-[-80px] right-[20%] w-72 h-72 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }} />
      <div className="absolute bottom-[-60px] left-[-40px] w-60 h-60 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }} />

      {/* LEFT SIDE */}
      <div className='flex-1 py-12 sm:py-16 md:py-20 lg:py-28 px-8 sm:px-12 lg:px-16 relative z-10'>
        <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/30 mb-5">
          <span>🩺</span> Over 100+ Verified Doctors
        </div>
        <div className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight'>
          <p>Book Appointment</p>
          <p className='mt-2'>With Trusted Doctors</p>
        </div>
        <p className="text-white/80 text-sm mt-4 mb-8 max-w-sm leading-relaxed">
          Join thousands of patients who trust Prescripto to connect them with the best healthcare professionals.
        </p>
        <button
          onClick={() => { navigate('/login'); scrollTo(0, 0); }}
          className='inline-flex items-center gap-2 bg-white text-primary text-sm font-bold px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300'
        >
          Create Account →
        </button>
      </div>

      {/* RIGHT SIDE */}
      <div className='hidden md:flex md:w-1/2 lg:w-[370px] relative items-end justify-end'>
        <img
          className='w-full max-w-md absolute bottom-0 right-0 drop-shadow-2xl'
          src={assets.appointment_img}
          alt="Banner Doctor"
        />
      </div>
    </div>
  )
}

export default Banner