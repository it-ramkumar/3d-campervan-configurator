const express = require("express");
const { google } = require("googleapis");
const router = express.Router();

const oauth2Client = new google.auth.OAuth2(
  process.env.CALENDER_CLIENTID,
  process.env.CALENDER_CLIENT_SECRET,
  process.env.REDIRECT_URI
);

// ✅ ONE-TIME SETUP: Initialize with stored refresh token
oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN
});

// ✅ Automatic token refresh
oauth2Client.on('tokens', (tokens) => {
  console.log('Token auto-refreshed');
});

// ✅ Token validation middleware
const ensureAuthenticated = async (req, res, next) => {
  try {
    await oauth2Client.getAccessToken();
    next();
  } catch (error) {
    console.log('Token expired, need re-authentication');
    res.status(401).json({
      message: "Re-authentication required",
      authUrl: `/calendar/auth/url`
    });
  }
};

// Step 1: Generate Auth URL (for one-time setup)
router.get("/auth/url", (req, res) => {
  const scopes = ["https://www.googleapis.com/auth/calendar"];
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: scopes,
  });
  res.send({ url });
});

// Step 2: OAuth callback (for one-time setup)
router.get("/auth/callback", async (req, res) => {
  const code = req.query.code;
  try {
    const { tokens } = await oauth2Client.getToken(code);

    // ✅ Save this refresh token in your .env file
    console.log("=== SAVE THIS IN YOUR .env FILE ===");
    console.log("REFRESH_TOKEN=" + tokens.refresh_token);
    console.log("===================================");

    oauth2Client.setCredentials(tokens);
    res.send(`
      <h1>Authentication Successful!</h1>
      <p>Save the refresh token in your .env file as REFRESH_TOKEN</p>
      <p>You can close this tab now.</p>
    `);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error during authentication");
  }
});

// ✅ Status check
router.get("/status", async (req, res) => {
  try {
    await oauth2Client.getAccessToken();
    res.json({ loggedIn: true });
  } catch (error) {
    res.json({ loggedIn: false });
  }
});

// ✅ Protected routes - use middleware
router.post("/create-event", ensureAuthenticated, async (req, res) => {
  // ... your existing create-event code
  try {
    const { name, email, phone, startTime, endTime, summary, description } = req.body;

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    // Check if slot is available
    const events = await calendar.events.list({
      calendarId: "primary",
      timeMin: new Date(startTime).toISOString(),
      timeMax: new Date(endTime).toISOString(),
      singleEvents: true,
    });

    if (events.data.items.length > 0) {
      return res.status(400).json({ message: "This time slot is already booked." });
    }

    // Create event
    const event = {
      summary: `${summary} - ${name}`,
      description: `${description}\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}`,
      start: { dateTime: startTime },
      end: { dateTime: endTime },
      conferenceData: { createRequest: { requestId: `id-${Date.now()}` } },
    };

    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
      conferenceDataVersion: 1,
    });

    res.json({
      message: "Booking successful",
      meetLink: response.data.conferenceData.entryPoints[0].uri,
      event: response.data,
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating event");
  }
});

router.get("/slots", async (req, res) => {
  try {
    const { date } = req.query;
    const startHour = 9, endHour = 17, durationMinutes = 30;

    const slots = [];
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
      start: new Date(ev.start.dateTime),
      end: new Date(ev.end.dateTime),
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

      slots.push({ start: slotStart, end: slotEnd, available });
      start = slotEnd;
    }

    res.json(slots);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching slots");
  }
});

module.exports = router;