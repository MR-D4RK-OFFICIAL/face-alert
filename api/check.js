import fs from "fs";
import path from "path";
import fetch from "node-fetch";

export default async function handler(req, res) {
  const serpApiKey = "demo";
  const filePath = path.join(process.cwd(), "data.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const telegramToken = "8181909150:AAEpv4CuSo6D2BxqQcAXgMCowmZmDn51frY";
  const chatId = "6365572880";

  const results = [];
  let messageToSend = "";

  for (const user of data.users) {
    const searchUrl = `https://serpapi.com/search.json?engine=google_reverse_image&image_url=${encodeURIComponent(
      user.imageUrl
    )}&api_key=${serpApiKey}`;

    const response = await fetch(searchUrl);
    const result = await response.json();

    if (result.image_results && result.image_results.length > 0) {
      const foundAt = result.image_results[0].link;
      results.push({ name: user.name, foundAt });
      messageToSend += `📸 *${user.name}* এর ছবি পাওয়া গেছে!\n🔗 ${foundAt}\n\n`;
    }
  }

  if (messageToSend) {
    await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: messageToSend,
        parse_mode: "Markdown"
      })
    });
  }

  res.status(200).json({
    matches: results,
    message: results.length
      ? "Alert sent to Telegram 🚨"
      : "No matches found 😴"
  });
}
