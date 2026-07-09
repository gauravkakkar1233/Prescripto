import React, { useState, useContext } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fee, setFee] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (!docImg) {
        return toast.error("Please upload a doctor image");
      }

      const formData = new FormData();

      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fee", Number(fee));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({
          line1: address1,
          line2: address2,
        })
      );

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        {
          headers: {
            aToken,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);

        // Clear form
        setDocImg(false);
        setName("");
        setEmail("");
        setPassword("");
        setExperience("1 Year");
        setFee("");
        setAbout("");
        setSpeciality("General physician");
        setDegree("");
        setAddress1("");
        setAddress2("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>

      <div className="bg-white px-8 py-8 border rounded w-full max-w-5xl max-h-[80vh] overflow-y-scroll">
        {/* Upload Image */}
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc_img">
            <img
              className="w-16 h-16 bg-gray-100 rounded-full cursor-pointer object-cover"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Upload"
            />
          </label>

          <input
            type="file"
            id="doc_img"
            hidden
            onChange={(e) => setDocImg(e.target.files[0])}
          />

          <p>
            Upload Doctor <br />
            Picture
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 text-gray-600">
          {/* Left Side */}
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div>
              <p>Doctor Name</p>
              <input
                className="border rounded px-3 py-2 w-full"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <p>Doctor Email</p>
              <input
                className="border rounded px-3 py-2 w-full"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <p>Password</p>
              <input
                className="border rounded px-3 py-2 w-full"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <p>Experience</p>
              <select
                className="border rounded px-3 py-2 w-full"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              >
                {[...Array(10)].map((_, index) => (
                  <option key={index} value={`${index + 1} Year`}>
                    {index + 1} Year
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p>Consultation Fee</p>
              <input
                className="border rounded px-3 py-2 w-full"
                type="number"
                placeholder="Fee"
                value={fee}
                onChange={(e) => setFee(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div>
              <p>Speciality</p>
              <select
                className="border rounded px-3 py-2 w-full"
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
              >
                <option>General physician</option>
                <option>Gynecologist</option>
                <option>Dermatologist</option>
                <option>Pediatrician</option>
                <option>Neurologist</option>
                <option>Gastroenterologist</option>
              </select>
            </div>

            <div>
              <p>Education</p>
              <input
                className="border rounded px-3 py-2 w-full"
                type="text"
                placeholder="Education"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                required
              />
            </div>

            <div>
              <p>Address</p>

              <input
                className="border rounded px-3 py-2 w-full mb-2"
                type="text"
                placeholder="Address Line 1"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                required
              />

              <input
                className="border rounded px-3 py-2 w-full"
                type="text"
                placeholder="Address Line 2"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <p className="mb-2 text-gray-600">About Doctor</p>

          <textarea
            rows={5}
            className="w-full border rounded px-4 py-3 resize-none"
            placeholder="Write about doctor"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="mt-6 bg-primary text-white px-10 py-3 rounded-full hover:opacity-90"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;