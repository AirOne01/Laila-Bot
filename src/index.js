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
const commandAvatar = require('./commands/avatar');

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

                    console.log(typeof(DiscordClient.user.id));

                    commandAvatar(msg, args, DiscordClient);
                    break;

                

            }

        }

    }

})

DiscordClient.login(cfg.discordToken);