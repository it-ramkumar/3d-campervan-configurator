# Backend TODO (tracking & leads)

Frontend changes are done. These items need backend work (api.bigbearvans.com) and approval.

## /contact (`backend/routes/contactUs.js`)

- [ ] **Make `message` optional.** Line 23 currently returns 400 when `message` is empty. The frontend now sends `"Interested in {vanTitle}"` or `"No message provided"` as a workaround. Once this is fixed, the fallback can stay or be removed.
- [ ] Return errors consistently as `{ success: false, message }`. Some routes use `error` instead of `message`. The frontend reads both, but one shape is cleaner.

## Calendar booking (`backend/routes/googleCalender.js` → `POST /calendar/create-event`)

- [ ] The frontend now sends attribution fields (`gclid`, `utm_*`, `referrer`, `landing_page`) in the request body. The route currently ignores them, so nothing is stored yet.
