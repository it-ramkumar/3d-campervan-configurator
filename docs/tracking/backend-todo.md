# Backend TODO (tracking & leads)

Frontend changes are done. These items need backend work (api.bigbearvans.com) and approval.

## What the frontend now sends

Every lead request (`POST /contact`, `/recommend`, `/inquery`, `/calendar/create-event`) now includes these fields at the top level of the JSON body:

| Field | Notes |
|---|---|
| `event_id` | UUID. The same value is sent to GTM (`generate_lead`) and to Meta as `eventID`. Use it later for Conversions API / offline-conversion dedupe. |
| `lead_source` | `contact` \| `inventory` \| `layout` \| `quiz` \| `booking` \| `build_your_own` |
| `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content` | First touch of the session; only present when they were in the landing URL |
| `gclid`, `fbclid` | First touch; only present when they were in the landing URL |
| `landing_page` | Path only (for example `/van-layouts`), no query string |
| `referrer` | Origin + path of the external referrer, no query string |

Booking also sends `timezone` (the visitor's browser time zone, used as before) and `displayTimezone` (the zone the slots were shown in: the browser zone or `America/Los_Angeles`).

## /contact (`backend/routes/contactUs.js`)

- [ ] **Make `message` optional.** Line 23 currently returns 400 when `message` is empty. The frontend now sends `"Interested in {vanTitle}"` or `"No message provided"` as a workaround.
- [ ] Return errors consistently as `{ success: false, message }`. Some routes use `error` instead of `message`. The frontend reads both, but one shape is cleaner.

## Store fbclid and event_id on every lead model

- [ ] Add `fbclid`, `event_id`, `lead_source`, `landing_page` and `referrer` (plus any of `gclid` / `utm_*` that are missing) to the Contact, Recommend (quiz lead) and Inquiry models, and save them from `req.body`.
- [ ] Show them in the admin lead detail views so sales can see where a lead came from.

## Booking model

There is currently no database record of a booking; it only exists as a Google Calendar event.

- [ ] Add a `Booking` model: `name`, `email`, `phone`, `startTime`, `endTime`, `timezone`, `displayTimezone`, `googleEventId`, `meetLink`, `event_id`, `lead_source`, `utm_*`, `gclid`, `fbclid`, `landing_page`, `referrer`, `status`, timestamps.
- [ ] Save it in `POST /calendar/create-event` after the Google event is created.
- [ ] **Attribution goes in the event's private `extendedProperties`, NOT in `description`** (attendees can see the description):

```js
const ATTRIBUTION_KEYS = ["event_id", "lead_source", "utm_source", "utm_medium", "utm_campaign",
  "utm_term", "utm_content", "gclid", "fbclid", "landing_page", "referrer"];

const privateProps = {};
for (const key of ATTRIBUTION_KEYS) {
  if (req.body[key]) privateProps[key] = String(req.body[key]).slice(0, 1024); // values must be strings
}

const event = {
  // ...existing fields...
  extendedProperties: { private: privateProps },
};
```

## Internal notification email on every booking

- [ ] Send an internal email (to sales) on every successful booking, with: name, email, phone, date/time (in Pacific Time **and** the visitor's zone), `lead_source`, all `utm_*`, `gclid`, `fbclid`, `landing_page`, `referrer` and the Meet link.

## /calendar/create-event hardening

- [ ] **Validate the email server-side** with the same rule as the frontend: `/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/`. Return 400 `{ success: false, message }` if it's invalid. It's currently used as an attendee without any check.
- [ ] Require `name`, `startTime` and `endTime`, and reject slots outside 09:00–17:00 Pacific or before tomorrow (the same rules as `/calendar/slots`).
- [ ] Slot availability re-check: **already done.** The route lists events in the window and returns 400 "Time slot already booked". Keep it. Optionally make it race-safe (two requests at the same moment can both pass the check).
