import React, { useContext, useEffect, useRef, useState } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const profileRef = useRef(null);

  // Sticky shadow on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(false);
    setShowProfile(false);
    navigate("/");
  };

  return (
    <>
      <nav
        className={`sticky top-0 z-50 flex items-center justify-between py-3.5 px-0 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100"
            : "bg-white/80 backdrop-blur-sm border-b border-gray-100/60"
        }`}
      >
        {/* Logo */}
        <img
          onClick={() => navigate("/")}
          className="w-40 cursor-pointer transition-transform duration-200 hover:scale-105"
          src={assets.logo}
          alt="Prescripto Logo"
        />

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-8">
          {[
            { to: "/", label: "Home" },
            { to: "/doctors", label: "All Doctors" },
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact" },
          ].map(({ to, label }) => (
            <NavLink key={to} to={to}>
              {({ isActive }) => (
                <li
                  className={`relative text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer pb-1 ${
                    isActive ? "text-primary" : "text-gray-600 hover:text-primary"
                  }`}
                >
                  {label}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 rounded-full bg-gradient-to-r from-primary to-indigo-400 transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </li>
              )}
            </NavLink>
          ))}
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-3 relative">
          {token && userData ? (
            <div
              ref={profileRef}
              className="relative flex items-center gap-2 cursor-pointer"
              onClick={() => setShowProfile((prev) => !prev)}
            >
              <img
                className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/30 transition-all duration-200 hover:ring-primary/60"
                src={userData.image || assets.profile_pic}
                alt="Profile"
              />
              <img
                className={`w-2.5 transition-transform duration-200 ${showProfile ? "rotate-180" : ""}`}
                src={assets.dropdown_icon}
                alt="Dropdown"
              />

              {/* Profile Dropdown */}
              {showProfile && (
                <div
                  className="absolute top-12 right-0 z-50 animate-fade-in"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="glass-card min-w-52 rounded-2xl p-2 flex flex-col gap-0.5">
                    {/* User info header */}
                    <div className="px-3 py-2 mb-1 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-800">{userData.name}</p>
                      <p className="text-xs text-gray-400 truncate">{userData.email}</p>
                    </div>

                    <button
                      onClick={() => { navigate("/my-profile"); setShowProfile(false); }}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-gray-600 hover:bg-primary/8 hover:text-primary transition-all duration-150 text-left"
                    >
                      <span className="text-base">👤</span> My Profile
                    </button>
                    <button
                      onClick={() => { navigate("/my-appointments"); setShowProfile(false); }}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-gray-600 hover:bg-primary/8 hover:text-primary transition-all duration-150 text-left"
                    >
                      <span className="text-base">📅</span> My Appointments
                    </button>
                    <div className="border-t border-gray-100 my-1" />
                    <button
                      onClick={logout}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-all duration-150 text-left"
                    >
                      <span className="text-base">🚪</span> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="btn-primary hidden md:block"
            >
              Create Account
            </button>
          )}

          {/* Mobile Menu Icon */}
          <button
            aria-label="Open Menu"
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 md:hidden hover:bg-gray-50 transition-colors"
            onClick={() => setShowMenu(true)}
          >
            <img src={assets.menu_icon} alt="Menu" className="w-5" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
          showMenu ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          onClick={() => setShowMenu(false)}
        />
        {/* Drawer */}
        <div
          className={`absolute right-0 top-0 bottom-0 w-72 bg-white shadow-2xl flex flex-col transition-transform duration-300 ${
            showMenu ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <img className="w-32" src={assets.logo} alt="Logo" />
            <button
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setShowMenu(false)}
            >
              <img className="w-5" src={assets.cross_icon} alt="Close" />
            </button>
          </div>

          <ul className="flex flex-col gap-1 mt-4 px-3">
            {[
              { to: "/", label: "🏠  Home" },
              { to: "/doctors", label: "🩺  All Doctors" },
              { to: "/about", label: "ℹ️  About" },
              { to: "/contact", label: "📞  Contact" },
            ].map(({ to, label }) => (
              <NavLink key={to} to={to} onClick={() => setShowMenu(false)}>
                {({ isActive }) => (
                  <li
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {label}
                  </li>
                )}
              </NavLink>
            ))}
          </ul>

          <div className="mt-auto px-5 pb-8">
            {!token && (
              <button
                onClick={() => { navigate("/login"); setShowMenu(false); }}
                className="btn-primary w-full text-center"
              >
                Create Account
              </button>
            )}
            {token && (
              <button
                onClick={() => { logout(); setShowMenu(false); }}
                className="w-full py-3 rounded-full text-sm font-medium text-red-500 border border-red-200 hover:bg-red-50 transition-all"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;