import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
    const { docId } = useParams();
    const navigate = useNavigate();

    const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);

    const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    const [docInfo, setDocInfo] = useState(null);
    const [docSlots, setDocSlots] = useState([]);
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState("");

    const fetchDocInfo = () => {
        const doctor = doctors.find((doc) => doc._id === docId);
        if (!doctor) return;
        setDocInfo(doctor);
    };

    const getAvailableSlots = async () => {
        setDocSlots([]);
        let today = new Date();
        let allSlots = [];

        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);

            let endTime = new Date(today);
            endTime.setDate(today.getDate() + i);
            endTime.setHours(21, 0, 0, 0);

            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
            } else {
                currentDate.setHours(10);
                currentDate.setMinutes(0);
            }

            let timeSlots = [];
            while (currentDate < endTime) {
                const day = currentDate.getDate();
                const month = currentDate.getMonth() + 1;
                const year = currentDate.getFullYear();
                const slotDate = `${day}_${month}_${year}`;

                let formattedTime = currentDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
                const bookedSlots = docInfo?.slots_booked?.[slotDate] || [];
                const isSlotAvailable = !bookedSlots.includes(formattedTime);

                if (isSlotAvailable) {
                    timeSlots.push({ dateTime: new Date(currentDate), time: formattedTime });
                }
                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }
            allSlots.push(timeSlots);
        }
        setDocSlots(allSlots);
    };

    const bookAppointment = async () => {
        if (!token) {
            toast.warn("Login to book appointment");
            return navigate("/login");
        }
        if (!docSlots[slotIndex] || docSlots[slotIndex].length === 0) {
            return toast.error("No slot available");
        }
        if (!slotTime) {
            return toast.error("Please select a time slot");
        }

        try {
            const date = docSlots[slotIndex][0].dateTime;
            const slotDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`;

            const { data } = await axios.post(
                `${backendUrl}/api/user/book-appointment`,
                { docId, slotDate, slotTime },
                { headers: { token } }
            );

            if (data.success) {
                toast.success(data.message);
                getDoctorsData();
                navigate("/my-appointments");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    useEffect(() => { fetchDocInfo(); }, [doctors, docId]);
    useEffect(() => { if (docInfo) getAvailableSlots(); }, [docInfo]);

    return (
        docInfo && (
            <div className="py-6">

                {/* Doctor Details */}
                <div className="flex flex-col sm:flex-row gap-6 mb-8">
                    {/* Doctor Image */}
                    <div className="flex-shrink-0 sm:w-72">
                        <img
                            className="w-full rounded-2xl object-cover object-top shadow-lg"
                            style={{ background: "linear-gradient(135deg, #eef0ff, #e8f4ff)", aspectRatio: "3/4" }}
                            src={docInfo.image}
                            alt={docInfo.name}
                            loading="lazy"
                        />
                    </div>

                    {/* Doctor Info Card */}
                    <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-7 flex flex-col gap-4">
                        {/* Name & Verified */}
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h1 className="text-2xl font-bold text-gray-900">{docInfo.name}</h1>
                                <img className="w-5 h-5" src={assets.verified_icon} alt="Verified" />
                            </div>
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-sm text-gray-500">{docInfo.degree}</span>
                                <span className="text-gray-300">•</span>
                                <span className="text-sm font-semibold text-primary">{docInfo.speciality}</span>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                    {docInfo.experience}
                                </span>
                            </div>
                        </div>

                        {/* Availability */}
                        <span className={docInfo.available ? 'badge-available w-fit' : 'badge-unavailable w-fit'}>
                            <span className={`w-1.5 h-1.5 rounded-full ${docInfo.available ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                            {docInfo.available ? 'Available for Booking' : 'Currently Unavailable'}
                        </span>

                        {/* About */}
                        <div>
                            <div className="flex items-center gap-1.5 mb-2">
                                <img src={assets.info_icon} alt="" className="w-4 h-4" />
                                <p className="text-sm font-bold text-gray-700">About</p>
                            </div>
                            <p className="text-sm text-gray-500 leading-6">{docInfo.about}</p>
                        </div>

                        {/* Fee */}
                        <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-lg">💰</div>
                            <div>
                                <p className="text-xs text-gray-400 font-medium">Appointment Fee</p>
                                <p className="text-xl font-bold text-gray-800">{currencySymbol}{docInfo.fee}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Booking Slots */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <div className="flex items-center gap-2 mb-5">
                        <div className="w-1.5 h-5 rounded-full bg-gradient-to-b from-primary to-indigo-400" />
                        <h2 className="font-bold text-gray-800">Select Appointment Slot</h2>
                    </div>

                    {/* Day Selector */}
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Choose Date</p>
                    <div className="flex gap-3 overflow-x-auto pb-2 mb-5">
                        {docSlots.length > 0 &&
                            docSlots.map((item, index) =>
                                item.length > 0 && (
                                    <button
                                        key={index}
                                        onClick={() => { setSlotIndex(index); setSlotTime(""); }}
                                        className={`flex flex-col items-center py-3 min-w-[64px] rounded-2xl transition-all duration-200 border flex-shrink-0 ${
                                            slotIndex === index
                                                ? "text-white border-transparent shadow-lg"
                                                : "border-gray-200 text-gray-500 hover:border-primary hover:text-primary"
                                        }`}
                                        style={slotIndex === index ? {
                                            background: "linear-gradient(135deg, #5f6FFF, #818cf8)"
                                        } : {}}
                                    >
                                        <p className="text-xs font-bold">{daysOfWeek[item[0].dateTime.getDay()]}</p>
                                        <p className="text-lg font-bold">{item[0].dateTime.getDate()}</p>
                                    </button>
                                )
                            )}
                    </div>

                    {/* Time Slots */}
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Choose Time</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {docSlots.length > 0 &&
                            docSlots[slotIndex] &&
                            docSlots[slotIndex].map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSlotTime(item.time)}
                                    className={`text-xs font-semibold px-4 py-2 rounded-xl transition-all duration-200 border ${
                                        slotTime === item.time
                                            ? "text-white border-transparent shadow-md"
                                            : "text-gray-500 border-gray-200 hover:border-primary hover:text-primary"
                                    }`}
                                    style={slotTime === item.time ? {
                                        background: "linear-gradient(135deg, #5f6FFF, #818cf8)"
                                    } : {}}
                                >
                                    {item.time.toLowerCase()}
                                </button>
                            ))}
                    </div>

                    <button
                        onClick={bookAppointment}
                        className="btn-primary py-3.5 px-10 text-base"
                    >
                        Book Appointment →
                    </button>
                </div>

                {/* Related Doctors */}
                <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
            </div>
        )
    );
};

export default Appointment;