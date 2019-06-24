// Help command

const Discord = require('discord.js');

const cfg = require('../../config/config.json')

module.exports = function (msg, args, DiscordClient) {

    if (!args[0]) {

        embed = new Discord.RichEmbed()
            .setColor(cfg.color)
            .setTitle('Command list')
            .addField('Games', 'mcserv <IP>\nosu [user] <username>', true)
            .addField('Utility', 'avatar <@Username>\nhelp <command>', true);

        msg.channel.send(embed);
        
    } else {

        switch (args[0]) {

            case 'osu':
            case 'osu!':

                embed = new Discord.RichEmbed()
                    .setColor(cfg.color)
                    .setTitle('\'osu\' command')
                    .setDescription('Get you informations about osu players.\nUsage:\n```\nosu <username>\n```\nor\n```\nosu user <username>\n```')
                
                msg.channel.send(embed);
                break;
            
            case 'help':
            case 'commands':
            case 'cmd':
            case '?':

                embed = new Discord.RichEmbed()
                    .setColor(cfg.color)
                    .setTitle('\'help\' command')
                    .setDescription('Get you the list of all the bot commands or infotmations on a command.\nUsage:\n```\nhelp\n```\nor\n```\nhelp <command>\n```')
                    .addField('Other names:', 'help, ?, commands, cmd')

                msg.channel.send(embed);
                break;

            case 'mcserv':

                embed = new Discord.RichEmbed()
                    .setColor(cfg.color)
                    .setTitle('\'mcserv\' command')
                    .setDescription('Get informations about a Minecraft server.\nUsage:\n```\nmcser <IP>\n```')

                msg.channel.send(embed);
                break;

            default:

                const title = 'Unknow command \'' + args[0] + '\''
                const desc = 'Please retry or type \'' + cfg.prefix + 'help\' for a list of commands'

                embed = new Discord.RichEmbed()
                    .setColor(cfg.color)
                    .setTitle(title)
                    .setDescription(desc)

                msg.channel.send(embed);
                break;

        }

    }

}