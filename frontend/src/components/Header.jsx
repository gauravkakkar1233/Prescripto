import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const Header = () => {
  return (
    <div className="relative flex flex-col md:flex-row flex-wrap overflow-hidden rounded-2xl mt-4 mb-2"
      style={{
        background: "linear-gradient(135deg, #5f6FFF 0%, #7c86ff 50%, #a5b0ff 100%)"
      }}
    >
      {/* Decorative circles */}
      <div className="absolute top-[-60px] right-[-60px] w-64 h-64 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }} />
      <div className="absolute bottom-[-40px] left-[30%] w-48 h-48 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }} />

      {/* LEFT SIDE */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-5 py-12 px-8 md:px-12 lg:px-16 m-auto relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/30">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Trusted by 10,000+ patients
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold leading-tight">
          Book Appointment
          <br />
          <span className="text-white/90">With</span>{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #fff 30%, #c7d2fe 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Trusted Doctors
          </span>
        </h1>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 text-white/90 text-sm font-light">
          <img className="w-28 drop-shadow-md" src={assets.group_profiles} alt="Doctors" />
          <p className="leading-relaxed">
            Browse our extensive list of trusted doctors,
            <br className="hidden sm:block" />
            schedule appointments hassle-free.
          </p>
        </div>

        <a
          className="flex items-center gap-2 bg-white text-primary px-7 py-3.5 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          href="#speciality"
        >
          Book Appointment
          <img className="w-3.5" src={assets.arrow_icon} alt="Arrow" />
        </a>
      </div>

      {/* RIGHT SIDE */}
      <div className="md:w-1/2 relative flex items-end justify-center min-h-[240px]">
        <img
          className="w-full md:absolute bottom-0 h-auto max-h-[420px] object-contain object-bottom animate-float drop-shadow-2xl"
          src={assets.header_img}
          alt="Doctor"
        />
      </div>
    </div>
  );
};

export default Header;