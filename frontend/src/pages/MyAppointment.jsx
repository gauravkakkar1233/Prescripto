import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom"

const MyAppointment = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const navigate = useNavigate()

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1]) - 1] + " " + dateArray[2]
  }

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", { headers: { token } });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
      if (data.success) {
        getUserAppointments();
        getDoctorsData()
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(backendUrl + '/api/user/verifyRazorpay', response, { headers: { token } })
          if (data.success) {
            getUserAppointments()
            navigate('/my-appointments')
          }
        } catch (error) {
          toast.error(error.message)
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })
      if (data.success) {
        initPay(data.order)
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (token) getUserAppointments();
  }, [token]);

  return (
    <div className="py-6 max-w-3xl">

      {/* Page Header */}
      <div className="mb-8">
        <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-2">Your Schedule</p>
        <h1 className="text-3xl font-bold text-gray-800">My Appointments</h1>
        <p className="text-gray-500 text-sm mt-1">{appointments.length} appointment{appointments.length !== 1 ? 's' : ''} found</p>
      </div>

      {appointments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 bg-gray-50 rounded-2xl border border-gray-100">
          <div className="text-5xl mb-4">📅</div>
          <p className="text-lg font-semibold text-gray-500">No appointments yet</p>
          <p className="text-sm mt-1">Book your first appointment with a trusted doctor</p>
          <button onClick={() => navigate('/doctors')} className="btn-primary mt-6">
            Find Doctors →
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {appointments.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
            >
              <div className="flex gap-0">
                {/* Doctor Image */}
                <div className="w-32 sm:w-40 flex-shrink-0">
                  <img
                    className="w-full h-full object-cover object-top"
                    style={{ background: "linear-gradient(135deg, #eef0ff, #e8f4ff)" }}
                    src={item.docData.image}
                    alt={item.docData.name}
                    loading="lazy"
                  />
                </div>

                {/* Doctor Info */}
                <div className="flex-1 p-5 flex flex-col gap-1.5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-gray-800 font-bold text-base">{item.docData.name}</p>
                      <p className="text-primary text-xs font-semibold uppercase tracking-wide mt-0.5">{item.docData.speciality}</p>
                    </div>
                    {/* Status badge */}
                    {item.isCompleted && (
                      <span className="badge-available flex-shrink-0">✓ Completed</span>
                    )}
                    {item.cancelled && !item.isCompleted && (
                      <span className="badge-unavailable flex-shrink-0">✕ Cancelled</span>
                    )}
                    {!item.cancelled && !item.isCompleted && item.payment && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 flex-shrink-0">
                        💳 Paid
                      </span>
                    )}
                    {!item.cancelled && !item.isCompleted && !item.payment && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 flex-shrink-0">
                        ⏳ Pending
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1 text-sm text-gray-500 mt-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs">📍</span>
                      <span className="text-xs">{item.docData.address.line1}{item.docData.address.line2 ? ', ' + item.docData.address.line2 : ''}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs">📅</span>
                      <span className="text-xs font-medium text-gray-600">{slotDateFormat(item.slotDate)} at {item.slotTime}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {!item.cancelled && !item.payment && !item.isCompleted && (
                      <button
                        onClick={() => appointmentRazorpay(item._id)}
                        className="btn-primary py-2 px-5 text-xs"
                      >
                        💳 Pay Online
                      </button>
                    )}
                    {!item.cancelled && !item.isCompleted && (
                      <button
                        onClick={() => cancelAppointment(item._id)}
                        className="px-5 py-2 rounded-full text-xs font-semibold border border-red-200 text-red-500 hover:bg-red-50 transition-all duration-200"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointment;