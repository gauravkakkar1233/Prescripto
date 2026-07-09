import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom'

const footerLinks = {
  Company: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Privacy Policy', href: '#' },
  ],
  Contact: [
    { label: '+1-212-456-7890', href: 'tel:+12124567890' },
    { label: 'support@prescripto.com', href: 'mailto:support@prescripto.com' },
  ],
}

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className='mt-20'>
      {/* Main Footer */}
      <div
        className='rounded-t-3xl px-8 md:px-16 pt-14 pb-10'
        style={{ background: "linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%)" }}
      >
        <div className='grid grid-cols-1 sm:grid-cols-[3fr_1fr_1fr] gap-12'>

          {/* Brand */}
          <div>
            <img
              className='mb-5 w-36 cursor-pointer'
              src={assets.logo}
              alt="Prescripto Logo"
              onClick={() => navigate('/')}
            />
            <p className='text-gray-500 text-sm leading-7 max-w-xs'>
              Your trusted partner in managing healthcare needs conveniently.
              Connecting patients with top doctors — anytime, anywhere.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {['🐦', '💼', '📸'].map((icon, i) => (
                <button
                  key={i}
                  aria-label={["Twitter", "LinkedIn", "Instagram"][i]}
                  className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-sm hover:border-primary hover:bg-primary/5 transition-all duration-200 shadow-sm"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <p className='text-sm font-bold text-gray-800 uppercase tracking-widest mb-5'>Company</p>
            <ul className='flex flex-col gap-3'>
              {footerLinks.Company.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className='text-sm text-gray-500 hover:text-primary transition-colors duration-200 hover:translate-x-0.5 inline-block'
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className='text-sm font-bold text-gray-800 uppercase tracking-widest mb-5'>Get In Touch</p>
            <ul className='flex flex-col gap-3'>
              {footerLinks.Contact.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className='text-sm text-gray-500 hover:text-primary transition-colors duration-200 break-all'
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-gray-200 bg-white px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className='text-xs text-gray-400'>
          © {new Date().getFullYear()} Prescripto. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <a href="#" className="text-xs text-gray-400 hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="text-xs text-gray-400 hover:text-primary transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer