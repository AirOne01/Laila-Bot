// A simple audio mute command

const cfg = require('../../config/config.json');

const Discord = require('discord.js');

module.exports = function(msg, args, DiscordClient) {

    if(!msg.member.hasPermission('MUTE_MEMBERS')) return;               // Return if the msg author can't mute peoples.

    if (!args[0] || !msg.mentions.members.first()) {

        msg.channel.send('Please mention someone to mute.')
    } else {

        const member = msg.mentions.members.first();

        if(member.mute) {

            member.setMute(false)
                .catch(function(err) {

                    if(err.code == 40032) {

                        embed = new Discord.RichEmbed()
                            .setColor(cfg.color)
                            .setTitle('The user is not connected in any voice channel')

                        msg.channel.send(embed);
                    } else {console.log(err)}
                })
        } else {

            member.setMute(true)

                .catch(function(err) {

                    if(err.code == 40032) {

                        embed = new Discord.RichEmbed()
                            .setColor(cfg.color)
                            .setTitle('The user is not connected in any voice channel')

                        msg.channel.send(embed);
                    } else {console.log(err)}
                })
        }
    }
}