// Twitter tweet finder

const Discord = require('discord.js');
const Twitter = require('twitter');

const cfg = require('../../config/config.json');

const twitterClient = new Twitter({
    consumer_key : cfg.twitter_consumer_key,
    consumer_secret : cfg.twitter_consumer_secret,
    access_token_key : cfg.twitter_access_token_key,
    access_token_secret : cfg.twitter_access_token_secret
});

module.exports = function (msg, args, DiscordClient) {

    if (args[0] === 'tweet' || args[0] === 'lasttweet' || args[0] === 'latesttweet') {

        getLastTweet()

    } else if (args[0] == 'user') {

        getUserInfo()

    }

    function getLastTweet () {

        twitterClient.get('statuses/user_timeline', {screen_name : msg.content.slice(14), count : 1}, function(err, tweet) {

            if(err) {

                if(err=="Error: HTTP Error: 401 Authorization Required") {

                        msg.channel.send('**[401]** Error. You are probably attempting to Request informations of a blocked, restricted or deleted account. Please change the username you typed.\nYou: (╯°□°）╯︵ ┻━┻')

                    } else if (err[0].code == 34) {

                        msg.channel.send('**[Twitter\'s 34]** Error. The Twitter account you Requested informations for does not exist. Please change the username you typed.\nYou: (╯°□°）╯︵ ┻━┻')

                    } else {

                        msg.channel.send('Error in getting informations from http://api.twitter.com/. Please excuse us.\nError :\n' + JSON.stringify(err))
                        msg.channel.send('Args :\n' + args[0])

                    }

            } else {

                const author = tweet[0].user.name + " (@" + tweet[0].user.screen_name + ") on Twitter"
                const tweeturl = "https://twitter.com/" + tweet[0].user.screen_name + "/status/" + tweet[0].id_str + "/"

                const embed = new Discord.RichEmbed()

                    .setTitle(tweet[0].created_at)
                    .setAuthor(author, tweet[0].user.profile_image_url, tweeturl)
                    .setDescription(tweet[0].text)
                    .setColor(cfg.color)
                    .setFooter("Likes: " + tweet[0].favorite_count + " Retweets: " + tweet[0].retweet_count)

                if (tweet[0].in_reply_to_screen_name) {

                    embed.setTitle("In reply of " + tweet[0].in_reply_to_screen_name)

                }

                if (tweet[0].entities.media != undefined) {

                    embed.setThumbnail(tweet[0].entities.media[0].media_url_https);

                }

                msg.channel.send(embed);

            }

        })

    }

    function getUserInfo () {

        twitterClient.get('users/lookup', {screen_name: msg.content.slice(14)}, function(err, user) {

            if (err) {

                console.log(err);

                if (err[0].code == 17) {

                    twitterClient.get('users/search', {q: args[1], count : 1}, function(err, user) {

                        if (!user[0]) {

                            const embed = new Discord.RichEmbed()
                                .setColor(cfg.color)
                                .setTitle('User not found!')
                                .setDescription('Please try again')

                            msg.channel.send(embed);

                            return;

                        };

                        const author = user[0].name + ' (' + user[0].screen_name + ')'
                        const footer = 'Followers: ' + user[0].followers_count
                        const desc = 'Tweets count: ' + user[0].statuses_count

                        const embed = new Discord.RichEmbed()
                            .setColor(cfg.color)
                            .setAuthor(author, '', user[0].url)
                            .setTitle(user[0].description)
                            .setThumbnail(user[0].profile_image_url_https)
                            .setFooter(footer)
                            .setDescription(desc)

                        if (user[0].verified) {

                            embed.setAuthor(author, 'https://ui-ex.com/images/twitter-transparent-badge-3.png', user[0].url);

                        }

                        msg.channel.send(embed);

                    })

                }

            } else {

                const author = user[0].name + ' (' + user[0].screen_name + ')'
                const footer = 'Followers: ' + user[0].followers_count

                const embed = new Discord.RichEmbed()
                    .setColor(cfg.color)
                    .setAuthor(author, '', user[0].url)
                    .setTitle(user[0].description)
                    .setThumbnail(user[0].profile_image_url_https)
                    .setFooter(footer)

                if (user[0].verified) {

                    embed.setAuthor(author, 'https://ui-ex.com/images/twitter-transparent-badge-3.png', user[0].url);

                }

                msg.channel.send(embed);

            }

        })

    }
    
}

