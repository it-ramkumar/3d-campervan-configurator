const express = require("express");
const { google } = require("googleapis");
const { DateTime } = require("luxon");
const router = express.Router();
// --- Telegram & Notification Logic ---
const TelegramBot = require('node-telegram-bot-api');
const cron = require('node-cron');


// Bot aur Chat ID (.env se)
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false });
const chatId = process.env.TELEGRAM_CHAT_ID;
// --- Configuration ---
// ✅ TEST ROUTE (Isse exact check karein)
router.get("/test-bot", async (req, res) => {
    console.log("Test-bot route hit!"); // Live logs mein check karne ke liye
    try {
        const chatId = process.env.TELEGRAM_CHAT_ID;
        await bot.sendMessage(chatId, "👋 Live Server Test: Bot is working!");
        res.send("<h1>Check your Telegram! Message sent from Live Server.</h1>");
    } catch (err) {
        console.error("Bot Error:", err.message);
        res.status(500).send("Bot Error: " + err.message);
    }
});
const oauth2Client = new google.auth.OAuth2(
    process.env.CALENDER_CLIENTID,
    process.env.CALENDER_CLIENT_SECRET,
    process.env.REDIRECT_URI
);

oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
});


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
        // console.log("=== SAVE THIS REFRESH TOKEN ===");
        // console.log("REFRESH_TOKEN=" + tokens.refresh_token);
        // console.log("===============================");
        // oauth2Client.setCredentials(tokens);
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
// ✅ CREATE TEST MEETING (5 minutes mein)
router.get("/create-test-meeting", async (req, res) => {
    try {
        const calendar = google.calendar({ version: "v3", auth: oauth2Client });
        const HOST_TZ = process.env.HOST_TIMEZONE || 'America/Los_Angeles';

        // 6 minute baad meeting banao (5 min alert ke liye)
        const now = DateTime.now().setZone(HOST_TZ);
        const meetingStart = now.plus({ minutes: 6 });
        const meetingEnd = meetingStart.plus({ minutes: 30 });

        console.log(`🧪 Creating test meeting at: ${meetingStart.toFormat('yyyy-MM-dd HH:mm:ss')} (${HOST_TZ})`);

        const testEvent = {
            summary: "🧪 TEST MEETING - Cron Alert Check",
            description: "This is a test meeting to check cron alerts. Delete after testing.",
            start: {
                dateTime: meetingStart.toISO(),
                timeZone: HOST_TZ
            },
            end: {
                dateTime: meetingEnd.toISO(),
                timeZone: HOST_TZ
            },
            conferenceData: {
                createRequest: {
                    requestId: `test-meet-${Date.now()}`,
                    conferenceSolutionKey: { type: "hangoutsMeet" }
                }
            }
        };

        const response = await calendar.events.insert({
            calendarId: "primary",
            resource: testEvent,
            conferenceDataVersion: 1
        });

        res.json({
            message: "✅ Test meeting created! Alert should come in 5 minutes.",
            meetingTime: meetingStart.toFormat('yyyy-MM-dd HH:mm:ss'),
            timezone: HOST_TZ,
            eventId: response.data.id,
            meetLink: response.data.hangoutLink,
            note: "Wait 5 minutes for Telegram alert. Check console logs."
        });

    } catch (error) {
        console.error("Test meeting creation error:", error);
        res.status(500).json({ error: error.message });
    }
});

// ✅ MANUAL CRON TRIGGER (Testing ke liye)
router.get("/test-cron-now", async (req, res) => {
    console.log("🧪 Manual cron trigger started...");

    try {
        const calendar = google.calendar({ version: "v3", auth: oauth2Client });
        const HOST_TZ = process.env.HOST_TIMEZONE || 'America/Los_Angeles';
        const now = DateTime.now().setZone(HOST_TZ);

        console.log(`⏰ Current time: ${now.toFormat('yyyy-MM-dd HH:mm:ss')} (${HOST_TZ})`);

        const response = await calendar.events.list({
            calendarId: 'primary',
            timeMin: now.toUTC().toISO(),
            timeMax: now.plus({ minutes: 16 }).toUTC().toISO(),
            singleEvents: true,
            orderBy: 'startTime',
        });

        const events = response.data.items || [];
        const eventDetails = events.map(e => {
            const eventStart = DateTime.fromISO(e.start.dateTime || e.start.date).setZone(HOST_TZ);
            const minutesFromNow = Math.floor(eventStart.diff(now, 'minutes').minutes);

            return {
                title: e.summary,
                start: eventStart.toFormat('yyyy-MM-dd HH:mm:ss'),
                minutesFromNow: minutesFromNow,
                shouldAlert: [15, 10, 5].includes(minutesFromNow)
            };
        });

        res.json({
            currentTime: now.toFormat('yyyy-MM-dd HH:mm:ss'),
            timezone: HOST_TZ,
            eventsFound: events.length,
            events: eventDetails,
            cronStatus: "Manual trigger completed - check console logs"
        });

    } catch (error) {
        console.error("Manual cron error:", error);
        res.status(500).json({ error: error.message });
    }
});

