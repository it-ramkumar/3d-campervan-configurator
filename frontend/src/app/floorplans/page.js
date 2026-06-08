import React from 'react'
import All_Titles_Client from '../../components/Layouts/All_Titles/All_Titles';
import HeroSection from '../../components/Common/HeroSectionNew/HeroSectionNew';

export default function page() {
    return (
        <div>
            <HeroSection
                title="Camper Van Floor Plans for Every Adventure"
                description="Explore our camper van floor plans, thoughtfully designed for solo travelers, families, pet owners, and moto enthusiasts. Find the perfect layout for your next adventure."
                image="/renderings/4.png"
                showButton={false}
            />
            <All_Titles_Client />
        </div>
    )
}
