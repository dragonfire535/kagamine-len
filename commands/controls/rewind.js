const { Command } = require('discord-akairo');

module.exports = class RewindCommand extends Command {
	constructor() {
		super('rewind', {
			aliases: ['rewind'],
			category: 'controls',
			description: 'Rewinds to the beginning of the current song.',
			ownerOnly: true
		});
	}

	exec(msg) {
		const { current } = this.client.jukebox;
		current.queueStart();
		this.client.jukebox.skip();
		return msg.util.send(`Rewinded to the beginning of **${current.artist} - ${current.title}**.`);
	}
};
