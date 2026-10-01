# GTM setup for lead tracking (container GTM-WCMSZ3TJ)

The site now pushes **one** `generate_lead` event to the dataLayer, and only after the backend confirms the lead was saved. Nothing fires on `/thank-you` any more.

## dataLayer contract

```js
{
  event: "generate_lead",
  lead_source: "contact" | "inventory" | "layout" | "quiz" | "booking" | "build_your_own",
  event_id: "<uuid>",               // same value is sent to Meta as eventID
  user_data: {
    email: "jane@example.com",       // lower-cased, trimmed
    phone_number: "+19515551234"     // E.164; omitted when invalid/missing
  }
}
```

Meta Pixel is fired directly from code: `Lead` (or `Schedule` for booking) with `{ eventID: event_id }`.

| lead_source | Where it comes from |
|---|---|
| `contact` | "Let's Connect" form on /consultation, floating "Send Email" button |
| `inventory` | "I'm Interested" modal on the homepage Buy section and van detail pages |
| `layout` | "Build One Like This" on layout detail pages |
| `quiz` | Van Matchmaker (results stay on the page, no thank-you redirect) |
| `booking` | Consultation calendar booking |
| `build_your_own` | Build-your-own inquiry form |

## 1. Variables

Variables → User-Defined Variables → New:

| Name | Type | Data Layer Variable Name | Version |
|---|---|---|---|
| `DLV - lead_source` | Data Layer Variable | `lead_source` | 2 |
| `DLV - event_id` | Data Layer Variable | `event_id` | 2 |
| `DLV - user_data.email` | Data Layer Variable | `user_data.email` | 2 |
| `DLV - user_data.phone_number` | Data Layer Variable | `user_data.phone_number` | 2 |

Then create **`UPD - Lead`**: type *User-Provided Data*, then *Manual configuration*:
- Email → `{{DLV - user_data.email}}`
- Phone → `{{DLV - user_data.phone_number}}`

## 2. Triggers

| Name | Type | Condition |
|---|---|---|
| `CE - generate_lead` | Custom Event | Event name `generate_lead`, All Custom Events |
| `CE - generate_lead - contact/inventory/layout` | Custom Event | `generate_lead`, Some: `{{DLV - lead_source}}` matches RegEx `^(contact\|inventory\|layout)$` |
| `CE - generate_lead - build_your_own` | Custom Event | `generate_lead`, Some: `{{DLV - lead_source}}` equals `build_your_own` |
| `CE - generate_lead - booking` | Custom Event | `generate_lead`, Some: `{{DLV - lead_source}}` equals `booking` |
| `CE - generate_lead - quiz` | Custom Event | `generate_lead`, Some: `{{DLV - lead_source}}` equals `quiz` |

The RegEx to type into GTM is exactly: `^(contact|inventory|layout)$`

## 3. Google Ads conversion tags (Conversion ID `16677332528`)

For **every** tag below:
- Conversion ID: `16677332528`
- Transaction ID: `{{DLV - event_id}}` (deduplicates double fires)
- Tick **Include user-provided data from your website** and select `{{UPD - Lead}}`
- Make sure a **Conversion Linker** tag fires on All Pages (create one if missing)

| Tag | Conversion label | Trigger |
|---|---|---|
| `Ads - Lead - Contact` | `zNLyCKCpjsUcELDMr5A-` (existing) | `CE - generate_lead - contact/inventory/layout` |
| `Ads - Lead - Build Your Own` | `tfm6CM_S-MQcELDMr5A-` (existing) | `CE - generate_lead - build_your_own` |
| `Ads - Consultation Booked` | `CONSULTATION_BOOKED_LABEL` | `CE - generate_lead - booking` |
| `Ads - Quiz Lead` | `QUIZ_LEAD_LABEL` | `CE - generate_lead - quiz` |

Create the two new conversion actions in Google Ads first (Goals → Conversions → New → Website → manual setup), then replace the placeholders with the labels Google gives you:
- **Consultation Booked**: category *Book appointment*, set as a **Primary** action, count *One*.
- **Quiz Lead**: category *Submit lead form*, set as a **Secondary** action, count *One*.

Also turn on **Enhanced conversions for web** (method: Google Tag Manager) in the Ads conversion settings.

## 4. GA4 event tag

- Tag type: *Google Analytics: GA4 Event*, using your existing GA4 measurement ID / Google tag
- Event name: `generate_lead`
- Event parameters: **only**
  - `lead_source` → `{{DLV - lead_source}}`
  - `event_id` → `{{DLV - event_id}}`
- Trigger: `CE - generate_lead`
- **Never** add email or phone as event parameters (that breaks GA4's PII policy). If you want enhanced measurement with user data, use the Google tag's *User-provided data* setting with `{{UPD - Lead}}` instead.
- In GA4 Admin → Events, mark `generate_lead` as a **Key event**. Register `lead_source` as an event-scoped custom dimension.

## 5. Pause the old tags

Pause these (don't delete them yet, so you can roll back):
- Page-view conversions **`inquire12`** and **`thankyoupageview`**
- Any tag triggered by the Custom Event **`conversion`** (the old thank-you page push, which the code no longer sends)
- Any trigger based on Page Path contains `/thank-you` that feeds a conversion

## 6. Release rule

1. Deploy the code first.
2. Within a few minutes **after** the deploy is live, on the **same day**, publish the GTM version (name it e.g. `generate_lead migration`).
3. If GTM is published before the deploy, the new tags won't fire and the old ones will already be paused, so you lose conversions. If GTM is published a long time after the deploy, the old thank-you tags can't fire either (the code no longer sends `conversion`), so the gap is also lost conversions. Keep the window short.

## 7. Test checklist

Use **GTM Preview** (Tag Assistant), **GA4 DebugView** and **Meta Pixel Helper** together.

For each form (contact, inventory, layout, quiz, booking, build_your_own):

1. **Success**
   - [ ] Tag Assistant shows exactly **one** `generate_lead` with the correct `lead_source` and a populated `event_id`
   - [ ] The matching Ads conversion tag fired, with Transaction ID = event_id and user-provided data present
   - [ ] The GA4 `generate_lead` event is in DebugView with only `lead_source` + `event_id`
   - [ ] Pixel Helper shows `Lead` (or `Schedule` for booking) with an eventID equal to the GTM event_id
   - [ ] The thank-you URL is `/thank-you?source=<lead_source>`, with no email (quiz: no redirect, results shown inline)
2. **Failure**: DevTools → Network → right-click the API request → *Block request URL*, then submit
   - [ ] An inline error is shown with the call-us link, there's no redirect, and there's no `generate_lead` / Pixel event
3. **Direct visit**: open `/thank-you` in a new tab
   - [ ] Tag Assistant shows **no** conversion tag fired and no `generate_lead`
4. **Paused tags**
   - [ ] `inquire12`, `thankyoupageview` and the `conversion`-event tags never fire
