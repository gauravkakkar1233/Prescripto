import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className='flex flex-col items-center gap-6 my-16 text-gray-900 md:mx-10'>

      <div className="text-center">
        <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-3">Meet Our Team</p>
        <h2 className='section-heading'>Top Doctors to Book</h2>
      </div>

      <p className='section-subtext sm:w-2/5'>
        Simply browse through our extensive list of trusted doctors.
      </p>

      <div className='w-full grid [grid-template-columns:var(--grid-auto)] gap-5 pt-4 px-3 sm:px-0'>
        {doctors.slice(0, 10).map((item, index) => (
          <div
            onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0); }}
            key={index}
            className='doctor-card'
          >
            <div className="overflow-hidden">
              <img
                className='w-full h-52 object-cover object-top'
                src={item.image}
                alt={item.name}
                loading="lazy"
              />
            </div>

            <div className='p-4 flex flex-col gap-2'>
              <span className={item.available ? 'badge-available' : 'badge-unavailable'}>
                <span className={`w-1.5 h-1.5 rounded-full ${item.available ? 'bg-emerald-500' : 'bg-red-500'}`} />
                {item.available ? 'Available' : 'Not Available'}
              </span>

              <p className='text-gray-900 text-base font-bold leading-snug'>{item.name}</p>
              <p className='text-primary text-xs font-semibold tracking-wide uppercase'>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => { navigate('/doctors'); scrollTo(0, 0); }}
        className='btn-outline mt-6'
      >
        View All Doctors →
      </button>

    </div>
  )
}

export default TopDoctors