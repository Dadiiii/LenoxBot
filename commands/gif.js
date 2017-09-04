const got = require('got');
const API_KEY = 'dc6zaTOxFJmzC';
const Discord = require('discord.js');

exports.run = async (client, msg, args) => {
	if (args.length < 1) {
        msg.channel.send('You have to specify which GIF you would like to search for!').then(m => m.delete(10000));
    }

    const res = await got(`http://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${encodeURIComponent(args.join(' '))}`, { json: true });

    if (!res || !res.body || !res.body.data) {
        msg.channel.send('Could not find a gif to your specification!').then(m => m.delete(10000));
    }

    const embed = new Discord.RichEmbed()
    .setImage(`${res.body.data.image_url}`)
    .setAuthor(`${msg.author.tag}`, msg.author.displayAvatarURL)
    .setFooter('LenoxBot GIF')
	.setColor('#0066CC');
    msg.channel.send({ embed });
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: []
};
exports.help = {
	name: 'gif',
	description: 'Searches for a gif',
    usage: 'gif {input}',
    example: 'gif Discord',
	category: 'searches'
};
