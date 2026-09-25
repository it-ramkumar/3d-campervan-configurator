import React from 'react'
import { Heading1, RichParagraph, SecondaryButton } from '../../Common/Common'
import Link from 'next/link'
export default function CTRSection() {
  return (
    <section className="py-20 md:py-24 bg-gradient-to-br from-secondary to-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <Heading1 variant="section" text="Ready to Begin Your Journey?" className="mb-6 !text-primary" />
        <RichParagraph variant="body">
          Ready to customize your campervan? Let's talk about the van that fits your lifestyle perfectly.
        </RichParagraph>

        <Link href={"/configurator"} target="_blank" rel="noopener noreferrer">
          <SecondaryButton
            label="Start Your Custom Build"
          />
        </Link>
      </div>
    </section>
  )
}