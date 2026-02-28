export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { fullName, emailAddr, phoneNum } = JSON.parse(event.body || "{}");

    if (!fullName || !emailAddr || !phoneNum) {
      return { statusCode: 400, body: JSON.stringify({ ok: false }) };
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    const text =
      `📩 New Contact Request (Gold UZB)\n\n` +
      `👤 ${fullName}\n📧 ${emailAddr}\n📞 ${phoneNum}`;

    const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text })
    });

    if (!tg.ok) return { statusCode: 502, body: JSON.stringify({ ok: false }) };

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch {
    return { statusCode: 500, body: JSON.stringify({ ok: false }) };
  }
}