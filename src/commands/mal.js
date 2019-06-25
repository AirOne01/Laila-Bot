// Command to search animes and mangas on MyAnimeList via Jikan unofficial API wrapper.

const Discord = require('discord.js');
const Jikan = require('jikan-node');

const cfg = require('../../config/config.json');

const mal = new Jikan();

module.exports = function (msg, args, DiscordClient) {

    if(args[1]) {

        if(JSON.stringify(args[1]).slice(1, -1).length < 3) {

            msg.channel.send('Please enter a longer word.')
            return;
        }

    } else {

        msg.channel.send('Please enter a valid second word.')
        return;
    }

    if(!args[0]) {

        embed = new Discord.RichEmbed()
            .setColor(cfg.color)
            .setTitle('Incorrect usage')
            .setDescription('Type \"l!help mal\" for more info')

        msg.channel.send(embed);
    } else if (args[0] == 'anime') {

        mal.search('anime', msg.content.slice(12), {page : 0})
            .then(function(res) {

                const field = 'Type : ' + res.results[0].type + '\nEpisodes : ' + res.results[0].episodes + '\nMyAnimeList score : ' + res.results[0].score;
                
                const embed = new Discord.RichEmbed()
                    .setColor(cfg.color)
                    .setAuthor(res.results[0].title, '', res.results[0].url)
                    .setThumbnail(res.results[0].image_url)
                    .setTitle('Synopsis :')
                    .setDescription(res.results[0].synopsis)
                    .addField('Infos :', field, true)

                msg.channel.send(embed);
            })
            .catch(function(err) {
                console.log(err);
            })

    } else if (args[0] == 'manga') {

        mal.search('manga', msg.content.slice(12), {page : 0})
            .then(function(res) {

                const field = 'Volumes : ' + res.results[0].volumes + '\nChapters : ' + res.results[0].chapters + '\nMyAnimeList score : ' + res.results[0].score;
                
                const embed = new Discord.RichEmbed()
                    .setColor(cfg.color)
                    .setAuthor(res.results[0].title, '', res.results[0].url)
                    .setThumbnail(res.results[0].image_url)
                    .setTitle('Synopsis :')
                    .setDescription(res.results[0].synopsis)
                    .addField('Infos :', field, true)

                msg.channel.send(embed);
            })
            .catch(function(err) {
                console.log(err);
            })

    }

}