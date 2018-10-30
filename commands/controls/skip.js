const Command = require('../../structures/Command');

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
		return msg.say(`Skipped **${current.artist} - ${current.title}**.`);
	}
};
