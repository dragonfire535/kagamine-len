const Command = require('../../structures/Command');

module.exports = class PauseCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'pause',
			group: 'controls',
			memberName: 'pause',
			description: 'Pauses music playback.',
			ownerOnly: true
		});
	}

	run(msg) {
		if (this.client.jukebox.paused) return msg.reply('Playback is paused! Can\'t you hear the silence?');
		this.client.jukebox.pause();
		return msg.say('Paused playback.');
	}
};
