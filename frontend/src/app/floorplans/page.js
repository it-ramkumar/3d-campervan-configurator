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

export default async function page({ searchParams }) {
    const sp = await searchParams;
    const category = sp?.category && sp.category !== "ALL" ? sp.category : "";

    const qs = new URLSearchParams({
        page: "1",
        limit: "12",
        category,
        search: sp?.search || "",
        bathroomType: sp?.bathroomType || "",
        wheelbase: sp?.wheelbase || "",
        seating: sp?.seating || "",
        model: sp?.model || "",
    }).toString();

    const initialData = await fetch(`${process.env.NEXT_PUBLIC_URL}/portfolio/titles-only?${qs}`, {
        cache: "no-store",
    }).then(res => res.json()).catch(() => null);

    return (
        <div>
            <All_Titles_Client initialData={initialData?.success ? initialData : null} />
        </div>
    )
}
