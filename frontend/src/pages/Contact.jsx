import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Contact = () => {
  return (
    <div className="py-6">

      {/* Page Header */}
      <div className='text-center mb-12'>
        <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-3">Reach Out</p>
        <h1 className='section-heading'>Contact <span className='text-primary'>Us</span></h1>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12 items-center mb-28'>
        <div className="relative flex-shrink-0">
          <div className="absolute inset-0 rounded-2xl translate-x-3 translate-y-3"
            style={{ background: "linear-gradient(135deg, #5f6FFF22, #818cf822)" }} />
          <img
            className='w-full md:max-w-[380px] rounded-2xl shadow-xl relative z-10 object-cover'
            src={assets.contact_image}
            alt="Contact Prescripto"
            loading="lazy"
          />
        </div>

        <div className='flex flex-col gap-7'>

          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-lg flex-shrink-0">🏢</div>
            <div>
              <p className='font-bold text-gray-800 mb-1'>Our Office</p>
              <p className='text-gray-500 text-sm leading-6'>
                54709 Willms Station<br />
                Suite 350, Washington, USA
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center text-lg flex-shrink-0">📞</div>
            <div>
              <p className='font-bold text-gray-800 mb-1'>Phone & Email</p>
              <p className='text-gray-500 text-sm leading-6'>
                Tel: (415) 555‑0132<br />
                Email: <a href="mailto:support@prescripto.com" className="text-primary hover:underline">support@prescripto.com</a>
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 p-6 rounded-2xl bg-gray-50 border border-gray-100">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center text-base">💼</div>
              <p className='font-bold text-gray-800'>Careers at Prescripto</p>
            </div>
            <p className='text-gray-500 text-sm leading-6'>
              Learn more about our teams and job openings. We're always looking for passionate people to join us.
            </p>
            <button className='btn-outline w-fit mt-1'>
              Explore Jobs →
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Contact