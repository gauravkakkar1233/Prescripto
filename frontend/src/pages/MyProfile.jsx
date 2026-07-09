import React, { useContext, useState } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { AppContext } from "../context/AppContext";
import axios from 'axios'
import { toast } from "react-toastify";

const InfoRow = ({ icon, bg, label, children }) => (
  <div className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-0">
    <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center text-base flex-shrink-0`}>
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs text-gray-400 font-medium mb-0.5">{label}</p>
      {children}
    </div>
  </div>
);

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfile = async () => {
    try {
      const formData = new FormData()
      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append("address", JSON.stringify(userData.address));
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)
      image && formData.append('image', image)

      const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  if (!userData) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto py-8">

      {/* ── Header Card ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-5">
        <div className="flex items-center gap-5">

          {/* Avatar */}
          {isEdit ? (
            <label htmlFor="image" className="relative cursor-pointer group flex-shrink-0">
              <img
                src={image ? URL.createObjectURL(image) : userData.image}
                alt="Profile"
                className="w-20 h-20 rounded-2xl object-cover ring-4 ring-primary/20 group-hover:opacity-80 transition"
              />
              <div className="absolute inset-0 rounded-2xl bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <span className="text-white text-lg">📷</span>
              </div>
              <input type="file" id="image" hidden accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
            </label>
          ) : (
            <img
              src={userData.image || assets.profile_pic}
              alt="Profile"
              className="w-20 h-20 rounded-2xl object-cover ring-4 ring-primary/20 flex-shrink-0"
            />
          )}

          {/* Name & role */}
          <div className="flex-1 min-w-0">
            {isEdit ? (
              <input
                className="form-input text-lg font-bold text-gray-800 mb-1"
                type="text"
                value={userData.name}
                onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
              />
            ) : (
              <h2 className="font-bold text-xl text-gray-800 truncate">{userData.name}</h2>
            )}
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 bg-emerald-400 rounded-full" />
              <p className="text-xs text-gray-500 font-medium">Prescripto Member</p>
            </div>
          </div>

          {/* Edit / Save */}
          <button
            onClick={() => { if (isEdit) updateUserProfile(); else setIsEdit(true); }}
            className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              isEdit
                ? 'bg-primary text-white shadow-md hover:shadow-lg'
                : 'border border-gray-200 text-gray-600 hover:border-primary hover:text-primary'
            }`}
          >
            {isEdit ? '✓ Save' : '✏️ Edit'}
          </button>
        </div>
      </div>

      {/* ── Contact Information ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-5">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Contact Information</p>

        <InfoRow icon="✉️" bg="bg-blue-50" label="Email">
          <p className="text-sm font-semibold text-blue-600 truncate">{userData.email}</p>
        </InfoRow>

        <InfoRow icon="📱" bg="bg-green-50" label="Phone">
          {isEdit ? (
            <input
              className="form-input text-sm py-2"
              type="text"
              value={userData.phone}
              onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
            />
          ) : (
            <p className="text-sm font-semibold text-gray-700">{userData.phone || '—'}</p>
          )}
        </InfoRow>

        <InfoRow icon="📍" bg="bg-purple-50" label="Address">
          {isEdit ? (
            <div className="flex flex-col gap-2">
              <input
                className="form-input text-sm py-2"
                type="text"
                placeholder="Address Line 1"
                value={userData.address?.line1 || ""}
                onChange={(e) => setUserData((prev) => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
              />
              <input
                className="form-input text-sm py-2"
                type="text"
                placeholder="Address Line 2"
                value={userData.address?.line2 || ""}
                onChange={(e) => setUserData((prev) => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
              />
            </div>
          ) : (
            <p className="text-sm font-semibold text-gray-700 leading-5">
              {userData.address?.line1 || '—'}
              {userData.address?.line2 && <><br />{userData.address.line2}</>}
            </p>
          )}
        </InfoRow>
      </div>

      {/* ── Basic Information ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Basic Information</p>

        <InfoRow icon="⚧️" bg="bg-pink-50" label="Gender">
          {isEdit ? (
            <select
              className="form-input text-sm py-2 max-w-36"
              value={userData.gender}
              onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <p className="text-sm font-semibold text-gray-700">{userData.gender || '—'}</p>
          )}
        </InfoRow>

        <InfoRow icon="🎂" bg="bg-orange-50" label="Birthday">
          {isEdit ? (
            <input
              className="form-input text-sm py-2 max-w-44"
              type="date"
              value={userData.dob || ""}
              onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
            />
          ) : (
            <p className="text-sm font-semibold text-gray-700">{userData.dob || '—'}</p>
          )}
        </InfoRow>
      </div>

    </div>
  );
};

export default MyProfile;