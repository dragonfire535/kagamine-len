const Command = require('../../structures/Command');

module.exports = class RewindCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'rewind',
			group: 'controls',
			memberName: 'rewind',
			description: 'Rewinds to the beginning of the current song.',
			ownerOnly: true
		});
	}

	run(msg) {
		const { current } = this.client.jukebox;
		current.queueStart();
		this.client.jukebox.skip();
		return msg.say(`Rewinded to the beginning of **${current.artist} - ${current.title}**.`);
	}
};
