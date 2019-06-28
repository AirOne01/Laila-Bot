// Hi, fellow traveller, and welcome to the
//   _           _ _                                                        _
//  | |         (_) |                                                      | |
//  | |     __ _ _| | __ _    ___  ___  _   _ _ __ ___ ___     ___ ___   __| | ___
//  | |    / _` | | |/ _` |  / __|/ _ \| | | | '__/ __/ _ \   / __/ _ \ / _` |/ _ \
//  | |___| (_| | | | (_| |  \__ \ (_) | |_| | | | (_|  __/  | (_| (_) | (_| |  __/
//  |______\__,_|_|_|\__,_|  |___/\___/ \__,_|_|  \___\___|   \___\___/ \__,_|\___|
//
// Made by IsekaiTensei
// This code is provided under the GNU GPL License.

const Discord = require('discord.js');

const DiscordClient = new Discord.Client();

const cfg = require('../config/config.json');
const commandAvatar = require('./commands/avatar.js');
const commandGuildInfo = require('./commands/guildinfo.js');
const commandHelp = require('./commands/help.js');
const commandMAL = require('./commands/mal.js');
const commandMCserv = require('./commands/mc.js');
const commandAudioMute = require('./commands/audioMute.js');
const commandOsu = require('./commands/osu.js');
const commandTweet = require('./commands/tweet.js');

const prefix = cfg.prefix;

DiscordClient.on('ready', () => {

    console.log('Client connected as ' + DiscordClient.user.tag)

})

DiscordClient.on('message', (msg) => {

    if (!msg.author.bot) {

        if (msg.content.startsWith(prefix)) {

            var args = msg.content.slice(prefix.length).split(' ');
            var command = args.shift().toLowerCase();

            switch (command) {

                case 'avatar':

                    commandAvatar(msg, args, DiscordClient);
                    break;
                    
                case 'osu':

                    commandOsu(msg, args, DiscordClient);    
                    break;

                case 'commands':
                case '?':
                case 'cmd':
                case 'help':

                    commandHelp(msg, args, DiscordClient);
                    break;

                case 'twitter':
                case 'tweet':

                    commandTweet(msg, args, DiscordClient);
                    break;

                case 'mcserv':
                    
                    commandMCserv(msg, args, DiscordClient);
                    break;

                case 'mal':

                    commandMAL(msg, args, DiscordClient);
                    break;

                case 'guild':
                case 'guildinfo':

                    commandGuildInfo(msg, args, DiscordClient);
                    break;

                case 'amute' :
                case 'audiomute' :

                    commandAudioMute(msg, args, DiscordClient);
                    break;
            }

        }

    }

})

DiscordClient.on('guildCreate', (guild) => {

    guild.members.first().send('Laila Bot isn\'t usable for now. Come back when the bot is not in developpement state anymore :)')
    guild.leave();
})

DiscordClient.login(cfg.discordToken);