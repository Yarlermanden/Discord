const fetcher = require("../fetcher");

module.exports = {
    name: 'item',
    description: "Embeds!",
    async execute(message, args, Discord, fetcher) {
        const name = args.join('%20')
        const realName = args.join(' ')
        const itemId = await fetchIdFromName(name, realName)
        console.log(itemId)
        const item = await fetchItemFromId(fetcher, itemId)
        console.log(item)


        const newEmbed = new Discord.MessageEmbed()
        .setColor('$12312382')
        .setTitle('Item: ' + item.preview_item.name)
        .setURL('http://212.237.131.28:13000')
        .setDescription('')
        //.setImage()
        addFieldToEmbedFromItem(item, newEmbed)

        message.channel.send(newEmbed)
    }

}

let findItemRe = /"media":\s?{\s?"id":\s?((\d+))/g

async function fetchIdFromName(name, realName) {
    realName = realName.toLowerCase()
    const result = await fetcher.get('https://us.api.blizzard.com/data/wow/search/item?namespace=static-us&name.en_US=' + name + '&orderby=id&_page=1&')
    .then(text => JSON.parse(text))
    for (var i = 0; i < result.results.length; i++) {
        const itemName = result.results[i].data.name.en_US.toLowerCase()
        if(itemName.includes(realName)) {
            console.log('found')
            return result.results[i].data.id;
        }
    }
    //.then(text => findItemRe.exec(text)[1])
}

function fetchItemFromId(fetcher, id){
    return fetcher.get('https://us.api.blizzard.com/data/wow/item/' + id + '?namespace=static-classic-us&locale=en_US&')
    .then(text => JSON.parse(text))
}

function addFieldToEmbedFromItem(item, embed){
    embed.addFields(
        {name: 'Info', value: 'Quality: ' + item.preview_item.quality.type +
    "\n Slot: " + item.preview_item.inventory_type.type + 
    "\n Material: " + item.preview_item.item_subclass.name +
    "\n Binding: " + item.preview_item.binding.name},
    )
    handleStatsInfo(item, embed)
    handleSetInfo(item, embed)
    return embed
}

function handleStatsInfo(item, embed) {
    if(item.preview_item.stats != undefined) {
        var statsString = ""
        for(var i = 0; i < item.preview_item.stats.length; i++) {
            statsString += item.preview_item.stats[i].display.display_string + "\n"
        }
        embed.addFields(
            {name: "Stats", value: statsString}
        )
    }
}

function handleSetInfo(item, embed) {
    if(item.preview_item.set != undefined) {
        var effectString = ""
        for(var i = 0; i < item.preview_item.set.effects.length; i++) {
            effectString += item.preview_item.set.effects[i].display_string + "\n";
        }
        embed.addFields(
            {name: 'Set: ' +item.preview_item.set.display_string, value: effectString},
        )
    }
}

function handleSpellInfo(item, embed) {
    //spells
}

function handleExtraInfo(item, embed) {
    //stackable - max count
    //sell price
    //required lvl
    //item level
    
}
