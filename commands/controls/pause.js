const { Command } = require('discord-akairo');

module.exports = class PauseCommand extends Command {
	constructor() {
		super('pause', {
			aliases: ['pause'],
			category: 'controls',
			description: 'Pauses music playback.',
			ownerOnly: true
		});
	}

	exec(msg) {
		if (this.client.jukebox.paused) return msg.util.reply('Playback is paused! Can\'t you hear the silence?');
		this.client.jukebox.pause();
		return msg.util.send('Paused playback.');
	}
};
