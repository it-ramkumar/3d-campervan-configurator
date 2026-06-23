import React from 'react'
import Heading1 from '../Common/Headings/Heading1'
import Heading3 from '../Common/Headings/Heading3'
import Heading4 from '../Common/Headings/Heading4'
import RichParagraph from '../Common/Paragraph/RichParagraph'
import { SpanTag } from '../Common/Common'

const sections = [
  { id: 1, title: 'WHAT INFORMATION DO WE COLLECT?' },
  { id: 2, title: 'HOW DO WE PROCESS YOUR INFORMATION?' },
  { id: 3, title: 'WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?' },
  { id: 4, title: 'DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?' },
  { id: 5, title: 'HOW LONG DO WE KEEP YOUR INFORMATION?' },
  { id: 6, title: 'HOW DO WE KEEP YOUR INFORMATION SAFE?' },
  { id: 7, title: 'DO WE COLLECT INFORMATION FROM MINORS?' },
  { id: 8, title: 'WHAT ARE YOUR PRIVACY RIGHTS?' },
  { id: 9, title: 'CONTROLS FOR DO-NOT-TRACK FEATURES' },
  { id: 10, title: 'DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?' },
  { id: 11, title: 'DO WE MAKE UPDATES TO THIS NOTICE?' },
  { id: 12, title: 'HOW CAN YOU CONTACT US ABOUT THIS NOTICE?' },
]

