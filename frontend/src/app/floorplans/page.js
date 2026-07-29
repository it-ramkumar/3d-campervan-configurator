import React from 'react'
import All_Titles_Client from '../../components/Layouts/All_Titles/All_Titles';

export const metadata = {
    title: "Camper Van Floor Plans for 2-8 People | Big Bear Vans",
    description:`Compare Big Bear Vans' custom camper van floor plans for
 2-8 person builds on Sprinter, Transit & ProMaster chassis
 before you configure your own.`,
    alternates: {
        canonical: "https://www.bigbearvans.com/floorplans",
    },
};

export default function page() {
    return (
        <div>

            <All_Titles_Client />
        </div>
    )
}
