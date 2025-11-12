const express = require("express");
const { google } = require("googleapis");
const { DateTime } = require("luxon"); // ✅ LUXON Import kiya gaya
const router = express.Router();

// --- Configuration ---
const oauth2Client = new google.auth.OAuth2(
  process.env.CALENDER_CLIENTID,
  process.env.CALENDER_CLIENT_SECRET,
  process.env.REDIRECT_URI
);

// ✅ SIMPLIFIED TOKEN SETUP
oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN
});

// Host ka time zone, jahan appointments hongi. Yeh event creation mein use hoga.
const HOST_TIMEZONE = process.env.HOST_TIMEZONE || 'America/Los_Angeles';

// --- Middleware ---
const ensureAuthenticated = async (req, res, next) => {
  try {
    // Simple check if we have credentials
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
    res.send(`
      <h1>Authentication Successful!</h1>
      <p>Save the refresh token in your .env file</p>
    `);
  } catch (err) {
    console.error("Callback error:", err);
    res.status(500).json({
      message: "Error during authentication",
      error: err.message
    });
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

// ✅ CREATE EVENT - Timezone ko HOST_TIMEZONE use karein
router.post("/create-event", ensureAuthenticated, async (req, res) => {
  try {
    const { name, email, phone, startTime, endTime, summary, description } = req.body;

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    // Availability Check: Slots generation mein check ho chuka hai, lekin double check accha hai.
    const events = await calendar.events.list({
      calendarId: "primary",
      timeMin: startTime, // Frontend se aayi ISO string use karein
      timeMax: endTime,   // Frontend se aayi ISO string use karein
      singleEvents: true,
    });

    if (events.data.items.length > 0) {
      return res.status(400).json({
        message: "This time slot is already booked."
      });
    }

    // ✅ Create event - Timezone HOST_TIMEZONE (Aapke calendar ka time zone) use karein
    const event = {
      summary: summary || `Meeting with ${name}`,
      description: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\n\n${description || ""}`,
      start: {
        // startTime mein ISO string aa rahi hai (e.g., 2025-11-12T10:00:00.000Z)
        dateTime: startTime,
        timeZone: HOST_TIMEZONE // Host ke time zone mein save karein
      },
      end: {
        dateTime: endTime,
        timeZone: HOST_TIMEZONE // Host ke time zone mein save karein
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
      sendUpdates: 'all'
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

// --- ✅ SLOTS ENDPOINT (LUXON FIX) ---
router.get("/slots", ensureAuthenticated, async (req, res) => {
  try {
    // User ki bheji hui date aur time zone
    const { date, timezone = 'America/Los_Angeles' } = req.query; // e.g., date='2025-11-12', timezone='Asia/Karachi'
    const startHour = 9, endHour = 17, durationMinutes = 30;
    const slots = [];

    // 1. User Time Zone mein din ki shuruaat (09:00) aur aakhir (17:00) Luxon se set karein
    let start = DateTime.fromISO(date, { zone: timezone })
      .set({ hour: startHour, minute: 0, second: 0, millisecond: 0 });

    // Agar date sahi se parse na ho (shouldn't happen if frontend is correct)
    if (!start.isValid) {
      return res.status(400).json({ message: "Invalid date or timezone provided." });
    }

    let end = DateTime.fromISO(date, { zone: timezone })
      .set({ hour: endHour, minute: 0, second: 0, millisecond: 0 });


    // 2. Booked events fetch karein (Calendar API ko range UTC mein chahiye)
    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    const timeMin = start.toUTC().toISO(); // User ke 9:00 AM ka UTC equivalent
    const timeMax = end.toUTC().toISO();   // User ke 5:00 PM ka UTC equivalent

    const events = await calendar.events.list({
      calendarId: "primary",
      timeMin: timeMin,
      timeMax: timeMax,
      singleEvents: true,
      timeZone: timezone, // Events ko user ke time zone mein wapas maange
    });

    // 3. Booked times ko Luxon objects mein convert karein
    const bookedTimes = events.data.items.map(ev => {
      // Event data mein time zone info hota hai, Luxon khud adjust kar lega.
      // Agar date string hai (all day event), to usko timezone mein set karein
      const startTimeStr = ev.start.dateTime || ev.start.date + 'T00:00:00';
      const endTimeStr = ev.end.dateTime || ev.end.date + 'T23:59:59';

      return {
        start: DateTime.fromISO(startTimeStr, { zone: ev.start.timeZone || timezone }),
        end: DateTime.fromISO(endTimeStr, { zone: ev.end.timeZone || timezone }),
      };
    });


    // 4. Slots Generate aur Check karein
    const now = DateTime.local().setZone(timezone); // Current time in user's timezone

    while (start.toMillis() < end.toMillis()) {
      const slotStart = start;
      const slotEnd = start.plus({ minutes: durationMinutes });

      let available = true;

      // Disable past times (User local time mein check)
      if (slotStart.toMillis() < now.toMillis()) {
        available = false;
      }

      // Check if booked (Timezone-aware Luxon comparison)
      if (bookedTimes.some(booked =>
        slotStart < booked.end && slotEnd > booked.start // Time overlap check
      )) {
        available = false;
      }

      slots.push({
        // Slots ko hamesha ISO string mein bhejein, taake frontend asani se handle kar sake
        // Luxon khud offset add kar dega (e.g., 2025-11-12T10:00:00.000+05:00)
        start: slotStart.toISO(),
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