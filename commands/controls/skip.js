const Command = require('../../structures/Command');
const { escapeMarkdown } = require('discord.js');

module.exports = class SkipCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'skip',
			group: 'controls',
			memberName: 'skip',
			description: 'Skips the current song.',
			ownerOnly: true
		});
	}

	run(msg) {
		const { current } = this.client.jukebox;
		this.client.jukebox.skip();
		return msg.say(`Skipped **${escapeMarkdown(current.artist)} - ${escapeMarkdown(current.title)}**.`);
	}
};
