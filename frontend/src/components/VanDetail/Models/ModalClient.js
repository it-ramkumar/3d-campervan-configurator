"use client";
import React, { useState } from 'react'
import VanCanvas from './VanCanvas';

export default function ModalClient({ url }) {
    const [openBackdoors, setOpenBackdoors] = useState(false);
    const [openDriverDoors, setOpenDriverDoors] = useState(false);
    const [openSlider, setOpenSlider] = useState(false);
console.log(url,"ayd")
    return (
        <div>
         <VanCanvas
         key={url}
    url={url} // Direct pass karein, default value props mein handle karein
    openBackdoors={openBackdoors}
    openDriverDoors={openDriverDoors}
    openSlider={openSlider}
/>
        </div>
    )
}
