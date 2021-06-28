require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const fetcher = require('./fetcher.js');

const bot = new Discord.Client();
const PREFIX = "$";
bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./src/commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles){
    const command = require('./commands/' + file);
    bot.commands.set(command.name, command);
}

bot.on('message', message => {
    if(!message.content.startsWith(PREFIX) || message.author.bot) return;

    const args = message.content.slice(PREFIX.length).split(' ');
    const command = args.shift().toLowerCase();

    switch(command) {
        case "armory":
            bot.commands.get('armory').execute(message, args, Discord)
            break;
        case "members":
            bot.commands.get('members').execute(message, args, Discord)
            break;
        case "item":
            bot.commands.get('item').execute(message, args, Discord, fetcher)
            break;
    }
});

bot.login(process.env.DISCORDJS_BOT_TOKEN);
