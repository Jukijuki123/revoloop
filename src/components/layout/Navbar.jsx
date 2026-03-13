import React, { useEffect, useRef, useState } from 'react';
import logo from "../../assets/img/logoEartLine.svg";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  // Toggle mobile menu
  const toggleMobile = () => setMobileOpen(v => !v);
  const closeMobile = () => setMobileOpen(false);

  // Navbar Scrol
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section[id]'));
    if (!sections.length) return;

    const navLinks = Array.from(document.querySelectorAll('.nav-link'));

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach(link => {
              if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active', 'text-primary-dark', 'font-medium');
              } else {
                link.classList.remove('active', 'text-primary-dark', 'font-medium');
              }
            });
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach(s => io.observe(s));
    return () => io.disconnect();
  }, []);


  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);


  return (
    <header ref={navRef} className={`fixed w-full top-0 left-0 z-40 transition-colors duration- ${
        scrolled ? 'bg-primary-light shadow-md' : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2" onClick={closeMobile}>
            <img src={logo} alt="Logo" className="w-8 h-8" />
            <span className="text-2xl text-primary-dark font-bold">REVOLOOP</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex md:items-center md:space-x-8">
            <a href="#tentang" className="nav-link text-hitam hover:text-primary-dark">Tentang Kami</a>
            <a href="#edukasi" className="nav-link text-hitam hover:text-primary-dark">Edukasi</a>
            <a href="#carakerja" className="nav-link text-hitam hover:text-primary-dark">Cara Kerja</a>
            <a href="#trashcash" className="nav-link text-hitam hover:text-primary-dark">TrashCash</a>
            <a href="#komunitas" className="nav-link text-hitam hover:text-primary-dark">Komunitas</a>
            <a href="#kontak" className="nav-link text-hitam hover:text-primary-dark">Kontak</a>
          </nav>

          {/* Tombol Humburger */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobile}
              aria-label="Toggle navigation"
              aria-expanded={mobileOpen}
              className="p-2 rounded-md focus:outline-none"
            >
              {mobileOpen ? (
                // close icon
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // hamburger
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          <div className='hidden lg:block'>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden transition-max-height duration-500 overflow-hidden ${mobileOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
        <div
          className={`px-4 pb-6 pt-2 space-y-2 transition-colors duration-300 ${
            scrolled ? 'bg-primary-light shadow-md' : 'bg-white'
          }`}
        >
          <a href="#tentang" onClick={closeMobile} className="block nav-link py-2 text-hitam">Tentang Kami</a>
          <a href="#edukasi" onClick={closeMobile} className="block nav-link py-2 text-hitam">Edukasi</a>
          <a href="#carakerja" onClick={closeMobile} className="block nav-link py-2 text-hitam">Cara Kerja</a>
          <a href="#trashcash" onClick={closeMobile} className="block nav-link py-2 text-hitam">TrashCash</a>
          <a href="#komunitas" onClick={closeMobile} className='block nav-link py-2 text-hitam'>Komunitas</a>
          <a href="#kontak" onClick={closeMobile} className='block nav-link py-2 text-hitam'>Kontak</a>
        </div>
      </div>
    </header>
  );
}
