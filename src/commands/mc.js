// Command to ping a minecraft server

const Axios = require('axios');
const Discord = require('discord.js');

const cfg = require('../../config/config.json');

module.exports = function (msg, args, DiscordClient) {

    if(!args[0]) {

        embed = new Discord.RichEmbed()
            .setColor(cfg.color)
            .setTitle('Please type a server IP')

        msg.channel.send(embed);
    } else {
        const adress = 'https://api.mcsrvstat.us/2/' + args[0];

        Axios.get(adress)
            .then(function(res) {
                var motd = '';
                var players = '';

                if(res.data.online) {

                    motd = res.data.motd.clean[0] + '\n' + res.data.motd.clean[1];
                    players = 'Online : ' + res.data.players.online + '\nMax : ' + res.data.players.max;

                } else {

                    motd = 'This server is offline.'
                }

                const embed = new Discord.RichEmbed()
                    .setColor(cfg.color)
                    .addField('Motd :', motd, false)

                if(res.data.hostname && res.data.online) {

                    const title = '**' + res.data.hostname + '** is online'

                    embed.setTitle(title);
                }
                if(players!=''){embed.addField('Players :', players, false)};

                msg.channel.send(embed);

                

            })
            .catch(function(err) {
                console.log('\n' + args[0] + '\n\n' + err);
                console.log(adress);
            })
    }
    

}