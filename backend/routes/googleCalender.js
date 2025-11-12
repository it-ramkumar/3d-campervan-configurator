const express = require("express");
const { google } = require("googleapis");
const router = express.Router();

const oauth2Client = new google.auth.OAuth2(
  process.env.CALENDER_CLIENTID,
  process.env.CALENDER_CLIENT_SECRET,
  process.env.REDIRECT_URI
);

// ✅ SIMPLIFIED TOKEN SETUP
oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN
});

// ✅ REMOVE THIS - Yeh problem create kar raha hai
// oauth2Client.on('tokens', (tokens) => {
//   console.log('Token auto-refreshed');
// });

// ✅ SIMPLIFIED AUTHENTICATION CHECK
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
    // Simple check instead of token validation
    const hasToken = !!oauth2Client.credentials.refresh_token;
    res.json({ loggedIn: hasToken });
  } catch (error) {
    res.json({ loggedIn: false });
  }
});

// ✅ CREATE EVENT - WITH BETTER ERROR HANDLING
router.post("/create-event", ensureAuthenticated, async (req, res) => {
  try {
    const { name, email, phone, startTime, endTime, summary, description } = req.body;

    console.log("Creating event with data:", {
      name, email, startTime, endTime
    });

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    // ✅ Check if slot is available
    const events = await calendar.events.list({
      calendarId: "primary",
      timeMin: new Date(startTime).toISOString(),
      timeMax: new Date(endTime).toISOString(),
      singleEvents: true,
    });

    if (events.data.items.length > 0) {
      return res.status(400).json({
        message: "This time slot is already booked."
      });
    }

    // ✅ Create event
    const event = {
      summary: summary || `Meeting with ${name}`,
      description: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\n\n${description || ""}`,
      start: {
        dateTime: new Date(startTime).toISOString(),
        timeZone: 'America/Los_Angeles' // ✅ Apna timezone daalein
      },
      end: {
        dateTime: new Date(endTime).toISOString(),
        timeZone: 'America/Los_Angeles' // ✅ Apna timezone daalein
      },
      attendees: [{ email: email }],
      conferenceData: {
        createRequest: {
          requestId: `meet-${Date.now()}`,
          conferenceSolutionKey: { type: "hangoutsMeet" }
        }
      },
    };

    console.log("Event payload:", JSON.stringify(event, null, 2));

    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
      conferenceDataVersion: 1,
      sendUpdates: 'all'
    });

    console.log("Event created successfully:", response.data.id);

    res.json({
      message: "Booking successful",
      meetLink: response.data.hangoutLink ||
                (response.data.conferenceData?.entryPoints?.[0]?.uri || "No meet link"),
      eventId: response.data.id
    });

  } catch (err) {
    console.error("❌ EVENT CREATION ERROR:", err);
    console.error("Error details:", err.response?.data);

    res.status(500).json({
      message: "Error creating event",
      error: err.message,
      details: err.response?.data
    });
  }
});

// ✅ SLOTS ENDPOINT FIX
router.get("/slots", ensureAuthenticated, async (req, res) => {
  try {
    const { date } = req.query;
    const startHour = 9, endHour = 17, durationMinutes = 30;

    const slots = [];

    // ✅ ISO STRINGS USE KAREIN - Local ki jagah
    let start = new Date(`${date}T${startHour.toString().padStart(2,'0')}:00:00`);
    const end = new Date(`${date}T${endHour.toString().padStart(2,'0')}:00:00`);

    // Fetch booked events
    const calendar = google.calendar({ version: "v3", auth: oauth2Client });
    const events = await calendar.events.list({
      calendarId: "primary",
      timeMin: new Date(`${date}T00:00:00`).toISOString(),
      timeMax: new Date(`${date}T23:59:59`).toISOString(),
      singleEvents: true,
    });

    const bookedTimes = events.data.items.map(ev => ({
      start: new Date(ev.start.dateTime || ev.start.date),
      end: new Date(ev.end.dateTime || ev.end.date),
    }));

    while (start < end) {
      const slotStart = new Date(start);
      const slotEnd = new Date(start.getTime() + durationMinutes * 60000);

      const now = new Date();
      let available = true;

      // Disable past times
      if (slotStart < now) available = false;

      // Check if booked
      if (bookedTimes.some(booked => slotStart < booked.end && slotEnd > booked.start)) {
        available = false;
      }

      // ✅ ISO STRINGS BHEJEIN - Frontend ke liye consistent
      slots.push({
        start: slotStart.toISOString(), // ✅ ISO string
        end: slotEnd.toISOString(),     // ✅ ISO string
        available
      });
      start = slotEnd;
    }

    console.log(`Generated ${slots.length} slots for ${date}`);
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