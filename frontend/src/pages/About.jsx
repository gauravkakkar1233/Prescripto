import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const whyChooseUs = [
  {
    icon: '⚡',
    title: 'Efficiency',
    desc: 'Streamlined appointment scheduling that fits into your busy lifestyle.',
    color: 'from-amber-400 to-orange-400',
    bg: 'bg-amber-50',
  },
  {
    icon: '🤝',
    title: 'Convenience',
    desc: 'Access to a network of trusted healthcare professionals in your area.',
    color: 'from-primary to-indigo-400',
    bg: 'bg-indigo-50',
  },
  {
    icon: '🎯',
    title: 'Personalization',
    desc: 'Tailored recommendations and reminders to help you stay on top of your health.',
    color: 'from-emerald-400 to-teal-400',
    bg: 'bg-emerald-50',
  },
];

const About = () => {
  return (
    <div className="py-6">

      {/* Page Header */}
      <div className='text-center mb-12'>
        <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-3">Who We Are</p>
        <h1 className='section-heading'>About <span className='text-primary'>Prescripto</span></h1>
      </div>

      {/* About Section */}
      <div className='my-10 flex flex-col md:flex-row gap-12 items-center'>
        <div className="relative flex-shrink-0">
          <div className="absolute inset-0 rounded-2xl translate-x-3 translate-y-3"
            style={{ background: "linear-gradient(135deg, #5f6FFF22, #818cf822)" }} />
          <img
            className='w-full md:max-w-[380px] rounded-2xl object-cover shadow-xl relative z-10'
            src={assets.about_image}
            alt="About Prescripto"
            loading="lazy"
          />
        </div>

        <div className='flex flex-col justify-center gap-6 text-gray-600 leading-relaxed'>
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full w-fit">
            🏥 Healthcare Technology
          </div>

          <p className="text-gray-700 leading-7">
            Welcome to <strong>Prescripto</strong>, your trusted partner in managing your healthcare
            needs conveniently and efficiently. We understand the challenges individuals face
            when it comes to scheduling doctor appointments and managing their health records.
          </p>

          <p className="text-gray-600 leading-7">
            Prescripto is committed to excellence in healthcare technology. We continuously
            strive to enhance our platform, integrating the latest advancements to improve
            user experience and deliver superior service. Whether you're booking your first
            appointment or managing ongoing care, Prescripto is here to support you every step of the way.
          </p>

          <div className="border-l-4 border-primary pl-5 py-1">
            <p className="font-bold text-gray-800 mb-1">Our Vision</p>
            <p className="text-gray-600 text-sm leading-6">
              To create a seamless healthcare experience for every user — bridging the gap
              between patients and healthcare providers, making it easier for you to access
              the care you need, when you need it.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className='mt-16 mb-4'>
        <div className="text-center mb-10">
          <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-3">Our Promise</p>
          <h2 className='section-heading'>Why Choose <span className='text-primary'>Us</span></h2>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {whyChooseUs.map((item, i) => (
            <div
              key={i}
              className='group flex flex-col gap-4 p-8 rounded-2xl border border-gray-100 hover:border-primary/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer bg-white'
            >
              <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                {item.icon}
              </div>
              <div>
                <h3 className='font-bold text-gray-800 text-lg mb-2'>{item.title}</h3>
                <p className='text-gray-500 text-sm leading-6'>{item.desc}</p>
              </div>
              <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${item.color} group-hover:w-full transition-all duration-500`} />
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default About