// ✅ CREATE EVENT - FIXED VERSION
router.post("/create-event", ensureAuthenticated, async (req, res) => {
    try {
        const { name, email, phone, startTime, endTime, summary, description, timezone } = req.body;

        const calendar = google.calendar({ version: "v3", auth: oauth2Client });

        // ✅ CRITICAL: Event hamesha HOST timezone mein create karo
        const HOST_TZ = process.env.HOST_TIMEZONE || 'America/Los_Angeles';

        // console.log("🔍 CREATE EVENT REQUEST:");
        // console.log("User timezone:", timezone);
        // console.log("HOST timezone (using for event):", HOST_TZ);
        // console.log("Start time from frontend:", startTime);

        // ✅ Frontend se aayi time ko pehle user timezone mein parse karo
        const userStart = DateTime.fromISO(startTime, { zone: timezone });
        const userEnd = DateTime.fromISO(endTime, { zone: timezone });

        // ✅ Phir HOST timezone mein convert karo
        const eventStart = userStart.setZone(HOST_TZ);
        const eventEnd = userEnd.setZone(HOST_TZ);

        // console.log("User time:", userStart.toISO());
        // console.log("HOST time:", eventStart.toISO());
        // console.log("UTC time:", eventStart.toUTC().toISO());

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

        // ✅ Build attendees list
    // ✅ Build attendees list
const attendees = [
    { email: email }, // User ki email (jo book kar raha hai)
    { email: 'sales.bigbearvans@gmail.com' } // Aapki dusri email (Permanent)
];


        // ✅ FIXED VERSION
        const event = {
            summary: summary || `Meeting with ${name}`,
            description: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\n\n${description || ""}`,
            start: {
                dateTime: userStart.toISO(), // ✅ User timezone use karo
                timeZone: timezone           // ✅ User ka timezone
            },
            end: {
                dateTime: userEnd.toISO(),   // ✅ User timezone use karo
                timeZone: timezone           // ✅ User ka timezone
            },
            attendees: attendees,
            // 🔔 Yahan Custom Reminders add ho rahe hain
    reminders: {
        useDefault: false, // Default settings ko band karke custom use karenge
        overrides: [
            // { method: 'email', minutes: 6 * 60 }, // 1 din pehle email
            { method: 'popup', minutes: 30 },      // 30 minute pehle phone/browser notification
            { method: 'popup', minutes: 15 },      // 15 minute pehle reminder
            { method: 'popup', minutes: 5 },       // 5 minute pehle last reminder
        ],
    },
            conferenceData: {
                createRequest: {
                    requestId: `meet-${Date.now()}`,
                    conferenceSolutionKey: { type: "hangoutsMeet" }
                }
            },
        };

        console.log("📅 Creating event in HOST timezone:", HOST_TZ);

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
        // ✅ CRITICAL: User timezone ignore karo, HOST timezone use karo
        const { date, timezone } = req.query; // User ka timezone receive karo but use mat karo slots generate karne ke liye

        // ✅ HOST TIMEZONE (jahan business operate hoti hai)
        const HOST_TZ = process.env.HOST_TIMEZONE || 'America/Los_Angeles';

        console.log("🔍 SLOTS REQUEST:");
        console.log("User requested date:", date);
        console.log("User timezone:", timezone);
        console.log("HOST timezone (using for slots):", HOST_TZ);

        const startHour = 9, endHour = 17, durationMinutes = 30;
        const slots = [];

        // ✅ HOST timezone mein din ki shuruaat (9 AM California time)
        let start = DateTime.fromISO(date, { zone: HOST_TZ })
            .set({ hour: startHour, minute: 0, second: 0, millisecond: 0 });

        if (!start.isValid) {
            return res.status(400).json({ message: "Invalid date" });
        }

        let end = DateTime.fromISO(date, { zone: HOST_TZ })
            .set({ hour: endHour, minute: 0, second: 0, millisecond: 0 });

        console.log("Slots range (HOST TZ):", start.toISO(), "to", end.toISO());

        const calendar = google.calendar({ version: "v3", auth: oauth2Client });

        // ✅ Booked events fetch (UTC mein)
        const events = await calendar.events.list({
            calendarId: "primary",
            timeMin: start.toUTC().toISO(),
            timeMax: end.toUTC().toISO(),
            singleEvents: true,
        });

        // ✅ Booked times ko HOST timezone mein convert
        const bookedTimes = events.data.items.map(ev => {
            const startTimeStr = ev.start.dateTime || ev.start.date + 'T00:00:00';
            const endTimeStr = ev.end.dateTime || ev.end.date + 'T23:59:59';

            return {
                start: DateTime.fromISO(startTimeStr, { zone: HOST_TZ }),
                end: DateTime.fromISO(endTimeStr, { zone: HOST_TZ }),
            };
        });

        // ✅ Current time in HOST timezone
        const now = DateTime.now().setZone(HOST_TZ);

        // ✅ Slots generate (HOST timezone mein)
        while (start < end) {
            const slotStart = start;
            const slotEnd = start.plus({ minutes: durationMinutes });

            let available = true;

            // Past time check (HOST timezone mein)
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
                // ✅ CRITICAL: Slots ko user ke timezone mein convert karke bhejo
                // Taake frontend pe user ko apne local time mein dikhe
                start: timezone
                    ? slotStart.setZone(timezone).toISO()
                    : slotStart.toISO(),
                end: timezone
                    ? slotEnd.setZone(timezone).toISO()
                    : slotEnd.toISO(),
                available,
            });

            start = slotEnd;
        }

        console.log(`✅ Generated ${slots.length} slots (HOST TZ: ${HOST_TZ})`);
        res.json(slots);

    } catch (err) {
        console.error("❌ Slots error:", err);
        res.status(500).json({
            message: "Error fetching slots",
            error: err.message
        });
    }
});

// ✅ ENHANCED CRON JOB WITH DETAILED LOGGING
cron.schedule('* * * * *', async () => {
    try {
        const calendar = google.calendar({ version: "v3", auth: oauth2Client });
        const HOST_TZ = process.env.HOST_TIMEZONE || 'America/Los_Angeles';
        const now = DateTime.now().setZone(HOST_TZ);

        // Har 5 minute mein detailed log, baaki mein silent
        const shouldLog = now.minute % 5 === 0;

        if (shouldLog) {
            console.log(`\n🔄 ===== CRON CHECK: ${now.toFormat('HH:mm:ss')} =====`);
        }

        const response = await calendar.events.list({
            calendarId: 'primary',
            timeMin: now.toUTC().toISO(),
            timeMax: now.plus({ minutes: 16 }).toUTC().toISO(),
            singleEvents: true,
            orderBy: 'startTime',
        });

        const events = response.data.items;

        if (shouldLog) {
            console.log(`📅 Found ${events?.length || 0} upcoming events`);
        }

        if (!events || events.length === 0) {
            if (shouldLog) {
                console.log("====\n");
            }
            return;
        }

        for (const event of events) {
            const startTimeStr = event.start.dateTime || event.start.date;
            const eventStart = DateTime.fromISO(startTimeStr);
            const eventStartInHostTZ = eventStart.setZone(HOST_TZ);

            const diffInMinutes = Math.floor(eventStartInHostTZ.diff(now, 'minutes').minutes);

            if (shouldLog) {
                console.log(`📊 "${event.summary}" - ${diffInMinutes} mins remaining`);
            }

            const reminderIntervals = [15, 10, 5];

            if (reminderIntervals.includes(diffInMinutes)) {
                const alertKey = `${event.id}-${diffInMinutes}`;

                if (sentAlerts.has(alertKey)) {
                    console.log(`⏭️ Alert already sent: ${event.summary} (${diffInMinutes} min)`);
                    continue;
                }

                console.log(`🚨 SENDING ${diffInMinutes} MIN ALERT: ${event.summary}`);

                const summary = event.summary || "Upcoming Meeting";
                const meetLink = event.hangoutLink || "No link";
                const timeStr = eventStartInHostTZ.toFormat('hh:mm a');

                const alertMsg = `🔔 **REMINDER: Meeting in ${diffInMinutes} mins!**\n\n` +
                                 `📌 **Topic:** ${summary}\n` +
                                 `⏰ **Time:** ${timeStr} (${HOST_TZ})\n` +
                                 `🔗 **Link:** ${meetLink}\n\n` +
                                 `Bhai, meeting ${diffInMinutes} minute mein shuru ho rahi hai!`;

                try {
                    await bot.sendMessage(chatId, alertMsg, { parse_mode: 'Markdown' });
                    sentAlerts.add(alertKey);
                    console.log(`✅ Telegram Alert Sent Successfully!`);
                } catch (botError) {
                    console.error(`❌ Bot send error:`, botError.message);
                }
            }
        }

        // Cleanup old alerts (memory management)
        if (sentAlerts.size > 50) {
            console.log("🧹 Cleaning up old alerts...");
            sentAlerts.clear();
        }

        if (shouldLog) {
            console.log("====\n");
        }

    } catch (error) {
        console.error("❌ Cron Job Error:", error.message);
    }
});

module.exports = router;