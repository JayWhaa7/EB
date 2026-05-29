const { Client, GatewayIntentBits, EmbedBuilder, ActivityType } = require('discord.js');
const express = require('express');

// 1. Initialize Express Web Server for Render/Cron-job
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Elite Bot is Online and Running 24/7!');
});

app.listen(PORT, () => {
    console.log(`Web server is listening on port ${PORT}`);
});

// 2. Initialize Discord Bot
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const PREFIX = '.';

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    
    // Set Bot Activity Status
    client.user.setActivity('Elite On Top', { type: ActivityType.Playing });
});

client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.content.startsWith(PREFIX)) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // --- Price Command ---
    if (command === 'price') {
        const lowAccessId = '1426432894980853780';
        const fullAccessId = '1426432587618058261';
        const vipAccessId = '1426323721899081870';
        const headHunterId = '1426430292507234395';
        const staffId = '1426413845928345683';
        const headOfStaffId = '1426418275826401402';

        const descriptionText = 
            `<@&${lowAccessId}> **3$**\n` +
            `<@&${fullAccessId}> **5$**\n` +
            `<@&${vipAccessId}> **7$**\n` +
            `<@&${headHunterId}> **9$**\n` +
            `<@&${staffId}> **15$**\n` +
            `<@&${headOfStaffId}> **20$**`;

        const priceEmbed = new EmbedBuilder()
            .setTitle('💰 Price List')
            .setDescription(descriptionText)
            .setColor(0x000000);

        await message.channel.send({ embeds: [priceEmbed] });
    }

    // --- Link Command ---
    if (command === 'link') {
        await message.channel.send('https://venmo.com/u/tua_sigma2031');
    }
});

// Login using the environment variable on Render
client.login(process.env.DISCORD_TOKEN);
