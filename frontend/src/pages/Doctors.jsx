import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const specialties = [
  'General physician',
  'Gynecologist',
  'Dermatologist',
  'Pediatrician',
  'Neurologist',
  'Gastroenterologist',
];

const Doctors = () => {
  const { specialty } = useParams();
  const { doctors } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();

  const applyFilter = () => {
    if (specialty) {
      setFilterDoc(doctors.filter(doc => doc.speciality === specialty));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, specialty]);

  return (
    <div className="py-6">
      {/* Page Header */}
      <div className="mb-8">
        <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-2">Find Your Doctor</p>
        <h1 className="text-3xl font-bold text-gray-800">Browse Specialists</h1>
        <p className='text-gray-500 text-sm mt-1'>
          {filterDoc.length} doctor{filterDoc.length !== 1 ? 's' : ''} available
          {specialty ? ` in ${specialty}` : ''}
        </p>
      </div>

      <div className='flex flex-col sm:flex-row items-start gap-6'>

        {/* Filter Toggle (Mobile) */}
        <button
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 sm:hidden ${
            showFilter
              ? 'bg-primary text-white border-primary shadow-md'
              : 'bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary'
          }`}
          onClick={() => setShowFilter(prev => !prev)}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
          </svg>
          {showFilter ? 'Hide Filters' : 'Show Filters'}
        </button>

        {/* Filter Sidebar */}
        <div
          className={`flex flex-col gap-2 w-full sm:w-52 flex-shrink-0 ${
            showFilter ? 'flex' : 'hidden sm:flex'
          }`}
        >
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Speciality</p>
            <div className="flex flex-col gap-1.5">
              {specialties.map((s) => (
                <button
                  key={s}
                  onClick={() =>
                    specialty === s ? navigate('/doctors') : navigate(`/doctors/${s}`)
                  }
                  className={`filter-chip text-left ${specialty === s ? 'active' : ''}`}
                >
                  {s}
                </button>
              ))}
            </div>
            {specialty && (
              <button
                onClick={() => navigate('/doctors')}
                className="mt-3 w-full text-xs text-red-400 hover:text-red-600 font-medium transition-colors flex items-center gap-1"
              >
                ✕ Clear filter
              </button>
            )}
          </div>
        </div>

        {/* Doctor Cards Grid */}
        <div className='w-full grid [grid-template-columns:var(--grid-auto)] gap-5'>
          {filterDoc.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-400">
              <div className="text-5xl mb-4">🩺</div>
              <p className="text-lg font-semibold text-gray-500">No doctors found</p>
              <p className="text-sm mt-1">Try selecting a different specialty</p>
              <button onClick={() => navigate('/doctors')} className="btn-primary mt-6">
                View All Doctors
              </button>
            </div>
          ) : (
            filterDoc.map((item, index) => (
              <div
                onClick={() => navigate(`/appointment/${item._id}`)}
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
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default Doctors;