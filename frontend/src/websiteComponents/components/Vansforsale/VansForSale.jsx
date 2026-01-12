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
  if (!availableVan) { return <Loader /> }

  const soldDesc = " The camper vans below have already found their happy owners. We’ve proudly built over 105 camper vans with a reputation for quality.Check our past builds to get inspired for your custom van."
  const soldHeading = "A Showcase of our Sold Camper Vans"
    const pendingDesc = "These camper vans have been reserved by customers and are currently in the final stages of the sales process. Availability is temporarily on hold until the sale is completed."
  const pendingHeading = "Sale Pending Camper Vans"
  const comingDesc = "These camper vans are planned and will be available soon. Builds have not started yet, but designs and specifications are being finalized. Check back soon to see these vans move into production."
  const comingHeading = "Upcoming Camper Vans – Coming Soon"
  return (
    <div>
      <Navbar />
      <HeroSection title={newTitleText} description={newDescriptionText} image={heroImage} link="/inquiry" buttonText="Get a Quote" showButton={true} />
      <AvailableVans availableVans={availableVan} />
      <SoldVans status={"sale_pending"} soldDesc={pendingDesc} soldHeading={pendingHeading}/>
      <SoldVans status={"coming_soon"} soldDesc={comingDesc} soldHeading={comingHeading}/>

      <SoldVans status={"sold"} soldDesc={soldDesc} soldHeading={soldHeading}/>

      <Consultation vanForSale={true} />
      <FaqV faqs={faqs} />
      <Footer />
    </div>
  )
}
