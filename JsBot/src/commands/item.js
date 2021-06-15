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
        .setURL('https://classic.wowhead.com/item=' + item.id)
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
    handleDefaultInfo(item, embed)
    handleStatsInfo(item, embed)
    handleBonusStatsInfo(item, embed)
    handleSetInfo(item, embed)
    return embed
}

function handleDefaultInfo(item, embed) {
    var infoString = ""
    if(item.preview_item.quality != undefined) {
        infoString += "Quality: " + item.preview_item.quality.type + "\n"
    }
    if(item.preview_item.inventory_type != undefined) {
        infoString += "Slot: " + item.preview_item.inventory_type.type + "\n"
    }
    if(item.preview_item.item_subclass != undefined) {
        infoString += "Material: " + item.preview_item.item_subclass.name + "\n"
    }
    if(item.level != undefined) {
        infoString += "Item level: " + item.level + "\n"
    }
    if(item.required_level != undefined) {
        infoString += "Required level: " + item.required_level + "\n"
    }
    if(item.preview_item.binding != undefined) {
        infoString += item.preview_item.binding.name + "\n"
    }
    embed.addFields(
        {name: "Info", value: infoString}
    )
}

//default stats
//extra stats

function handleStatsInfo(item, embed) {
    handleWeaponInfo(item, embed)
    handleArmorInfo(item, embed)
}

function handleWeaponInfo(item, embed) {
    var info = ""
    if(item.preview_item.weapon != undefined) {
        console.log(item.preview_item.weapon)
        info += item.preview_item.weapon.damage.display_string + "\n"
        info += item.preview_item.weapon.attack_speed.display_string + "\n"
        info += item.preview_item.weapon.dps.display_string + "\n"
        if(item.preview_item.weapon.additional_damage != undefined) {
            for(var i = 0; i < item.preview_item.weapon.additional_damage.length; i++) {
                info += item.preview_item.weapon.additional_damage[i].display_string + "\n"
            }
        }

        embed.addFields(
            {name: "Stats", value: info}
        )
    }
}

function handleArmorInfo(item, embed) {
    if(item.preview_item.armor != undefined) {
        embed.addFields(
            {name: "Stats", value: item.preview_item.armor.display.display_string}
        )
    }
}

function handleBonusStatsInfo(item, embed) {
    if(item.preview_item.stats != undefined) {
        var statsString = ""
        for(var i = 0; i < item.preview_item.stats.length; i++) {
            statsString += item.preview_item.stats[i].display.display_string + "\n"
        }
        embed.addFields(
            {name: "Bonus stats", value: statsString}
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
