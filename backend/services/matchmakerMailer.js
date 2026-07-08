const nodemailer = require('nodemailer');

function buildTransporter() {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASS
    }
  });
}

function absoluteUrl(path) {
  const base = (process.env.FRONTEND_URL || '').replace(/\/$/, '');
  return `${base}${path}`;
}

function renderMatchLine(match) {
  return `<p style="margin:4px 0;">• ${match.title} (${match.type}) — <a href="${absoluteUrl(match.url)}">${absoluteUrl(match.url)}</a></p>`;
}

async function sendMatchmakerResultEmail(userInput, contact, result) {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASS) return;

  const transporter = buildTransporter();

  const matches = [];
  if (result?.primary_match) matches.push(result.primary_match);
  if (Array.isArray(result?.alternatives)) matches.push(...result.alternatives);

  const matchesHtml = result?.no_match_found
    ? `<p style="color:#555;">No layout matched — customer was directed to a custom build consultation.</p>`
    : matches.map(renderMatchLine).join('');

  const html = `
<div style="font-family:Arial,sans-serif;background:#f4f6f8;padding:20px;">
  <div style="max-width:600px;margin:auto;background:#fff;border-radius:10px;overflow:hidden;">
    <div style="background:#001F3D;padding:15px;text-align:center;">
      <h2 style="color:#fff;margin:0;font-size:18px;">New BBV Matchmaker Completion</h2>
    </div>
    <div style="padding:20px;">
      <div style="background:#fff7ed;border:1px solid #ED985F;padding:12px;border-radius:8px;margin-bottom:16px;">
        <p style="margin:0 0 8px 0;font-weight:700;color:#001F3D;">Contact Back</p>
        <p style="margin:5px 0;"><strong>Name:</strong> ${contact.name}</p>
        <p style="margin:5px 0;"><strong>Phone:</strong> <a href="tel:${contact.phone}">${contact.phone}</a></p>
        <p style="margin:5px 0;"><strong>Email:</strong> <a href="mailto:${contact.email}">${contact.email}</a></p>
      </div>
      <div style="background:#f9fafb;padding:12px;border-radius:8px;">
        <p style="margin:5px 0;"><strong>Seating Requirement:</strong> ${userInput.passengers}+ passengers</p>
        <p style="margin:5px 0;"><strong>Preferred Van Length:</strong> ${userInput.van_length}</p>
        <p style="margin:5px 0;"><strong>Bathroom Required:</strong> ${userInput.bathroom_required}</p>
        <p style="margin:5px 0;"><strong>Battery / Off-Grid AC Required:</strong> ${userInput.battery_ac_required} (budget indicator only — not used for filtering)</p>
      </div>
      <div style="margin-top:16px;">
        <p style="font-weight:700;color:#001F3D;">Top Matches</p>
        ${matchesHtml}
      </div>
    </div>
  </div>
</div>`;

  await transporter.sendMail({
    from: `"BBV Matchmaker" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    replyTo: contact.email,
    subject: `New Matchmaker Quiz Completion — ${contact.name}`,
    html
  });
}

module.exports = { sendMatchmakerResultEmail };
