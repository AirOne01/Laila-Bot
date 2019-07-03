// Hi, fellow traveller, and welcome to the
//   _           _ _                                                        _
//  | |         (_) |                                                      | |
//  | |     __ _ _| | __ _    ___  ___  _   _ _ __ ___ ___     ___ ___   __| | ___
//  | |    / _` | | |/ _` |  / __|/ _ \| | | | '__/ __/ _ \   / __/ _ \ / _` |/ _ \
//  | |___| (_| | | | (_| |  \__ \ (_) | |_| | | | (_|  __/  | (_| (_) | (_| |  __/
//  |______\__,_|_|_|\__,_|  |___/\___/ \__,_|_|  \___\___|   \___\___/ \__,_|\___|
//
// Made by IsekaiTensei
// Copyright IsekaiTensei 2019 (c)
// Also Stania best waifu.

const Discord = require('discord.js');                                  //////////
                                                                        //
const DiscordClient = new Discord.Client();                             // Import things
                                                                        //
const cfg = require('../config/config.json');                           //
const stc = require('../config/sentences.json');                        //
const commandAvatar = require('./commands/avatar.js');                  //
const commandGuildInfo = require('./commands/guildinfo.js');            //
const commandHelp = require('./commands/help.js');                      //
const commandMAL = require('./commands/mal.js');                        //
const commandMCserv = require('./commands/mc.js');                      //
const commandAudioMute = require('./commands/audioMute.js');            //
const commandOsu = require('./commands/osu.js');                        //
const commandTweet = require('./commands/tweet.js');                    //
                                                                        //
const prefix = cfg.prefix;                                              ////

var x = 0;                                                              // Var create

DiscordClient.on('ready', () => {                                       //////////
                                                                        // When the bot is connected
    console.log('Client connected as ' + DiscordClient.user.tag)        //
                                                                        //
})                                                                      ////

DiscordClient.on('message', (msg) => {                                  //////////
                                                                        // When a message is sent in any channel of any guild on wich the bot is connected
    if (!msg.author.bot) {                                              // If the sender is not a bot (prevent for bot to use Laila commands)
                                                                        //
        if (msg.content.startsWith(prefix)) {                           // If the message starts with the prefix (is meant to be a Laila command)
                                                                        //
            var args = msg.content.slice(prefix.length).split(' ');     // Get the arguments (after the command)
            var command = args.shift().toLowerCase();                   // Get the command (example: "l!HELLO" command is HELLO)
                                                                        //
            switch (command) {                                          // Starts a switch of the command
                                                                        //
                case 'avatar':                                          // If the command is avatar
                                                                        //
                    commandAvatar(msg, args, DiscordClient);            // Use the function commandAvatar
                    break;                                              // Then break so that the next command is not used after the avatar command
                                                                        //                    
                case 'osu':                                             // Same for the others command. Don't wanna explain that.
                                                                        //
                    commandOsu(msg, args, DiscordClient);               //
                    break;                                              //
                                                                        //
                case 'commands':                                        // Don't place break to make the arguments.
                case '?':                                               // If the command is "commands", the "commands" case will be read. 
                case 'cmd':                                             // Then the "?" case, then the "cmd" case and then the "help" case.
                case 'help':                                            // The "twitter" case will not be read becose fo the 'break'.
                                                                        //
                    commandHelp(msg, args, DiscordClient);              //
                    break;                                              //
                                                                        //
                case 'twitter':                                         //
                case 'tweet':                                           //
                                                                        //
                    commandTweet(msg, args, DiscordClient);             //
                    break;                                              //
                                                                        //
                case 'mcserv':                                          //
                                                                        //
                    commandMCserv(msg, args, DiscordClient);            //
                    break;                                              //
                                                                        //
                case 'mal':                                             //
                                                                        //
                    commandMAL(msg, args, DiscordClient);               // 'mal' for MyAnimeList
                    break;                                              //
                                                                        //
                case 'guild':                                           //
                case 'guildinfo':                                       //
                                                                        //
                    commandGuildInfo(msg, args, DiscordClient);         //
                    break;                                              //
                                                                        //
                case 'amute' :                                          //
                case 'audiomute' :                                      //
                                                                        //
                    commandAudioMute(msg, args, DiscordClient);         //
                    break;                                              //
            }                                                           //
                                                                        //
        }                                                               //
                                                                        //
        //if(!msg.mentions.users){return};                                // If the message don't have any mentions, return to avoid errors.
        //if(msg.mentions.users.first().id){msg.mentions.users.first().id};                     // If can't get the id of the mentionned user
                                                                        // Else
        const mention = '<@' + DiscordClient.user.id + '> ';            // Set a "mention" constant
                                                                        //
        if(msg.content.startsWith(mention)) {                           // If the message starts with the mention
                                                                        //
            while(x < stc.length) {                                     // Just a simple while loop to test if the sent text correspond to a configured sentence.
                                                                        //
                if(msg.content.replace(mention, '') == stc[x].text) {   // Get the text without the mention
                                                                        //
                    if(stc[x].resText) {                                // If there is only a basic and ugly text response
                                                                        //
                        msg.channel.send('<@' + msg.author.id + '> ' + stc[x].resText)
                                                                        // Send the response defined for the request
                    } else if(stc[x].resEmbed) {                        // If there is a beautiful Embed message as a response
                                                                        //
                        const embed = new Discord.RichEmbed()           //
                                                                        //
                        if(stc[x].resEmbed.color){embed.setColor(stc[x].resEmbed.color)}else{embed.setColor(cfg.color)}
                        if(stc[x].resEmbed.title){embed.setTitle(stc[x].resEmbed.title)}
                        if(stc[x].resEmbed.desc){embed.setDescription(stc[x].resEmbed.desc)}
                        if(stc[x].resEmbed.imageURL){embed.setImage(stc[x].resEmbed.imageURL)}
                                                                        //
                        msg.channel.send(embed);                        //
                    }                                                   //
                                                                        //
                }                                                       //
                                                                        //
                x++;                                                    // x incrementation
                                                                        //
            }                                                           //
                                                                        //
        }                                                               //
                                                                        //
    }                                                                   //
                                                                        //
})                                                                      ////

DiscordClient.on('guildCreate', (guild) => {                            //////////
                                                                        // When the bot joins a guild
    guild.owner.send('Laila Bot isn\'t usable for now. Come back when the bot is not in developpement state anymore :)')
    guild.leave();                                                      // Send the owner a message then leave the guild
})                                                                      ////

DiscordClient.login(cfg.discordToken)                                   //////////
    .catch(function(err) {                                              // Login with error "handler"
        console.log('Error while trying to login to Discord.\n[Djs] ' + err)
    })                                                                  ////