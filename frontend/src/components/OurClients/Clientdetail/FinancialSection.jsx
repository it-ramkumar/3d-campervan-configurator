import React from 'react'
import { Heading1, RichParagraph } from '../../Common/Common'
import { DollarSign } from "lucide-react"

export default function FinancialSection() {
  return (
    <div className="lg:col-span-3 p-8 md:p-12 rounded-lg bbv-card border border-hover/20 flex flex-col md:flex-row items-center gap-6">
      <div className="flex-shrink-0 w-16 h-16 bg-hover/20 rounded-lg flex items-center justify-center border border-hover/30">
        <DollarSign className="text-hover w-8 h-8" />
      </div>
      <div className="flex-grow">
        <Heading1 variant="card" text="Financial Efficiency After Purchase" className=" !text-primary uppercase mb-4" />
        <RichParagraph variant="card">
          Unlike money spent on flights and hotels, a campervan is a physical asset you retain. The major investment is upfront. After that, you eliminate recurring costs for flights, hotels, and restaurant-heavy trips. You control your daily travel budget, often drastically reducing it.
        </RichParagraph>
      </div>
    </div>
  )
}
