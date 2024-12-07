const { DateTime } = require('luxon');
const fs = require('fs');

module.exports = async (context) => {
    const { client, m, totalCommands, mode, botname, prefix } = context;

    try {
        const categories = [
            { name: 'AI', emoji: '」' },
            { name: 'General', emoji: '」' },
            { name: 'Media', emoji: '」' },
            { name: 'Search', emoji: '」' },
            { name: 'Editting', emoji: '」' },
            { name: 'Groups', emoji: '」' },
            { name: 'Fun', emoji: '」' },
            { name: 'Owner', emoji: '」' },
            { name: 'Logo', emoji: '」' },
            { name: 'Coding', emoji: '」' },
            { name: 'Stalk', emoji: '」' }
        ];

        // Get greeting based on the time of day
        const getGreeting = () => {
            const currentHour = DateTime.now().setZone('Africa/Nairobi').hour;
            if (currentHour >= 5 && currentHour < 12) return 'Hello,,Good morning 🌅 hope you slept tight😁';
            if (currentHour >= 12 && currentHour < 18) return 'Good afternoon ☀️,,how is your day?';
            if (currentHour >= 18 && currentHour < 22) return 'Good evening 🌆,,hope you are fairing well gee😁';
            return 'Good night and have wonderful dreams 😴';
        };

        // Get current time in Nairobi
        const getCurrentTimeInNairobi = () => {
            return DateTime.now().setZone('Africa/Nairobi').toLocaleString(DateTime.TIME_SIMPLE);
        };

        let menuText = `╰►Hey, ${getGreeting()},\n\n`;

        // General information about the bot and user
        menuText += `╭━━━  ⟮  ${botname} ⟯━━━━━━┈⊷\n`;
        menuText += `┃✵╭──────────────\n`; 
        menuText += `┃✵│ ᴄᴏᴍᴍᴀɴᴅᴇʀ: ${m.pushName}\n`; 
        menuText += `┃✵│ ᴛᴏᴛᴀʟ ᴘʟᴜɢɪɴs: ${totalCommands}\n`;
        menuText += `┃✵│ ᴛɪᴍᴇ: ${getCurrentTimeInNairobi()}\n`;
        menuText += `┃✵│ ᴘʀᴇғɪx: ${prefix}\n`;
        menuText += `┃✵│ ᴍᴏᴅᴇ: ${mode}\n`;
        menuText += '┃✵│ ʟɪʙʀᴀʀʏ: Baileys\n';
        menuText += '┃✵╰──────────────\n';
        menuText += '╰━━━━━━━━━━━━━━━━━━┈⊷\n';

        menuText += '━━━━━━━━━━━━━━━━━━━━\n';
        menuText += '*┃𒊹┃𒊹┃𒊹┃𒊹┃𒊹┃𒊹┃𒊹┃𒊹┃:*\n\n';

        // Function to convert text to fancy uppercase font
        const toFancyUppercaseFont = (text) => {
            const fonts = {
                'A': '𝐀', 'B': '𝐁', 'C': '𝐂', 'D': '𝐃', 'E': '𝐄', 'F': '𝐅', 'G': '𝐆', 'H': '𝐇', 'I': '𝐈', 'J': '𝐉', 'K': '𝐊', 'L': '𝐋', 'M': '𝐌',
                'N': '𝐍', 'O': '𝐎', 'P': '𝐏', 'Q': '𝐐', 'R': '𝐑', 'S': '𝐒', 'T': '𝐓', 'U': '𝐔', 'V': '𝐕', 'W': '𝐖', 'X': '𝐗', 'Y': '𝐘', 'Z': '𝐙'
            };
            return text.split('').map(char => fonts[char] || char).join('');
        };

        // Function to convert text to fancy uppercase font for lowercase letters as well
        const toFancyLowercaseFont = (text) => {
            const fonts = {
                "a": "ᴀ", "b": "ʙ", "c": "ᴄ", "d": "ᴅ", "e": "ᴇ", "f": "ꜰ", "g": "ɢ", "h": "ʜ", "i": "ɪ", "j": "ᴊ", "k": "ᴋ", "l": "ʟ", "m": "ᴍ", 
                "n": "ɴ", "o": "ᴏ", "p": "ᴘ", "q": "ϙ", "r": "ʀ", "s": "ꜱ", "t": "ᴛ", "u": "ᴜ", "v": "ᴠ", "w": "ᴡ", "x": "x", "y": "ʏ", "z": "ᴢ"
            };
            return text.split('').map(char => fonts[char.toUpperCase()] || fonts[char] || char).join('');
        };

        let commandCounter = 1;

        // Loop through categories and commands
        for (const category of categories) {
            const commandFiles = fs.readdirSync(`./Cmds/${category.name}`).filter((file) => file.endsWith('.js'));
            const fancyCategory = toFancyUppercaseFont(category.name.toUpperCase());

            menuText += ` ╭─────「 ${fancyCategory} ${category.emoji}───┈⊷ \n`;
            for (const file of commandFiles) {
                const commandName = file.replace('.js', '');
                const fancyCommandName = toFancyLowercaseFont(commandName);
                menuText += ` ││◦➛  ${commandCounter}. ${fancyCommandName}\n`;
                commandCounter++;
            }

            menuText += ' ╰──────────────┈⊷ \n';
        }

        // Send the generated menu to the user
        try {
            await client.sendMessage(m.chat, {
                text: menuText,
                contextInfo: {
                    mentionedJid: [m.sender], // Mention the sender
                    externalAdReply: {
                        title: "🌟 𝐊𝐄𝐈𝐓𝐇-𝐌𝐃 ✨",
                        body: "𝐫𝐞𝐠𝐚𝐫𝐝𝐬 𝐊𝐞𝐢𝐭𝐡𝐤𝐞𝐢𝐳𝐳𝐚𝐡",
                        thumbnailUrl: "https://i.imgur.com/v9gJCSD.jpeg",
                        sourceUrl: "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47",
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            });
        } catch (error) {
            console.error("Error sending message:", error);
            m.reply('An error occurred while sending the menu.');
        }

    } catch (error) {
        console.error("Error:", error);
        m.reply('An unexpected error occurred while generating the menu.');
    }
};
