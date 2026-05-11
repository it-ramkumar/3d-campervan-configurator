const express = require("express");
const { google } = require("googleapis");
const { DateTime } = require("luxon");
const router = express.Router();
// --- Telegram & Notification Logic ---
const TelegramBot = require('node-telegram-bot-api');
const cron = require('node-cron');
const sentAlerts = new Set();
const fs = require("fs");
const USERS_FILE = "users.json";

function loadUsers() {
    if (!fs.existsSync(USERS_FILE)) return [];
    return JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
}


const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

function saveUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const users = loadUsers();
    if (!users.includes(chatId)) {
        users.push(chatId);
        saveUsers(users);
    }
    bot.sendMessage(chatId, "✅ You're joined! You will now receive meeting reminders 🔔");
});
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
// ✅ Create event for 27 March 2026, 9:30 AM
router.get("/create-event-930am", async (req, res) => {
    try {
        const calendar = google.calendar({ version: "v3", auth: oauth2Client });

        // ✅ 27 March 2026, 9:30 AM Pakistan time
        const eventStart = DateTime.fromObject({
            year: 2026,
            month: 3,
            day: 27,
            hour: 9,
            minute: 30,
            second: 0
        }, { zone: 'Asia/Karachi' });

        const eventEnd = eventStart.plus({ minutes: 30 }); // 30 minute meeting

        console.log(`📅 Creating event for 27 March 2026:`);
        console.log(`Start: ${eventStart.toFormat('yyyy-MM-dd HH:mm:ss')} PKT`);
        console.log(`Start UTC: ${eventStart.toUTC().toISO()}`);
        console.log(`End: ${eventEnd.toFormat('yyyy-MM-dd HH:mm:ss')} PKT`);

        const event = {
            summary: "📅 Manual Test Event - 9:30 AM",
            description: "Test event created via route for 27 March 2026, 9:30 AM Pakistan time",
            start: {
                dateTime: eventStart.toISO(),
                timeZone: 'Asia/Karachi'
            },
            end: {
                dateTime: eventEnd.toISO(),
                timeZone: 'Asia/Karachi'
            },
            conferenceData: {
                createRequest: {
                    requestId: `manual-930am-${Date.now()}`,
                    conferenceSolutionKey: { type: "hangoutsMeet" }
                }
            }
        };

        const response = await calendar.events.insert({
            calendarId: "primary",
            resource: event,
            conferenceDataVersion: 1
        });

        // Calculate minutes until event
        const now = DateTime.now().setZone('Asia/Karachi');
        const minutesUntilEvent = Math.floor(eventStart.diff(now, 'minutes').minutes);

        res.json({
            message: "✅ Event created for 27 March 2026, 9:30 AM!",
            eventDetails: {
                title: event.summary,
                startTime: eventStart.toFormat('yyyy-MM-dd HH:mm:ss'),
                timezone: 'Asia/Karachi',
                minutesFromNow: minutesUntilEvent
            },
            eventId: response.data.id,
            meetLink: response.data.hangoutLink,
            alertInfo: {
                willAlert: minutesUntilEvent <= 16 && [15, 10, 5].includes(minutesUntilEvent),
                nextAlertAt: minutesUntilEvent > 15 ? "15 minutes before (9:15 AM)" :
                    minutesUntilEvent > 10 ? "10 minutes before (9:20 AM)" :
                        minutesUntilEvent > 5 ? "5 minutes before (9:25 AM)" : "Event time passed"
            },
            note: "Alert will come 5 minutes before (at 9:25 AM Pakistan time)"
        });

    } catch (error) {
        console.error("Event creation error:", error);
        res.status(500).json({
            error: error.message,
            note: "Make sure you're authenticated with Google Calendar"
        });
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
// ✅ Route: Create a test meeting 15 minutes from now (California Time)
router.get("/test-15min-meeting", ensureAuthenticated, async (req, res) => {
    try {
        const calendar = google.calendar({ version: "v3", auth: oauth2Client });

        // 1. California ka current time lo aur usme 15 mins add karo
        const HOST_TZ = 'America/Los_Angeles';
        const startTime = DateTime.now().setZone(HOST_TZ).plus({ minutes: 15 }).startOf('minute');
        const endTime = startTime.plus({ minutes: 30 }); // 30 min duration

        console.log(`🚀 Creating Test Meeting for: ${startTime.toISO()}`);

        const event = {
            summary: "🔥 Test Alert Meeting (15 Mins)",
            description: "Name: Test User\nEmail: test@example.com\nPhone: 123456789\n\nThis is a test event for telegram alerts.",
            start: {
                dateTime: startTime.toISO(),
                timeZone: HOST_TZ,
            },
            end: {
                dateTime: endTime.toISO(),
                timeZone: HOST_TZ,
            },
            conferenceData: {
                createRequest: {
                    requestId: `test-${Date.now()}`,
                    conferenceSolutionKey: { type: "hangoutsMeet" }
                }
            },
            // Google reminders (Optional, as you have your own Cron)
            reminders: {
                useDefault: false,
                overrides: [
                    { method: 'popup', minutes: 15 },
                ],
            },
        };

        const response = await calendar.events.insert({
            calendarId: "primary",
            resource: event,
            conferenceDataVersion: 1,
        });

        res.json({
            message: "✅ Meeting scheduled 15 minutes from now!",
            startTime_CA: startTime.toFormat('hh:mm a'),
            date: startTime.toFormat('yyyy-MM-dd'),
            meetLink: response.data.hangoutLink,
            note: "Ab 1-2 minute wait karein, Cron job check karke Telegram alert bhej degi."
        });

    } catch (error) {
        console.error("❌ Test Route Error:", error);
        res.status(500).json({ error: error.message });
    }
});
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
            { email: 'sales.bigbearvans@gmail.com' }         // Aapki dusri email (Permanent)
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
// ✅ SLOTS ENDPOINT - FIXED VERSION (Next Day Only)
router.get("/slots", ensureAuthenticated, async (req, res) => {
    try {
        const { date, timezone } = req.query;
        const HOST_TZ = process.env.HOST_TIMEZONE || 'America/Los_Angeles';

        console.log("🔍 SLOTS REQUEST:");
        console.log("User requested date:", date);
        console.log("User timezone:", timezone);
        console.log("HOST timezone (using for slots):", HOST_TZ);

        // ✅ NEW: Date validation - only allow next day onwards
        const requestedDate = DateTime.fromISO(date, { zone: HOST_TZ });
        const today = DateTime.now().setZone(HOST_TZ).startOf('day');
        const tomorrow = today.plus({ days: 1 });

        if (requestedDate < tomorrow) {
            return res.status(400).json({
                message: "Meetings can only be scheduled from tomorrow onwards",
                earliestDate: tomorrow.toISODate() // Send tomorrow's date to frontend
            });
        }

        const startHour = 9, endHour = 17, durationMinutes = 30;
        const slots = [];

        let start = DateTime.fromISO(date, { zone: HOST_TZ })
            .set({ hour: startHour, minute: 0, second: 0, millisecond: 0 });

        if (!start.isValid) {
            return res.status(400).json({ message: "Invalid date" });
        }

        let end = DateTime.fromISO(date, { zone: HOST_TZ })
            .set({ hour: endHour, minute: 0, second: 0, millisecond: 0 });

        console.log("Slots range (HOST TZ):", start.toISO(), "to", end.toISO());

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
                start: DateTime.fromISO(startTimeStr, { zone: HOST_TZ }),
                end: DateTime.fromISO(endTimeStr, { zone: HOST_TZ }),
            };
        });

        // ✅ REMOVED: Current time check since we're only allowing future dates anyway
        // const now = DateTime.now().setZone(HOST_TZ);

        while (start < end) {
            const slotStart = start;
            const slotEnd = start.plus({ minutes: durationMinutes });

            let available = true;

            // Only check for booking conflicts (no past time check needed)
            if (bookedTimes.some(booked =>
                slotStart < booked.end && slotEnd > booked.start
            )) {
                available = false;
            }

            slots.push({
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

        console.log(`✅ Generated ${slots.length} slots for ${date} (HOST TZ: ${HOST_TZ})`);
        res.json(slots);

    } catch (err) {
        console.error("❌ Slots error:", err);
        res.status(500).json({
            message: "Error fetching slots",
            error: err.message
        });
    }
});
router.get("/california-events", async (req, res) => {
    try {
        const calendar = google.calendar({ version: "v3", auth: oauth2Client });

        // ✅ California time use karo
        const californiaTime = new Date().toLocaleString("en-US", {
            timeZone: "America/Los_Angeles",
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });

        const now = new Date(californiaTime);
        const tomorrow = new Date(now.getTime() + (24 * 60 * 60 * 1000));

        console.log(`\n`);
        console.log(`Current: ${now}`);
        console.log(`Date: ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`);
        console.log(`Time: ${now.getHours()}:${now.getMinutes()}`);

        const response = await calendar.events.list({
            calendarId: 'primary',
            timeMin: now.toISOString(),
            timeMax: tomorrow.toISOString(),
            singleEvents: true,
            orderBy: 'startTime',
        });

        const events = response.data.items || [];

        console.log(`\n=== EVENTS (California Time) ===`);
        console.log(`Total Events: ${events.length}`);

        const eventList = events.map((event, index) => {
            const startTime = event.start.dateTime || event.start.date;

            // ✅ Event time ko California time mein convert karo
            const eventInCalifornia = new Date(startTime).toLocaleString("en-US", {
                timeZone: "America/Los_Angeles",
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });

            const eventDate = new Date(eventInCalifornia);

            console.log(`\n${index + 1}. ${event.summary}`);
            console.log(`   Raw: ${startTime}`);
            console.log(`   California: ${eventInCalifornia}`);
            console.log(`   Parsed: ${eventDate}`);
            console.log(`   Hour: ${eventDate.getHours()}, Minute: ${eventDate.getMinutes()}`);

            return {
                title: event.summary,
                rawTime: startTime,
                californiaTime: eventInCalifornia,
                parsedTime: eventDate.toString(),
                hour: eventDate.getHours(),
                minute: eventDate.getMinutes()
            };
        });

        res.json({
            californiaCurrentTime: now.toString(),
            totalEvents: events.length,
            events: eventList
        });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
});
// ✅ ADD THIS BEFORE CRON JOB
// ✅ ADD THIS FUNCTION BEFORE CRON JOB
const sendTelegramWithRetry = async (chatId, message, retries = 3) => {
    for (let i = 0; i < retries; i++) {
        try {
            await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
            console.log(`✅ Telegram Alert Sent Successfully!`);
            return true;
        } catch (error) {
            console.error(`❌ Bot send error (attempt ${i + 1}):`, error.message);

            if (i === retries - 1) {
                console.error(`❌ Failed after ${retries} attempts`);
                return false;
            }

            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
};

cron.schedule('* * * * *', async () => {
    try {
        const calendar = google.calendar({ version: "v3", auth: oauth2Client });

        // ✅ SIMPLE: Get current UTC time
        const nowUTC = new Date();

        // California is UTC-7 (PDT) - manually subtract 7 hours
        const californiaTime = new Date(nowUTC.getTime() - (7 * 60 * 60 * 1000));

        const currentHour = californiaTime.getUTCHours();
        const currentMinute = californiaTime.getUTCMinutes();
        const currentDate = californiaTime.getUTCDate();
        const currentMonth = californiaTime.getUTCMonth() + 1;
        const currentYear = californiaTime.getUTCFullYear();

        const shouldLog = currentMinute % 5 === 0;

        if (shouldLog) {
            console.log(`\n🔄 CALIFORNIA TIME: ${currentDate}/${currentMonth}/${currentYear} ${currentHour}:${currentMinute.toString().padStart(2, '0')}`);
        }

        // Today's events (California date)
        const todayStart = new Date(californiaTime.getUTCFullYear(), californiaTime.getUTCMonth(), californiaTime.getUTCDate(), 0, 0, 0);
        const todayEnd = new Date(californiaTime.getUTCFullYear(), californiaTime.getUTCMonth(), californiaTime.getUTCDate(), 23, 59, 59);

        const response = await calendar.events.list({
            calendarId: 'primary',
            timeMin: todayStart.toISOString(),
            timeMax: todayEnd.toISOString(),
            singleEvents: true,
            orderBy: 'startTime',
        });

        const events = response.data.items || [];

        for (const event of events) {
            const startTime = event.start.dateTime || event.start.date;

            // ✅ SIMPLE: Parse event time and convert to California
            const eventUTC = new Date(startTime);
            const eventCalifornia = new Date(eventUTC.getTime() - (7 * 60 * 60 * 1000));

            const eventHour = eventCalifornia.getUTCHours();
            const eventMinute = eventCalifornia.getUTCMinutes();
            const eventDate = eventCalifornia.getUTCDate();
            const eventMonth = eventCalifornia.getUTCMonth() + 1;
            const eventYear = eventCalifornia.getUTCFullYear();

            // Same date check
            const isSameDate = (eventYear === currentYear && eventMonth === currentMonth && eventDate === currentDate);

            if (!isSameDate) continue;

            const eventTotalMinutes = (eventHour * 60) + eventMinute;
            const currentTotalMinutes = (currentHour * 60) + currentMinute;
            const diffInMinutes = eventTotalMinutes - currentTotalMinutes;

            if (shouldLog) {
                console.log(`📊 "${event.summary}"`);
                console.log(`   Event (CA): ${eventDate}/${eventMonth} ${eventHour}:${eventMinute.toString().padStart(2, '0')}`);
                console.log(`   Current (CA): ${currentDate}/${currentMonth} ${currentHour}:${currentMinute.toString().padStart(2, '0')}`);
                console.log(`   Difference: ${diffInMinutes} minutes`);
            }

            if ([15, 10, 5].includes(diffInMinutes)) {
                const alertKey = `${event.id}-${diffInMinutes}`;

                if (sentAlerts.has(alertKey)) {
                    console.log(`⏭️ Alert already sent: ${event.summary} (${diffInMinutes} min)`);
                    continue;
                }

                console.log(`🚨 SENDING ${diffInMinutes} MIN ALERT: ${event.summary}`);
                console.log(`🔍 DEBUG: eventHour=${eventHour}, eventMinute=${eventMinute}`);

                // --- DATA EXTRACTION START ---
                // Description se Name aur Email nikalne ke liye (Regex use kar rahe hain)
                const desc = event.description || "";
                const nameMatch = desc.match(/Name:\s*(.*)/);
                const emailMatch = desc.match(/Email:\s*(.*)/);

                const clientName = nameMatch ? nameMatch[1] : "Not provided";
                const clientEmail = emailMatch ? emailMatch[1] : "Not provided";
                const meetLink = event.hangoutLink || "No Link Available";
                // --- DATA EXTRACTION END ---

                // ✅ FIXED: 12-hour format conversion
                let displayHour = eventHour;
                let period = 'AM';

                if (eventHour === 0) {
                    displayHour = 12; // 0 = 12 AM
                } else if (eventHour === 12) {
                    displayHour = 12; // 12 = 12 PM
                    period = 'PM';
                } else if (eventHour > 12) {
                    displayHour = eventHour - 12; // 13+ = 1+ PM
                    period = 'PM';
                }
                // else: 1-11 stays same with AM

                const eventTimeReadable = `${displayHour}:${eventMinute.toString().padStart(2, '0')} ${period}`;
                console.log(`🔍 DEBUG: Final time = ${eventTimeReadable}`);

                const alertMsg = `🔔 *REMINDER: Meeting in ${diffInMinutes} mins!*\n\n` +
                    `👤 *Client:* ${clientName}\n` +
                    `📧 *Email:* ${clientEmail}\n` +
                    `📌 *Topic:* ${event.summary || "No Title"}\n` +
                    `⏰ *Time:* ${eventTimeReadable} (CA Time)\n` +
                    `🔗 *Join Meeting:* [Click Here to Join](${meetLink})`;
                // Sab joined users ko bhejo
                const users = loadUsers(); // users.json se
                let anySuccess = false;

                for (const userId of users) {
                    const success = await sendTelegramWithRetry(userId, alertMsg);
                    if (success) anySuccess = true;
                }

                if (anySuccess) {
                    sentAlerts.add(alertKey);
                }
            }
        }

        if (sentAlerts.size > 50) {
            sentAlerts.clear();
        }

    } catch (error) {
        console.error("❌ Cron Job Error:", error.message);
    }
});
module.exports = router;