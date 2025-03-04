const axios = require('axios');

module.exports = async (context) => {
  try {
    const { client, m, text } = context;

    if (!text) {
      return m.reply("❌ Please specify the surah number or name.");
    }

    const surahNumber = text.trim();

    const apiUrl = `https://quran-endpoint.vercel.app/quran/${surahNumber}`;
    const response = await axios.get(apiUrl);
    const data = response.data.data;

    const messageText = `
*🕌 Quran: The Holy Book*
📜 Surah ${data.number}: ${data.asma.ar.long} (${data.asma.en.long})
Type: ${data.type.en}
Number of verses: ${data.ayahCount}
🔮 *Explanation (Urdu):* ${data.tafsir.id}
🔮 *Explanation (English):* ${data.tafsir.en}
    `;

    m.reply(messageText.trim());
  } catch (e) {
    console.error("Error fetching Quran data:", e);
    m.reply("❌ An error occurred. Please try again later.");
  }
};
