const TelegramBot = require('node-telegram-bot-api');
const cron = require('node-cron');
const { DateTime } = require('luxon');
const { google } = require('googleapis');

// --- Telegram Config ---
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false });
const chatId = process.env.TELEGRAM_CHAT_ID;

// --- Cron Job: Every 1 Minute ---
cron.schedule('* * * * *', async () => {
    try {
        const HOST_TZ = process.env.HOST_TIMEZONE || 'America/Los_Angeles';
        const calendar = google.calendar({ version: "v3", auth: oauth2Client });

        // Current time in Host Timezone
        const now = DateTime.now().setZone(HOST_TZ);

        // Fetch events for the next 20 minutes
        const response = await calendar.events.list({
            calendarId: 'primary',
            timeMin: now.toUTC().toISO(),
            timeMax: now.plus({ minutes: 20 }).toUTC().toISO(),
            singleEvents: true,
            orderBy: 'startTime',
        });

        const events = response.data.items;

        if (!events || events.length === 0) return;

        for (const event of events) {
            const startTimeStr = event.start.dateTime || event.start.date;
            const eventStart = DateTime.fromISO(startTimeStr, { zone: HOST_TZ });

            // Difference calculate karein
            const diffInMinutes = eventStart.diff(now, 'minutes').minutes;

            // ✅ Exact 15 minute pehle alert (14.5 se 15.5 range safety ke liye)
            if (diffInMinutes > 14 && diffInMinutes <= 15) {
                const summary = event.summary || "Untitled Meeting";
                const meetLink = event.hangoutLink || "No Link Available";
                const displayTime = eventStart.toFormat('hh:mm a');

                const message = `🔔 **MEETING CALL!** 🔔\n\n` +
                                `📌 **Subject:** ${summary}\n` +
                                `⏰ **Start Time:** ${displayTime}\n` +
                                `🔗 **Join Here:** ${meetLink}\n\n` +
                                `Bhai phone uthao, meeting 15 min mein hai!`;

                await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
                console.log(`🚀 [${now.toLocaleString(DateTime.TIME_SIMPLE)}] Alert sent: ${summary}`);
            }
        }
    } catch (error) {
        // Agar token expire ho jaye toh handle karein
        console.error("❌ Alert Cron Error:", error.message);
    }
});