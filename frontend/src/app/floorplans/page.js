import React from 'react'
import All_Titles_Client from '../../components/Layouts/All_Titles/All_Titles';

export const metadata = {
    title: "Camper Van Floor Plans & Layouts | Big Bear Vans",
    description: "Browse Big Bear Vans' custom camper van floor plans for 2-7 person builds — compare layouts before you configure your own Sprinter or Transit.",
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
