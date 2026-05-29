// Replace your old http.createServer block with this:
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write("Bot is running!");
    res.end();
}).listen(process.env.PORT || 3000, () => {
    console.log("Web server listening for cron pings.");
});
const { Client, GatewayIntentBits, EmbedBuilder, ActivityType } = require('discord.js');
const http = require('http');

// 1. Keep-Alive Server for Render
http.createServer((req, res) => {
    res.write("Bot is running!");
    res.end();
}).listen(process.env.PORT || 3000);

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
    client.user.setActivity('Elite On Top', { type: ActivityType.Playing });
});

client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.content.startsWith(PREFIX)) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

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

    if (command === 'link') {
        await message.channel.send('https://venmo.com/u/tua_sigma2031');
    }
});

// 2. Using process.env to secure your token
client.login(process.env.DISCORD_TOKEN);
