exports.run = async(client, msg, args, lang) => {
	const tableconfig = client.guildconfs.get(msg.guild.id);
	const number = args.slice();

	if (!tableconfig.skipnumber) {
		tableconfig.skipnumber = 1;
		await client.guildconfs.set(msg.guild.id, tableconfig);
	}

	var currentvotenumber = lang.skipnumber_currentvotenumber.replace('%skipnumber', `\`${tableconfig.skipnumber}\``);

	if (number.length === 0) return msg.channel.send(currentvotenumber);
	if (number.length > 1) return msg.channel.send(lang.skipnumber_error).then(m => m.delete(10000));
	if (isNaN(number)) return msg.channel.send(lang.skipnumber_noinput).then(m => m.delete(10000));
	if (number < 1) return msg.channel.send(lang.skipnumber_cannotbe0).then(m => m.delete(10000));

	tableconfig.skipnumber = number;
	await client.guildconfs.set(msg.guild.id, tableconfig);

	var changedskipvote = lang.skipnumber_changedskipvote.replace('%newskipnumber', number);
	
	return msg.channel.send(changedskipvote);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
    userpermissions: ['ADMINISTRATOR'], dashboardsettings: true
};

exports.help = {
	name: 'skipnumber',
	description: 'Changes the necessary votes to skip music for users',
	usage: 'skipnumber {number}',
	example: ['skipnumber 3'],
	category: 'administration',
    botpermissions: ['SEND_MESSAGES']
};
