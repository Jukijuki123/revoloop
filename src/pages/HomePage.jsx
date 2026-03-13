import React from 'react'
import Navbar from '../components/layout/Navbar'
import HeroSection from '../components/sections/HeroSection'
import TentangSection from '../components/sections/TentangSection'
import imgGelombang from "../assets/img/gelombang.svg";
import SumberSampah from '../components/ui/SumberSampah';
import TestimoniSection from '../components/sections/TestimoniSection';
import KomunitasSection from '../components/sections/KomunitasSection';
import EdukasiSection from '../components/sections/EdukasiSection';
import ProdukKerajinan from '../components/sections/ProdukKerajinanSection';
import ImpactSection from '../components/sections/ImpactSection';
import ImpactStats from '../components/ui/ImpactStats';
import FaqSection from '../components/sections/FaqSection';
import TrashCashSection from '../components/sections/TrashCashSection';
import KontakSection from '../components/sections/KontakSection';
import CaraKerja from '../components/sections/CaraKerjaSection';
import Footer from '../components/layout/Footer';
import Chatbot from '../features/chatbot/Chatbot';
import RunningWords from '../components/ui/RunningWords';


const HomePage = () => {

    return (
    <>
    <Navbar />
        <main className="pt-16 scroll-smooth">
            <HeroSection />
            <Chatbot />
            <div className="overflow-hidden -mb-6">
                <img src={imgGelombang} alt="Gelombang" className="w-full" />
            </div>
            <ImpactStats />
            <TentangSection />
            <SumberSampah />
            <EdukasiSection />
            <ImpactSection />
            <ProdukKerajinan />
            <RunningWords />
            <CaraKerja />
            <TrashCashSection />
            <TestimoniSection />
            <KomunitasSection />
            <FaqSection />
            <KontakSection />
            <Footer />
        </main>
    </>
    )
}

export default HomePage
