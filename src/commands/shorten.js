// URL shortener API caller command

const Discord = require('discord.js');

const request = require("request");
const cfg = require('../../config/config.json');

const requestHeaders = {
  "Content-Type": "application/json",
  "apikey": cfg.rebrandlyAPIKey,
  "workspace": cfg.rebrandlyWorkspaceID
}

module.exports = function(msg, args, DiscordClient) {

    const linkRequest = {
        destination: msg.content.slice(10),
        domain: { fullName: "rebrand.ly" }
    }

    request({
        uri: "https://api.rebrandly.com/v1/links",
        method: "POST",
        body: JSON.stringify(linkRequest),
        headers: requestHeaders
    }, (err, response, body) => {
        if(err){console.log(err);return}
        if(JSON.parse(body).shortUrl == undefined){

            embed = new Discord.RichEmbed()
                .setColor(cfg.color)
                .setTitle('Bad URL')
                .setDescription('Please provide a valid URL')

            msg.channel.send(embed);
            return;
        }
        
        embed = new Discord.RichEmbed()
            .setColor(cfg.color)
            .setTitle('Here is your shorten URL :')
            .setDescription('https://' + JSON.parse(body).shortUrl)
            .setFooter('Powered by Rebrandly', 'https://media.licdn.com/dms/image/C4D0BAQHCapJO5GdlOg/company-logo_200_200/0?e=2159024400&v=beta&t=PYV-ZJowR__p_jisy-MViJSWn5vCnY29bomltQlmQpI')

        msg.channel.send(embed);
    })

}



