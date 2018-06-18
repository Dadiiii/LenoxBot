const Discord = require('discord.js');
exports.run = async(client, msg, args, lang) => {
	if (msg.guild.channels.filter(textChannel => textChannel.type === `text`).array().length !== 0) {
	const textchannelsembed = new Discord.RichEmbed()
	.setDescription(`**📋 ${lang.channels_textchannels}**\n${msg.guild.channels.filter(textChannel => textChannel.type === `text`).array().slice(0, 15).map(textchannel => `**#${textchannel.name}** (*${textchannel.id}*)`).join('\n')}`)
	.setColor(3447003);

	var textchannels = await msg.channel.send({ embed: textchannelsembed });

	if (msg.guild.channels.filter(textChannel => textChannel.type === `text`).array().length > 15) {
	var reaction1 = await textchannels.react('◀');
	var reaction2 = await textchannels.react('▶');
		
	var firsttext = 0;
	var secondtext = 15;

	var collector = textchannels.createReactionCollector((reaction, user) => user.id === msg.author.id, { time: 30000 });
	collector.on('collect', r => {
		var reactionadd = msg.guild.channels.filter(textChannel => textChannel.type === `text`).array().slice(firsttext + 15, secondtext + 15).length;
		var reactionremove = msg.guild.channels.filter(textChannel => textChannel.type === `text`).array().slice(firsttext - 15, secondtext - 15).length;

		if (r.emoji.name === '▶' && reactionadd !== 0) {
			r.remove(msg.author.id);
			const guildchannels = msg.guild.channels.filter(textChannel => textChannel.type === `text`).array().slice(firsttext + 15, secondtext + 15).map(textchannel => `**#${textchannel.name}** (*${textchannel.id}*)`);

			firsttext = firsttext + 15;
			secondtext = secondtext + 15;

			const newembed = new Discord.RichEmbed()
			.setColor(3447003)
			.setDescription(`**📋 ${lang.channels_textchannels}**\n${guildchannels.join("\n")}`);
		
			textchannels.edit({ embed: newembed });
	  	} else if (r.emoji.name === '◀' && reactionremove !== 0) {
			r.remove(msg.author.id);
			const guildchannels = msg.guild.channels.filter(textChannel => textChannel.type === `text`).array().slice(firsttext - 15, secondtext - 15).map(textchannel => `**#${textchannel.name}** (*${textchannel.id}*)`);

			firsttext = firsttext - 15;
			secondtext = secondtext - 15;
		
			const newembed = new Discord.RichEmbed()
			.setColor(3447003)
			.setDescription(`**📋 ${lang.channels_textchannels}**\n${guildchannels.join("\n")}`);
		
			textchannels.edit({ embed: newembed });
		}
	});
		collector.on('end',(collected, reason) => {
			reaction1.remove();
			reaction2.remove();
		});
	}
	} else {
		return msg.channel.send(lang.channels_notextchannels);
	}

	if (msg.guild.channels.filter(textChannel => textChannel.type === `voice`).array().length !== 0) {
	const voicechannelsembed = new Discord.RichEmbed()
	.setDescription(`**📡 ${lang.channels_voicechannels}**\n${msg.guild.channels.filter(voiceChannel => voiceChannel.type === `voice`).array().slice(0, 15).map(voicechannel => `**${voicechannel.name}** (*${voicechannel.id}*)`).join('\n')}`)
	.setColor(3447003);

	var voicechannels = await msg.channel.send({ embed: voicechannelsembed });

	if (msg.guild.channels.filter(textChannel => textChannel.type === `voice`).array().length > 15) {
	var reaction1 = await voicechannels.react('◀');
	var reaction2 = await voicechannels.react('▶');

	var firstvoice = 0;
	var secondvoice = 15;

	var collector = voicechannels.createReactionCollector((reaction, user) => user.id === msg.author.id, { time: 30000 });
	collector.on('collect', r => {
		var reactionadd = msg.guild.channels.filter(textChannel => textChannel.type === `voice`).array().slice(firstvoice + 15, secondvoice + 15).length;
		var reactionremove = msg.guild.channels.filter(textChannel => textChannel.type === `voice`).array().slice(firstvoice - 15, secondvoice - 15).length;

		if (r.emoji.name === '▶' && reactionadd !== 0) {
			r.remove(msg.author.id);
			const guildchannels = msg.guild.channels.filter(textChannel => textChannel.type === `voice`).array().slice(firstvoice + 15, secondvoice + 15).map(textchannel => `**#${textchannel.name}** (*${textchannel.id}*)`);

			firstvoice = firstvoice + 15;
			secondvoice = secondvoice + 15;

			const newembed = new Discord.RichEmbed()
			.setColor(3447003)
			.setDescription(`**📋 ${lang.channels_voicechannels}**\n${guildchannels.join("\n")}`);
		
			voicechannels.edit({ embed: newembed });
	  	} else if (r.emoji.name === '◀' && reactionremove !== 0) {
			r.remove(msg.author.id);
			const guildchannels = msg.guild.channels.filter(textChannel => textChannel.type === `voice`).array().slice(firstvoice - 15, secondvoice - 15).map(textchannel => `**#${textchannel.name}** (*${textchannel.id}*)`);

			firstvoice = firstvoice - 15;
			secondvoice = secondvoice - 15;
		
			const newembed = new Discord.RichEmbed()
			.setColor(3447003)
			.setDescription(`**📋 ${lang.channels_voicechannels}**\n${guildchannels.join("\n")}`);
		
			voicechannels.edit({ embed: newembed });
		}
	});
		collector.on('end',(collected, reason) => {
			reaction1.remove();
			reaction2.remove();
		});
	}
	} else {
		return msg.channel.send(lang.channels_novoicechannels);
	}
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
    userpermissions: [], dashboardsettings: true
};
exports.help = {
	name: 'channels',
	description: 'A list of all channels on your discord server',
	usage: 'channels',
	example: ['channels'],
	category: 'utility',
    botpermissions: ['SEND_MESSAGES']
};