export default function PrivacyPolicy() {
  return (
    <div className="bg-secondary min-h-screen" >

      {/* Hero Header */}
      <div className="bg-primary py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <SpanTag text={" Legal"} className="text-hover   uppercase mb-4"/>
          <Heading1 textColor="text-secondary" className="mb-4">
            Privacy Policy
          </Heading1>
          <p className="text-secondary opacity-50 text-sm font-medium tracking-widest uppercase">
            Last updated: June 23, 2026
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Intro */}
        <div className="mb-14">
          <RichParagraph textColor="text-primary" className="mb-5">
            This Privacy Notice for <strong>Big Bear Vans Corp</strong> ("we," "us," or "our"), describes how and why we might access, collect, store, use, and/or share ("process") your personal information when you use our services ("Services"), including when you visit our website at{' '}
            <a href="https://www.bigbearvans.com/" target="_blank" rel="noopener noreferrer"
              className="text-primary font-semibold underline underline-offset-2">
              https://www.bigbearvans.com/
            </a>{' '}
            or any website of ours that links to this Privacy Notice.
          </RichParagraph>
          <RichParagraph textColor="text-primary" className="opacity-70">
            Questions or concerns? Reading this Privacy Notice will help you understand your privacy rights and choices. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at{' '}
            <a href="mailto:visit.bigbearvans@gmail.com"
              className="text-primary font-semibold underline underline-offset-2">
              visit.bigbearvans@gmail.com
            </a>.
          </RichParagraph>
        </div>

        {/* Divider */}
        <div className="h-px bg-primary opacity-10 mb-14" />

        {/* Summary of Key Points */}
        <div className="mb-14">
          <SectionLabel>Summary</SectionLabel>
          <Heading3 textColor="text-primary" className="mb-8">
            SUMMARY OF KEY POINTS
          </Heading3>
          <div className="space-y-4">
            {[
              { q: 'What personal information do we process?', a: 'When you visit or use our Services, we may process personal information (like names, emails, and phone numbers) that you voluntarily submit through our inquiry forms.' },
              { q: 'Do we process any sensitive personal information?', a: 'We do not process sensitive personal information (such as racial origins, religious beliefs, etc.).' },
              { q: 'Do we collect any information from third parties?', a: 'No, we do not collect any information from public databases or outside marketing partners.' },
              { q: 'How do we process your information?', a: 'We process your information solely to respond to your inquiries, offer customer support, and analyze general website traffic.' },
              { q: 'Do we use cookies?', a: 'Yes, we use basic operational cookies and Google Analytics to monitor website traffic and user locations.' },
            ].map(({ q, a }, i) => (
              <div key={i} className="flex gap-4 p-5 border border-[var(--color-primary)] border-opacity-10 rounded-[var(--radius-lg)]">
                <span className="text-primary font-black text-lg mt-0.5 shrink-0">—</span>
                <p className="text-primary text-sm leading-relaxed">
                  <strong className="">{q}</strong>{' '}{a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-primary opacity-10 mb-14" />

        {/* Table of Contents */}
        <div className="mb-14">
          <SectionLabel>Navigation</SectionLabel>
          <Heading3 textColor="text-primary" className="mb-8">
            TABLE OF CONTENTS
          </Heading3>
          <ol className="space-y-2">
            {sections.map(({ id, title }) => (
              <li key={id}>
                <a
                  href={`#section-${id}`}
                  className="flex items-center gap-3 text-sm text-primary opacity-60 hover:opacity-100 hover:text-primary transition-all duration-200 font-medium group"
                >
                  <span className="text-primary font-black w-5 shrink-0">{id}.</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-200">{title}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>

        {/* Divider */}
        <div className="h-px bg-primary opacity-10 mb-14" />

        {/* Section 1 */}
        <PolicySection id={1} title="WHAT INFORMATION DO WE COLLECT?">
          <SubHeading>Personal information you disclose to us</SubHeading>
          <Body>
            We collect personal information that you voluntarily provide to us when you express an interest
            in obtaining information about our products and Services, or when you contact us through our
            website forms.
          </Body>
          <Body>The personal information we collect includes:</Body>
          <BulletList items={['Names', 'Phone numbers', 'Email addresses', 'Mailing addresses (where applicable for delivery/customization specs)']} />

          <SubHeading>Information automatically collected</SubHeading>
          <Body>
            We automatically collect certain basic technical information when you visit, use, or navigate
            the Services. This information does not reveal your specific identity (like your name or contact
            information) but includes device characteristics, your anonymized IP address, country/location,
            browser type, and information about how and when you use our Services. This is primarily needed
            for website analytics and security.
          </Body>
        </PolicySection>

        {/* Section 2 */}
        <PolicySection id={2} title="HOW DO WE PROCESS YOUR INFORMATION?">
          <Body>
            We process your personal information for specific and limited reasons, depending on how you
            interact with our Services, including:
          </Body>
          <div className="space-y-3 mt-4">
            <KeyValueItem
              label="To respond to user inquiries and offer support"
              value="We process the data from your forms to reply to your camper van customization or sales requests."
            />
            <KeyValueItem
              label="To monitor general traffic"
              value="We use anonymous data to see how many visitors come to our site and from which countries."
            />
          </div>
        </PolicySection>

        {/* Section 3 */}
        <PolicySection id={3} title="WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?">
          <BulletList items={[
            'We do not sell, rent, or lease your personal information to third parties.',
            'We may share information in specific corporate situations, such as during negotiations of any merger, sale of company assets, or financing.',
          ]} />
        </PolicySection>

        {/* Section 4 */}
        <PolicySection id={4} title="DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?">
          <Body>
            Yes, we use cookies and similar tracking technologies to gather basic analytical information
            when you interact with our Services.
          </Body>
          <SubHeading>Google Analytics</SubHeading>
          <Body>
            We use <strong>Google Analytics (GA4)</strong> to track and analyze the general use of our
            website (such as visitor counts and country-level location). This data helps us understand our
            website performance. To opt out of being tracked by Google Analytics across the web, you can
            visit:{' '}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-semibold underline underline-offset-2"
            >
              https://tools.google.com/dlpage/gaoptout
            </a>.
          </Body>
        </PolicySection>

        {/* Section 5 */}
        <PolicySection id={5} title="HOW LONG DO WE KEEP YOUR INFORMATION?">
          <Body>
            We will only keep your personal information for as long as it is necessary for the purposes
            set out in this Privacy Notice (such as handling your inquiry), unless a longer retention
            period is required by law. No purpose in this notice will require us keeping your personal
            information for longer than <strong>1 year</strong>.
          </Body>
        </PolicySection>

        {/* Section 6 */}
        <PolicySection id={6} title="HOW DO WE KEEP YOUR INFORMATION SAFE?">
          <Body>
            We have implemented appropriate and reasonable technical and organizational security measures
            (such as secure servers and data encryption) designed to protect the security of any personal
            information we process. However, please remember that no electronic transmission over the
            internet can be guaranteed 100% secure.
          </Body>
        </PolicySection>

        {/* Section 7 */}
        <PolicySection id={7} title="DO WE COLLECT INFORMATION FROM MINORS?">
          <Body>
            We do not knowingly collect data from or market to children under 18 years of age. By using
            the Services, you represent that you are at least 18 years old.
          </Body>
        </PolicySection>

        {/* Section 8 */}
        <PolicySection id={8} title="WHAT ARE YOUR PRIVACY RIGHTS?">
          <Body>
            Depending on your location, you have the right to request access to, correction of, or
            deletion of your personal data. You can withdraw your consent for us to contact you at any
            time by emailing us at{' '}
            <a href="mailto:visit.bigbearvans@gmail.com"
              className="text-primary font-semibold underline underline-offset-2">
              visit.bigbearvans@gmail.com
            </a>.
          </Body>
        </PolicySection>

        {/* Section 9 */}
        <PolicySection id={9} title="CONTROLS FOR DO-NOT-TRACK FEATURES">
          <Body>
            Most web browsers include a Do-Not-Track ("DNT") feature. We do not currently respond to
            DNT browser signals because no uniform technological standard has been finalized.
          </Body>
        </PolicySection>

        {/* Section 10 */}
        <PolicySection id={10} title="DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?">
          <Body>
            If you are a resident of California or other US states with active privacy laws, you have
            specific rights regarding your personal information under state statutes:
          </Body>
          <BulletList items={[
            'Right to know whether we process your data.',
            'Right to access and get a copy of your personal data.',
            'Right to correct inaccuracies or request deletion.',
            'Right to non-discrimination for exercising your rights.',
          ]} />
          <Body>
            We do not "sell" or "share" your personal data for commercial advertising. To exercise any
            of these rights, you can email us at{' '}
            <a href="mailto:visit.bigbearvans@gmail.com"
              className="text-primary font-semibold underline underline-offset-2">
              visit.bigbearvans@gmail.com
            </a>.
          </Body>
        </PolicySection>

        {/* Section 11 */}
        <PolicySection id={11} title="DO WE MAKE UPDATES TO THIS NOTICE?">
          <Body>
            Yes, we may update this Privacy Notice from time to time to stay compliant with relevant
            laws. The updated version will be indicated by the "Revised" date at the top of the page.
          </Body>
        </PolicySection>

        {/* Section 12 */}
        <PolicySection id={12} title="HOW CAN YOU CONTACT US ABOUT THIS NOTICE?">
          <Body>
            If you have questions or comments about this notice, you may email us at{' '}
            <a href="mailto:visit.bigbearvans@gmail.com"
              className="text-primary font-semibold underline underline-offset-2">
              visit.bigbearvans@gmail.com
            </a>{' '}
            or contact us by post at:
          </Body>
          <div className="mt-6 p-6 border-l-4 border-[var(--color-hover)] bg-primary bg-opacity-5 rounded-r-[var(--radius-lg)]">
            <p className="text-secondary font-black text-base tracking-tight">Big Bear Vans Corp</p>
            <p className="text-secondary text-sm opacity-70 mt-1 leading-relaxed">
              320 W Big Bear Blvd,<br />
              Big Bear, CA 92314,<br />
              United States
            </p>
          </div>
        </PolicySection>

      </div>
    </div>
  )
}

/* ── Sub-components ── */

function SectionLabel({ children }) {
  return (
    <p className="text-primary  tracking-[0.25em] uppercase mb-3">
      {children}
    </p>
  )
}

function PolicySection({ id, title, children }) {
  return (
    <div id={`section-${id}`} className="mb-14 scroll-mt-8">
      <div className="flex items-start gap-4 mb-6">
        <span className="text-primary font-black text-sm mt-1 shrink-0">{id}.</span>
        <h2 className="text-primary text-xl font-black tracking-tight leading-snug">
          {title}
        </h2>
      </div>
      <div className="pl-8 space-y-4">
        {children}
      </div>
      <div className="h-px bg-primary opacity-10 mt-14" />
    </div>
  )
}

function SubHeading({ children }) {
  return (
    <Heading4 textColor="text-primary" className="mt-6 mb-2">
      {children}
    </Heading4>
  )
}

function Body({ children }) {
  return (
    <RichParagraph textColor="text-primary" className="opacity-70">
      {children}
    </RichParagraph>
  )
}

function BulletList({ items }) {
  return (
    <ul className="space-y-2 mt-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-primary opacity-70 leading-relaxed">
          <span className="text-primary font-black mt-0.5 shrink-0">—</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function KeyValueItem({ label, value }) {
  return (
    <div className="p-4 border border-[var(--color-primary)] border-opacity-10 rounded-[var(--radius-lg)]">
      <p className="text-primary text-sm font-black mb-1">{label}</p>
      <p className="text-primary text-sm opacity-60 leading-relaxed">{value}</p>
    </div>
  )
}
