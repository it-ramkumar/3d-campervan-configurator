import React from 'react'
import ExteriorChoicesList from './ExteriorChoicesList'
import HeroSection from '../HeroSection/HeroSection'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import AdditionalAccessories from './AdditionalAccessories'
import ExteriorCTR from './ExteriorCTR'

export default function ExteriorChoicePage() {
  const heroImage = "/heroSlider/exteriorhero.webp";
  const newTitleText = "Campervan Exterior Upgrades";
  const newDescriptionText =
    "The exterior of your campervan is all about looks and functionality. At Big Bear Vans, we go beyond aesthetics to equip your van with the most practical exterior accessories that turn heads along the way.";

    return (
        <div>
            <Navbar />
            <div className='hero'>
                 <HeroSection title={newTitleText} description={newDescriptionText} image={heroImage} link="/inquiry" buttonText="Get a Quote" showButton={false} />
            </div>
            <div className='list'>
                <ExteriorChoicesList />
            </div>
            <ExteriorCTR/>
            <div className='list'>
                <AdditionalAccessories />
            </div>
            <Footer/>
        </div>
    )
}
