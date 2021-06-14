module.exports = {
    name: 'item',
    description: "Embeds!",
    execute(message, args, Discord) {
        

        const newEmbed = new Discord.MessageEmbed()
        .setColor('$12312382')
        .setTitle('Members: ' + args)
        .setURL('http://212.237.131.28:13000')
        .setDescription('Members of the guild')
        .addFields(
            {name: 'Yarlen', value: 'Lvl: 64 \n Race: Tauren \n Class: Warrior'},
            {name: 'Yarlen', value: 'Lvl: 64 \n Race: Tauren \n Class: Warrior'},
            {name: 'Yarlen', value: 'Lvl: 64 \n Race: Tauren \n Class: Warrior'},
            {name: 'Yarlen', value: 'Lvl: 64 \n Race: Tauren \n Class: Warrior'},
        )
        //.setImage()
        .setFooter('Use $armory <name> for character information');
        message.channel.send(newEmbed)
    }

}