import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)
  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])
  return dashData && (
    <div className='m-5'>

      {/* Stat Cards */}
      <div className='flex flex-wrap gap-3'>
        <div className="flex items-center gap-3 bg-white p-4 min-w-52 rounded border border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className='w-14' src={assets.doctor_icon} alt="" />
          <div>
            <p className='text-2xl font-semibold text-gray-700'>{dashData.doctors}</p>
            <p className='text-gray-500 text-sm'>Doctors</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white p-4 min-w-52 rounded border border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className='w-14' src={assets.appointments_icon} alt="" />
          <div>
            <p className='text-2xl font-semibold text-gray-700'>{dashData.appointments}</p>
            <p className='text-gray-500 text-sm'>Appointments</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white p-4 min-w-52 rounded border border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className='w-14' src={assets.patients_icon} alt="" />
          <div>
            <p className='text-2xl font-semibold text-gray-700'>{dashData.patients}</p>
            <p className='text-gray-500 text-sm'>Patients</p>
          </div>
        </div>
      </div>

      {/* Latest Bookings */}
      <div className='bg-white mt-10 rounded-xl shadow-sm border border-gray-100'>
        <div className='flex items-center gap-2.5 px-5 py-4 border-b border-gray-100'>
          <img src={assets.list_icon} alt="" />
          <p className='font-semibold text-gray-700'>Latest Bookings</p>
        </div>
        <div className='divide-y divide-gray-100'>
          {dashData.latestAppointments.map((item, index) => (
            <div className='flex items-center px-6 py-4 gap-4 hover:bg-gray-50' key={index}>
              <img className='rounded-full w-10 h-10 object-cover' src={item.docData.image} alt='' />
              <div className='flex-1 text-sm'>
                <p className='text-gray-800 font-medium'>{item.docData.name}</p>
                <p className='text-gray-500 text-xs mt-0.5'>{slotDateFormat(item.slotDate)}</p>
              </div>
              {
                item.cancelled
                  ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                  : item.isCompleted ? <p className='text-green-500 text-xs font-medium'>Completed</p> : <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} />
              }
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Dashboard

