import React from 'react'
import Heading1 from '../Common/Headings/Heading1'
import RichParagraph from '../Common/Paragraph/RichParagraph'
import { SpanTag } from '../Common/Common'

export default function ReturnsPolicy() {
  return (
    <div className="bg-secondary min-h-screen">

      {/* Hero Header */}
      <div className="bg-primary py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <SpanTag text={" Legal"} className="text-hover uppercase mb-4" />
          <Heading1 textColor="text-secondary" className="mb-4">
            Returns & Cancellation Policy
          </Heading1>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <RichParagraph textColor="text-primary" className="opacity-70">
          Since all our camper vans are custom-built to order and tailored to individual client
          specifications, we do not accept standard returns or exchanges. For details regarding
          custom build deposits and order cancellations, please contact us directly at{' '}
          <a
            href="mailto:visit.bigbearvans@gmail.com"
            className="text-primary font-semibold underline underline-offset-2"
          >
            visit.bigbearvans@gmail.com
          </a>.
        </RichParagraph>
      </div>
    </div>
  )
}
