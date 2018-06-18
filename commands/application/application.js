const Discord = require('discord.js');
exports.run = async (client, msg, args, lang) => {
	const tableload = client.guildconfs.get(msg.guild.id);

	if (!tableload.application) {
		tableload.application = {
			reactionnumber: '',
			template: [],
			role: '',
			votechannel: '',
			archivechannel: false,
			archivechannellog: '',
			status: 'false'
		};
		await client.guildconfs.set(msg.guild.id, tableload);
	}

	if (tableload.application.status === 'false') return msg.channel.send(lang.toggleapplication_error);

	var addentry = lang.application_addentry.replace('%prefix', tableload.prefix);
	if (tableload.application.template.length === 0) return msg.channel.send(addentry);

	var reactionnumber = lang.application_reactionnumber.replace('%prefix', tableload.prefix);
	if (tableload.application.reactionnumber === '') return msg.channel.send(reactionnumber);

	var undefinedmessages = lang.application_undefinedmessages.replace('%prefix', tableload.prefix);
	if (tableload.application.acceptedmessage === '' || tableload.application.rejectedmessage === '') return msg.channel.send(undefinedmessages);

	var newapplication = lang.application_newapplication.replace('%author', msg.author);
	msg.channel.send(newapplication);

	var array = [];

	for (var i = 0; i < tableload.application.template.length; i++) {
		try {
			await msg.channel.send(`${msg.author}, ${tableload.application.template[i]}`);
			var response = await msg.channel.awaitMessages(msg2 => msg2.attachments.size === 0 && msg.author.id === msg2.author.id && !msg2.author.bot, {
				maxMatches: 1,
				time: 300000,
				errors: ['time']
			});
			array.push(response.first().content);
			await response.first().delete();
		} catch (error) {
			var timeerror = lang.application_timeerror.replace('%prefix', tableload.prefix);
			return msg.channel.send(timeerror);
		}
	}

	var temparray = [];
	for (var i = 0; i < tableload.application.template.length; i++) {
		temparray.push(`${tableload.application.template[i]} \n${array[i]}`);
	}

	var content = temparray.join("\n\n");
	
	var confs = {
		guildid: msg.guild.id,
		authorid: msg.author.id,
		applicationid: tableload.application.applicationid + 1,
		date: msg.createdTimestamp,
		acceptedorrejected: '',
		status: "open",
		content: content,
		yes: [],
		no: []
	};

	tableload.application.applicationid = tableload.application.applicationid + 1;
	tableload.application.applications[tableload.application.applicationid] = confs;

	await client.guildconfs.set(msg.guild.id, tableload);

	await msg.channel.send(lang.application_applicatiosent);

	if (tableload.application.notificationstatus === true) {
		const applicationembedanswer = lang.mainfile_applicationembed.replace('%ticketid', tableload.application.applicationid);
		const embed = new Discord.RichEmbed()
			.setURL(`https://lenoxbot.com/dashboard/${confs.guildid}/applications/${tableload.application.applicationid}/overview`)
			.setTimestamp()
			.setColor('#ccffff')
			.setTitle(lang.mainfile_applicationembedtitle)
			.setDescription(applicationembedanswer);

		try {
			client.channels.get(tableload.application.notificationchannel).send({
				embed
			});
		} catch (error) {
			undefined;
		}
	}
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['apply'],
	userpermissions: [], dashboardsettings: true
};
exports.help = {
	name: 'application',
	description: 'Creates a new application on this server',
	usage: 'application',
	example: ['application'],
	category: 'application',
	botpermissions: ['SEND_MESSAGES']
};
