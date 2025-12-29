import React, { useEffect, useState } from 'react'
import AvailableVans from './AvailableVans/AvailableVans';
import SoldVans from './SoldVans/SoldVans';
import Consultation from '../Consultation/Consultation';
import FaqV from "../Faqs/Faqs"
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import HeroSection from '../HeroSection/HeroSection';
import { availableVans } from '../../../api/van/availableVans';
import Loader from "../Loader/Loader"

export default function VansForSale() {

  const faqs = [
    {
      question: "Can I test drive the vans?",
      answer:
        "We’d love for you to take our camper vans for a spin. Please contact us to schedule a test drive at your convenience.",
    },
    {
      question: "Do you offer a Warranty?",
      answer:
        "Yes, all of our pre-built vans, including our Mercedes camper vans for sale, come with a 1-year warranty. This warranty does not cover third-party products themselves.",
    },
    {
      question: "Can I add additional features or upgrades after purchase?",
      answer:
        "Yes, we can install additional features or upgrades after your purchase. Contact us to discuss the options and costs associated with adding new features to your van.",
    },
    {
      question: "Do you offer any maintenance or repair services?",
      answer:
        "Yes, we offer maintenance and repair services for our camper vans. Our experienced technicians can perform routine maintenance, repairs, and upgrades to keep your van in top condition.",
    },
  ];

  const heroImage = "/heroSlider/herov.webp";
  const newTitleText = "Camper Vans For Sale";
  const newDescriptionText =
    "Buy our exclusive and ready-to-roll vans for sale Today.";


  const [vans, setVans] = useState([]);
  useEffect(() => {
    const fetchVans = async () => {
      const result = await availableVans();

      setVans(result.data);
    };
    fetchVans();
  }, []);
  const availableVan = vans.filter(v => v.status === "available");
if(!availableVan){return <Loader/>}

  return (
    <div>
      <Navbar />
      <HeroSection title={newTitleText} description={newDescriptionText} image={heroImage} link="/inquiry" buttonText="Get a Quote" showButton={true} />
      <AvailableVans availableVans={availableVan} />
      <SoldVans />
      <Consultation vanForSale={true} />
      <FaqV faqs={faqs} />
      <Footer />
    </div>
  )
}
