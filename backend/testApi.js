const axios = require("axios");
const API_URL = "http://localhost:3000/api/channel-estimate"; // apni api ka route daalna

async function testApi() {
  try {
    console.log("🔹 Sending valid request...");
    const res = await axios.post(API_URL, {
      channelUrl: "https://www.youtube.com/@Google",
    });

    console.log("✅ Response Data:");
    console.log(res.data);

    console.log("\n🔹 Checking Security Headers...");
    console.log(res.headers);

  } catch (error) {
    if (error.response) {
      console.error("❌ Error Response:", error.response.data);
    } else {
      console.error("❌ Request Failed:", error.message);
    }
  }
}

// Test invalid request
async function testInvalidUrl() {
  try {
    console.log("\n🔹 Sending invalid request...");
    const res = await axios.post(API_URL, {
      channelUrl: "invalid-url",
    });
    console.log("❌ Should not pass:", res.data);
  } catch (error) {
    console.log("✅ Invalid URL handled correctly:", error.response.data);
  }
}

// Test rate limit
async function testRateLimit() {
  console.log("\n🔹 Testing rate limit (sending 7 quick requests)...");
  for (let i = 1; i <= 7; i++) {
    try {
      const res = await axios.post(API_URL, {
        channelUrl: "https://www.youtube.com/@Google",
      });
      console.log(`Request ${i}: ✅ Success`);
    } catch (error) {
      console.log(`Request ${i}: ❌ ${error.response?.data?.error}`);
    }
  }
}

(async () => {
  await testApi();
  await testInvalidUrl();
  await testRateLimit();
})();
