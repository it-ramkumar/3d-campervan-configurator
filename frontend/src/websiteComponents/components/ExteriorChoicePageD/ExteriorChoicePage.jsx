import React from 'react'
import ExteriorChoicesList from './ExteriorChoicesList'
import HeroSection from '../HeroSection/HeroSection'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

export default function ExteriorChoicePage() {

 const heroImage = "/heroSlider/interiorHero.png";
  const newTitleText = "Interior Design Choices";
  const newDescriptionText =
    "At Big Bear Vans, our goal is to build a campervan that suits you the most. Your custom van’s style can be inspired by something from Instagram, reflect the color scheme of your home, or be something entirely new that you would like to have.";
    return (
        <div>
            <Navbar />
            <div className='hero'>
                 <HeroSection title={newTitleText} description={newDescriptionText} image={heroImage} link="/inquiry" buttonText="Get a Quote" showButton={false} />
            </div>
            <div className='list'>
                <ExteriorChoicesList />
            </div>
            <Footer/>
        </div>
    )
}
