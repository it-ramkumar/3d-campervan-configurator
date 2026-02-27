const express = require("express");
const { google } = require("googleapis");
const { DateTime } = require("luxon");
const router = express.Router();

// --- Configuration ---
const oauth2Client = new google.auth.OAuth2(
    process.env.CALENDER_CLIENTID,
    process.env.CALENDER_CLIENT_SECRET,
    process.env.REDIRECT_URI
);

oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
});

// ✅ HOST TIMEZONE (jahan appointments hongi)
const HOST_TIMEZONE = process.env.HOST_TIMEZONE || 'America/Los_Angeles';

// --- Middleware ---
const ensureAuthenticated = async (req, res, next) => {
    try {
        if (!oauth2Client.credentials.refresh_token) {
            throw new Error('No refresh token');
        }
        next();
    } catch (error) {
        console.log('Authentication error:', error.message);
        res.status(401).json({
            message: "Re-authentication required",
            authUrl: `/calendar/auth/url`
        });
    }
};

// --- API Endpoints ---

// Step 1: Generate Auth URL
router.get("/auth/url", (req, res) => {
    const scopes = ["https://www.googleapis.com/auth/calendar"];
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        prompt: "consent",
        scope: scopes,
    });
    res.send({ url });
});

// Step 2: OAuth callback
router.get("/auth/callback", async (req, res) => {
    const code = req.query.code;
    try {
        const { tokens } = await oauth2Client.getToken(code);
        console.log("=== SAVE THIS REFRESH TOKEN ===");
        console.log("REFRESH_TOKEN=" + tokens.refresh_token);
        console.log("===============================");
        oauth2Client.setCredentials(tokens);
        res.send(`<h1>Authentication Successful!</h1><p>Save the refresh token in your .env file</p>`);
    } catch (err) {
        console.error("Callback error:", err);
        res.status(500).json({ message: "Error during authentication", error: err.message });
    }
});

// ✅ Status check
router.get("/status", async (req, res) => {
    try {
        const hasToken = !!oauth2Client.credentials.refresh_token;
        res.json({ loggedIn: hasToken });
    } catch (error) {
        res.json({ loggedIn: false });
    }
});

// ✅ CREATE EVENT - FIXED VERSION
router.post("/create-event", ensureAuthenticated, async (req, res) => {
    try {
        const { name, email, phone, startTime, endTime, summary, description, timezone } = req.body;

        const calendar = google.calendar({ version: "v3", auth: oauth2Client });

        // ✅ User ka timezone (frontend se aaya)
        const userTimezone = timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;

        // ✅ CORRECT WAY: Frontend se ISO string parse karo WITH timezone
        const eventStart = DateTime.fromISO(startTime, { zone: userTimezone });
        const eventEnd = DateTime.fromISO(endTime, { zone: userTimezone });

        console.log("🔍 DEBUG TIMEZONE CHECK:");
        console.log("User Timezone:", userTimezone);
        console.log("Original startTime from frontend:", startTime);
        console.log("Parsed eventStart (with TZ):", eventStart.toISO());
        console.log("Converted to UTC:", eventStart.toUTC().toISO());

        // ✅ Availability Check (UTC mein)
        const events = await calendar.events.list({
            calendarId: "primary",
            timeMin: eventStart.toUTC().toISO(),
            timeMax: eventEnd.toUTC().toISO(),
            singleEvents: true,
        });

        if (events.data.items.length > 0) {
            return res.status(400).json({ message: "This time slot is already booked." });
        }

        // ✅ Event create karo - TIMEZONE PROPERLY SET
        const event = {
            summary: summary || `Meeting with ${name}`,
            description: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\n\n${description || ""}`,
            start: {
                dateTime: eventStart.toISO(), // ✅ ISO format with timezone offset
                timeZone: userTimezone // ✅ User ka timezone
            },
            end: {
                dateTime: eventEnd.toISO(),
                timeZone: userTimezone
            },
            attendees: [{ email: email }],
            conferenceData: {
                createRequest: {
                    requestId: `meet-${Date.now()}`,
                    conferenceSolutionKey: { type: "hangoutsMeet" }
                }
            },
        };

        const response = await calendar.events.insert({
            calendarId: "primary",
            resource: event,
            conferenceDataVersion: 1,
            sendUpdates: 'all' // ✅ Email bhejega with proper timezone
        });

        res.json({
            message: "Booking successful",
            meetLink: response.data.hangoutLink ||
                (response.data.conferenceData?.entryPoints?.[0]?.uri || "No meet link"),
            eventId: response.data.id
        });

    } catch (err) {
        console.error("❌ EVENT CREATION ERROR:", err);
        res.status(500).json({
            message: "Error creating event",
            error: err.message,
        });
    }
});

// ✅ SLOTS ENDPOINT - FIXED VERSION
router.get("/slots", ensureAuthenticated, async (req, res) => {
    try {
        const { date, timezone = 'America/Los_Angeles' } = req.query;
        const startHour = 9, endHour = 17, durationMinutes = 30;
        const slots = [];

        // ✅ User timezone mein din ki shuruaat
        let start = DateTime.fromISO(date, { zone: timezone })
            .set({ hour: startHour, minute: 0, second: 0, millisecond: 0 });

        if (!start.isValid) {
            return res.status(400).json({ message: "Invalid date or timezone provided." });
        }

        let end = DateTime.fromISO(date, { zone: timezone })
            .set({ hour: endHour, minute: 0, second: 0, millisecond: 0 });

        // ✅ Booked events fetch (UTC mein)
        const calendar = google.calendar({ version: "v3", auth: oauth2Client });

        const timeMin = start.toUTC().toISO();
        const timeMax = end.toUTC().toISO();

        const events = await calendar.events.list({
            calendarId: "primary",
            timeMin: timeMin,
            timeMax: timeMax,
            singleEvents: true,
        });

        // ✅ Booked times ko Luxon objects mein convert
        const bookedTimes = events.data.items.map(ev => {
            const startTimeStr = ev.start.dateTime || ev.start.date + 'T00:00:00';
            const endTimeStr = ev.end.dateTime || ev.end.date + 'T23:59:59';

            return {
                start: DateTime.fromISO(startTimeStr, { zone: timezone }),
                end: DateTime.fromISO(endTimeStr, { zone: timezone }),
            };
        });

        // ✅ Current time in user's timezone
        const now = DateTime.now().setZone(timezone);

        // ✅ Slots generate
        while (start < end) {
            const slotStart = start;
            const slotEnd = start.plus({ minutes: durationMinutes });

            let available = true;

            // Past time check
            if (slotStart < now) {
                available = false;
            }

            // Booked check
            if (bookedTimes.some(booked =>
                slotStart < booked.end && slotEnd > booked.start
            )) {
                available = false;
            }

            slots.push({
                start: slotStart.toISO(), // ✅ ISO with timezone offset
                end: slotEnd.toISO(),
                available,
            });

            start = slotEnd;
        }

        res.json(slots);

    } catch (err) {
        console.error("Slots error:", err);
        res.status(500).json({
            message: "Error fetching slots",
            error: err.message
        });
    }
});

module.exports = router;