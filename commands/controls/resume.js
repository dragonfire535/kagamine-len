const { Command } = require('discord-akairo');

module.exports = class ResumeCommand extends Command {
	constructor() {
		super('resume', {
			aliases: ['resume', 'unpause'],
			category: 'controls',
			description: 'Resumes paused music playback.',
			ownerOnly: true
		});
	}

	exec(msg) {
		if (!this.client.jukebox.paused) return msg.util.reply('Playback isn\'t paused! What are you, deaf?');
		this.client.jukebox.resume();
		return msg.util.send('Resumed playback.');
	}
};
