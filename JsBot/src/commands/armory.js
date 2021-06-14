module.exports = {
    name: 'armory',
    description: "Embeds!",
    execute(message, args, Discord) {
        const newEmbed = new Discord.MessageEmbed()
        .setColor('$12312382')
        .setTitle('Armory: ' + args)
        .setURL('http://212.237.131.28:13000')
        .setDescription('Character details')
        .addFields(
            {name: 'Realm', value: 'Dreadmist'},
            {name: 'Lvl', value: '64'},
            {name: 'Race', value: 'Tauren'},
            {name: 'Class', value: 'Warrior'},
            {name: 'Spec', value: 'Prot'},
            {name: 'Gear', value: 
                `Head: bla bla \n 
                Shoulder: bla bla \n
                Neck: bla bla`
            },
            {name: 'Stats', value: 
                `Hp: 2991 \n
                Armor: 3000 \n
                Damage: 100`
            },
        )
        //.setImage()
        .setFooter('Use $item <name> to checkout each item');

        message.channel.send(newEmbed)
    }

}