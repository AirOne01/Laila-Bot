// Guild informations command

const cfg = require('../../config/config.json');

const Discord = require('discord.js');

module.exports = function (msg, args, DiscordClient) {

    if(!args[0]) {

        var textChannels = 0, voiceChannels = 0;

        msg.guild.channels.findAll('type', 'text').forEach(() => {
            textChannels++;
        })

        msg.guild.channels.findAll('type', 'voice').forEach(() => {
            voiceChannels++;
        })

        const desc = 'Members : ' + msg.guild.memberCount + '\nOwner : ' + msg.guild.owner + '\nRegion : ' + msg.guild.region + '\nText channels : ' + textChannels + '\nVoice channels : ' + voiceChannels;

        embed = new Discord.RichEmbed()
            .setColor(cfg.color)
            .setAuthor(msg.guild.name)
            .setDescription(desc)

        if(msg.guild.iconURL != null) {embed.setThumbnail(msg.guild.iconURL)}

        msg.channel.send(embed);
    }

}