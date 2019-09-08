// Youtube audio play

const Discord = require('discord.js');
const ytdl = require('ytdl-core');

module.exports = function (msg, args, DiscordClient) {

    const VoiceChannel = msg.member.voiceChannel;

    if (!VoiceChannel) {
        return msg.reply('please join a voice channel first!');
    }

    VoiceChannel.join().then(connection => {
        const stream = ytdl('https://www.youtube.com/watch?v=D57Y1PruTlw', { filter: 'audioonly' });
        const dispatcher = connection.playStream(stream);

        dispatcher.on('end', () => VoiceChannel.leave());
    })
        .catch(err => {
            console.log(err);
        })

}