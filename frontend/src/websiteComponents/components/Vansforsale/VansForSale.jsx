import React, { useEffect, useState } from 'react'
import HeroV from './Herov/HeroV';
import AvailableVans from './AvailableVans/AvailableVans';
import SoldVans from './SoldVans/SoldVans';
import Consultation from '../Consultation/Consultation';
import FaqV from './Faqv/FaqV';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { getAllVans } from "../../../api/van/getAllVans";

export default function VansForSale() {
  const [vans, setVans] = useState([]);
  useEffect(() => {
    const fetchVans = async () => {
      const result = await getAllVans();
      setVans(result.data);
    };
    fetchVans();
  }, []);
  const soldVans = vans.filter(v => v.sold);
const availableVans = vans.filter(v => !v.sold);

  return (
    <div>
        <Navbar />
      <HeroV />
      <AvailableVans availableVans={availableVans} />
      <SoldVans soldVans={soldVans} />
      <Consultation vanForSale={true}/>
      <FaqV />
      <Footer />
    </div>
  )
}
