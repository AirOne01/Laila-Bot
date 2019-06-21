// Click the circles :)

const cfg = require('../../config/config.json');

const Discord = require('discord.js');
const osu = require('node-osu');

const osuAPI = new osu.Api(cfg.osuKey);

module.exports = function (msg, args, DiscordClient) {

    var username = '';

    function getUser () {

        osuAPI.getUser({u: username})
        .then(function(user) {
    
            const fieldScores = '**SS+** ' + user.counts.SSH + '\n**SS** ' + user.counts.SS + '\n**S+** ' + user.counts.SH + '\n**S** ' + user.counts.S + '\n**A** ' + user.counts.A + '\n**Accuracy**: ≈' + Math.round(user.accuracy*100)/100 + '%\n**PP: ' + user.pp.raw + '**'
            const fieldStats = '**Username**: ' + user.name + '\n**Number of plays**: ' + user.counts.plays + '\n**Country**: ' + user.country + ' :flag_' + user.country.toLowerCase() + ':\n**Level**: ' + Math.round(user.level) + '\n**Rank**: #' + user.pp.rank + '\n**Country Rank**: #' + user.pp.countryRank;
            const title = user.name + ' on osu!'
            const thumb = 'https://a.ppy.sh/' + user.id
            const link = 'https://osu.ppy.sh/users/' + user.id

            embed = new Discord.RichEmbed()
                .setColor(cfg.color)
                .setAuthor(title, '', link)
                .setThumbnail(thumb)
                .setFooter('osu!', 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Osu%21Logo_%282015%29.png')
                .addField('Scores :', fieldScores, true)
                .addField('Stats :', fieldStats, true);
    
            msg.channel.send(embed);
            
        })
        .catch(function(err) {
            if (err.message == 'User not found') {
                
                embed = new Discord.RichEmbed()
                    .setColor(cfg.color)
                    .setTitle('User not found!')
                    .setDescription('Please retry.')
    
                msg.channel.send(embed);
    
            } else {
                console.log('[osu!] ' + err)
    
                msg.channel.send('A sudden error occured when trying to get informations on osu! API.\nPlease try again later.')
            }

        })

    }

    if (args[0] == 'user') {

        username = msg.content.slice(11)

        getUser();

    } else {

        username = msg.content.slice(6)

        getUser();

    }

}