const { Command } = require('discord-akairo');

module.exports = class NowPlayingCommand extends Command {
	constructor() {
		super('now-playing', {
			aliases: ['now-playing', 'current', 'currentlyplaying', 'playing'],
			category: 'music',
			description: 'Responds with the currently playing song.',
			ownerOnly: true
		});
	}

	exec(msg) {
		const { current } = this.client.jukebox;
		return msg.util.send(`Currently playing **${current.artist} - ${current.title}**.`);
	}
};
