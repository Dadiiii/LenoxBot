const LenoxCommand = require('../LenoxCommand.js');

module.exports = class leaveCommand extends LenoxCommand {
	constructor(client) {
		super(client, {
			name: 'leave',
			group: 'utility',
			memberName: 'leave',
			description: 'Leave a self-assignable role',
			format: 'leave {rolename}',
			aliases: [],
			examples: ['leave Member'],
			clientPermissions: ['SEND_MESSAGES', 'MANAGE_ROLES'],
			userPermissions: [],
			shortDescription: 'Selfassignableroles',
			dashboardsettings: true
		});
	}

	run(msg) {
		const langSet = msg.client.provider.getGuild(msg.message.guild.id, 'language');
		const lang = require(`../../languages/${langSet}.json`);

		const args = msg.content.split(' ').slice(1);

		const addedrole = args.slice().join(' ');
		const foundRole = msg.guild.roles.find(role => role.name.toLowerCase() === args.slice().join(' ').toLowerCase());
		const author = msg.guild.members.get(msg.author.id);
		const channelID = msg.channel.id;

		if (addedrole.length < 1) return msg.reply(lang.leave_noinput);
		if (!foundRole) return msg.reply(lang.leave_rolenotexist);
		if (!msg.member.roles.has(foundRole.id)) return msg.reply(lang.leave_error);

		for (let i = 0; i < msg.client.provider.getGuild(msg.message.guild.id, 'selfassignableroles').length; i++) {
			if (foundRole.id === msg.client.provider.getGuild(msg.message.guild.id, 'selfassignableroles')[i]) {
				try {
					return author.removeRole(foundRole).then(m => m.guild.channels.get(channelID).send(lang.leave_roleremoved));
				} catch (error) {
					return msg.channel.send(lang.leave_nopermission);
				}
			}
		}
		return msg.reply(lang.join_notwhitelisted);
	}
};