import React from 'react'
import { specialityData } from "../assets/assets_frontend/assets";
import { Link } from 'react-router-dom';

const SpecialityMenu = () => {
  return (
    <div className='flex flex-col items-center gap-6 py-20 text-gray-800' id='speciality'>
      <div className="text-center">
        <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-3">Our Specialties</p>
        <h2 className='section-heading'>Find by Speciality</h2>
      </div>

      <p className='section-subtext sm:w-2/5 mt-1'>
        Simply browse through our extensive list of trusted doctors,
        schedule your appointment hassle-free.
      </p>

      <div className='flex sm:justify-center gap-4 pt-4 w-full overflow-x-auto pb-2 px-4'>
        {specialityData.map((item, index) => (
          <Link
            onClick={() => scrollTo(0, 0)}
            className='specialty-chip group'
            key={index}
            to={`/doctors/${item.speciality}`}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-white shadow-sm flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <img className='w-12 sm:w-16 object-contain' src={item.image} alt={item.speciality} />
            </div>
            <p className='text-xs font-semibold text-gray-700 text-center leading-tight'>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SpecialityMenu