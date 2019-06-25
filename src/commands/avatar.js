// avatar.js
// A simple command that send an embed message of your avatar or the avatar of someone else.

const Discord = require('discord.js');

const cfg = require('../../config/config.json');

module.exports = function (msg, args, DiscordClient) {

    if (!args[0] || msg.mentions.users.first().id === msg.author.id) {
                                                // If no args are provided or the author asked for its own avatar
        embed = new Discord.RichEmbed()
            .setColor(cfg.color)
            .setTitle('Your avatar :')
            .setImage(msg.author.avatarURL);    // The bot simply send the message author's avatar

        msg.channel.send(embed);

    } else if (msg.mentions.users.first().id == DiscordClient.user.id) {
                                                // If the message author asked for the bot avatar:
        embed = new Discord.RichEmbed()
            .setColor(cfg.color)
            .setTitle('My avatar : (' + msg.mentions.users.first().tag + ')')
            .setImage(DiscordClient.user.avatarURL)
                                                // Send the bot avatar
        msg.channel.send(embed);

    } else if (msg.mentions.users.first()) {

        embed = new Discord.RichEmbed()
            .setColor(cfg.color)
            .setTitle(msg.mentions.users.first().username + '\'s avatar (' + msg.mentions.users.first().tag + ')')
            .setImage(msg.mentions.users.first().avatarURL)

        msg.channel.send(embed);

    } else {
                                                // Else

        embed = new Discord.RichEmbed()
            .setColor(cfg.color)
            .setTitle('Nope.')
            .setDescription('Please mention someone to get his avatar.')

        msg.channel.send(embed);

    }

}