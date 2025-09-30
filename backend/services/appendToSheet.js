const { google } = require("googleapis");
const sheets = google.sheets("v4");

const credentials = JSON.parse(process.env.GOOGLE_SHEET_CREDENTIALS);// tumhara downloaded key file

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"]
});

async function appendToSheet(spreadsheetId, data) {
  const client = await auth.getClient();
  const sheetApi = sheets.spreadsheets.values;

  await sheetApi.append({
    auth: client,
    spreadsheetId,
    range: "Sheet1!A1", // Sheet name aur starting cell
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [data]
    }
  });
}

module.exports = appendToSheet; // <-- ye sahi tarika hai
