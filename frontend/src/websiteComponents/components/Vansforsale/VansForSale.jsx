import React from 'react'
import HeroV from './Herov/HeroV';
import AvailableVans from './availablevans/AvailableVans';
import SoldVans from './SoldVans/SoldVans';
import ConsultationV from './Consultationv/ConsultationV';
import FaqV from './Faqv/FaqV';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

export default function VansForSale() {
  return (
    <div>
        <Navbar />
      <HeroV />
      <AvailableVans />
      <SoldVans />
      <ConsultationV />
      <FaqV />
      <Footer />
    </div>
  )
}
