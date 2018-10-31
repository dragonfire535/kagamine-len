const Command = require('../../structures/Command');
const { escapeMarkdown } = require('discord.js');

module.exports = class NowPlayingCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'now-playing',
			aliases: ['current', 'currentlyplaying', 'playing'],
			group: 'info',
			memberName: 'now-playing',
			description: 'Responds with the currently playing song.',
			ownerOnly: true
		});
	}

	run(msg) {
		const { current } = this.client.jukebox;
		return msg.say(`Currently playing **${escapeMarkdown(current.artist)} - ${escapeMarkdown(current.title)}**.`);
	}
};
