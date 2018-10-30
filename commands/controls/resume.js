const Command = require('../../structures/Command');

module.exports = class ResumeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'resume',
			aliases: ['unpause'],
			group: 'controls',
			memberName: 'resume',
			description: 'Resumes paused music playback.',
			ownerOnly: true
		});
	}

	run(msg) {
		if (!this.client.jukebox.paused) return msg.reply('Playback isn\'t paused! What are you, deaf?');
		this.client.jukebox.resume();
		return msg.say('Resumed playback.');
	}
};
