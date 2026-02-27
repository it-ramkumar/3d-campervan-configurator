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

        console.log("🔍 CREATE EVENT REQUEST:");
        console.log("Timezone from frontend:", timezone);
        console.log("Start time from frontend:", startTime);

        const calendar = google.calendar({ version: "v3", auth: oauth2Client });

        // ✅ Frontend se aayi timezone use karo (fallback California)
        const userTimezone = timezone || 'America/Los_Angeles';

        // ✅ ISO string ko user timezone mein parse karo
        const eventStart = DateTime.fromISO(startTime, { zone: userTimezone });
        const eventEnd = DateTime.fromISO(endTime, { zone: userTimezone });

        console.log("Parsed Start (with TZ):", eventStart.toISO());
        console.log("Parsed Start (UTC):", eventStart.toUTC().toISO());

        // Availability check
        const events = await calendar.events.list({
            calendarId: "primary",
            timeMin: eventStart.toUTC().toISO(),
            timeMax: eventEnd.toUTC().toISO(),
            singleEvents: true,
        });

        if (events.data.items.length > 0) {
            return res.status(400).json({ message: "Time slot already booked" });
        }

        // ✅ Event create - USER TIMEZONE MEIN
        const event = {
            summary: summary || `Meeting with ${name}`,
            description: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\n\n${description || ""}`,
            start: {
                dateTime: eventStart.toISO(), // ✅ ISO with offset
                timeZone: userTimezone // ✅ California timezone
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

        console.log("📅 Creating event with timezone:", userTimezone);

        const response = await calendar.events.insert({
            calendarId: "primary",
            resource: event,
            conferenceDataVersion: 1,
            sendUpdates: 'all'
        });

        console.log("✅ Event created successfully");

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
        // ✅ DEFAULT timezone America/Los_Angeles (California)
        const { date, timezone = 'America/Los_Angeles' } = req.query;

        console.log("🔍 SLOTS REQUEST:");
        console.log("Date:", date);
        console.log("Timezone:", timezone);

        const startHour = 9, endHour = 17, durationMinutes = 30;
        const slots = [];

        // ✅ User timezone mein parse karo
        let start = DateTime.fromISO(date, { zone: timezone })
            .set({ hour: startHour, minute: 0, second: 0, millisecond: 0 });

        if (!start.isValid) {
            return res.status(400).json({ message: "Invalid date or timezone" });
        }

        let end = DateTime.fromISO(date, { zone: timezone })
            .set({ hour: endHour, minute: 0, second: 0, millisecond: 0 });

        console.log("Start time:", start.toISO());
        console.log("End time:", end.toISO());

        const calendar = google.calendar({ version: "v3", auth: oauth2Client });

        const events = await calendar.events.list({
            calendarId: "primary",
            timeMin: start.toUTC().toISO(),
            timeMax: end.toUTC().toISO(),
            singleEvents: true,
        });

        const bookedTimes = events.data.items.map(ev => {
            const startTimeStr = ev.start.dateTime || ev.start.date + 'T00:00:00';
            const endTimeStr = ev.end.dateTime || ev.end.date + 'T23:59:59';

            return {
                start: DateTime.fromISO(startTimeStr, { zone: timezone }),
                end: DateTime.fromISO(endTimeStr, { zone: timezone }),
            };
        });

        const now = DateTime.now().setZone(timezone);

        while (start < end) {
            const slotStart = start;
            const slotEnd = start.plus({ minutes: durationMinutes });

            let available = true;

            if (slotStart < now) {
                available = false;
            }

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

        console.log(`✅ Generated ${slots.length} slots for ${timezone}`);
        res.json(slots);

    } catch (err) {
        console.error("❌ Slots error:", err);
        res.status(500).json({
            message: "Error fetching slots",
            error: err.message
        });
    }
});

module.exports = router;