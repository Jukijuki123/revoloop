import React from 'react'
import superHero from '@/assets/img/superHero.png';
import { Link } from 'react-router-dom'

const badges = [
  {
    label: 'Reduce',
    color: 'bg-linear-to-r from-primary-dark to-secondary',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="white">
        <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6h14z" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 11v6M14 11v6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'Recycle',
    color: 'bg-linear-to-r from-primary-dark to-secondary',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12l2-4h12l2 4"/>
        <path d="M6 8l-3 4 3 4"/>
        <path d="M18 8l3 4-3 4"/>
        <path d="M9 20h6"/>
        <path d="M12 16v4"/>
      </svg>
    ),
  },
  {
    label: 'Reuse',
    color: 'bg-linear-to-r from-primary-dark to-secondary',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V12"/>
        <path d="M12 12C12 8 8 5 4 6c0 4 3 7 8 6z"/>
        <path d="M12 12c0-4 4-7 8-6-1 4-4 7-8 6z"/>
      </svg>
    ),
  },
]

const TrashCashSection = () => {
  return (
    <section id='trashcash' className='bg-primary-light px-6 py-10'>
      <div className='flex flex-col max-w-6xl md:flex-row items-center justify-between px-4 mt-6'>

        {/* Left */}
        <div className='md:w-1/2 relative flex items-center justify-center'>
          <img src={superHero} alt="Penyelamat Bumi" className='w-[50%] md:w-[60%] mx-auto relative z-10' />

            <div className='absolute bottom-0 left-0 flex flex-col gap-2 z-20 opacity-0 md:opacity-100'>
              {badges.map((badge, index) => (
                <div
                  key={badge.label}
                  className='flex items-center gap-2 rounded-full pl-2 pr-16 py-1.5 shadow-md'
                  style={{
                    background: 'rgba(255,255,255,0.35)',
                    backdropFilter: 'blur(6px)',
                    border: '1px solid rgba(255,255,255,0.5)',
                    minWidth: index === 1 ? '150px' : '130px', 
                  }} 
                >

                  <div className={`${badge.color} rounded-full p-1.5 flex items-center justify-center shrink-0`}>
                    {badge.icon}
                  </div>

                  <span className='text-green-900 font-semibold text-sm'>{badge.label}</span>
                </div>
              ))}
            </div>
        </div>

        {/* Right */}
        <div className='md:w-1/2'>
          <h2 className='text-3xl md:text-4xl font-bold text-primary-dark mb-3 md:mb-6'>
            Dari Sampah <span className='text-white'>Jadi Rupiah</span>
          </h2>
          <p className="text-primary-dark mb-6 text-sm md:text-base">
            Fitur Cara Kerja membantu kamu memahami langkah mudah untuk menjual sampah melalui website ini. Cukup kumpulkan sampah dari rumah, pilih lokasi pengepul terdekat, lalu antar langsung ke tempat tersebut. Setelah ditimbang, kamu akan mendapatkan uang dan poin hijau sebagai bentuk apresiasi atas kontribusimu menjaga lingkungan.
          </p>
          <Link to="/trashcash">
            <button className="px-8 py-2 bg-linear-to-r from-primary-dark to-secondary rounded-full text-base lg:text-lg font-semibold text-white hover:scale-105 transition duration-300 cursor-pointer">
              Ayo Jual
            </button>
          </Link>
        </div>

      </div>
    </section>
  )
}

export default TrashCashSection