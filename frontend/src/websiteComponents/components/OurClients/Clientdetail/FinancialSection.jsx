import React from 'react'
import { Heading4, RichParagraph } from '../../Common/Common'
import { DollarSign } from "lucide-react"

export default function FinancialSection() {
  return (
    <div className="lg:col-span-3 p-8 md:p-12 rounded-lg bg-secondary border border-primary/10 flex flex-col md:flex-row items-center gap-6">
      <div className="flex-shrink-0 w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-sm border border-primary/5">
        <DollarSign className="text-primary w-8 h-8" />
      </div>
      <div className="flex-grow">
        <Heading4 text="Financial Efficiency After Purchase" className="mb-4 font-bold" />
        <RichParagraph className="text-primary/80">
          Unlike money spent on flights and hotels, a campervan is a physical asset you retain. The major investment is upfront. After that, you eliminate recurring costs for flights, hotels, and restaurant-heavy trips. You control your daily travel budget, often drastically reducing it.
        </RichParagraph>
      </div>
    </div>
  )
}