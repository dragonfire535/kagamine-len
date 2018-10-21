const { Command } = require('discord-akairo');

module.exports = class SkipCommand extends Command {
	constructor() {
		super('skip', {
			aliases: ['skip'],
			category: 'music',
			description: 'Skips the current song.',
			ownerOnly: true
		});
	}

	exec(msg) {
		const { current } = this.client.jukebox;
		this.client.jukebox.skip();
		return msg.util.send(`Skipped **${current.artist} - ${current.title}**.`);
	}
};
