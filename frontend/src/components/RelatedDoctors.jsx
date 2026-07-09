import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext)
  const [relDoc, setRelDoc] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if (doctors && doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      )
      setRelDoc(doctorsData)
    }
  }, [doctors, speciality, docId])

  if (relDoc.length === 0) return null;

  return (
    <div className='flex flex-col items-center gap-6 my-16 text-gray-900 md:mx-10'>

      <div className="text-center">
        <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-3">Same Speciality</p>
        <h2 className='section-heading'>Related Doctors</h2>
      </div>

      <p className='section-subtext sm:w-2/5'>
        Browse other trusted doctors in the same speciality.
      </p>

      <div className='w-full grid [grid-template-columns:var(--grid-auto)] gap-5 pt-4 px-3 sm:px-0'>
        {relDoc.slice(0, 5).map((item, index) => (
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
        className='btn-outline mt-4'
      >
        Browse All Doctors →
      </button>

    </div>
  )
}

export default RelatedDoctors