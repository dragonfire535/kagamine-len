const { Command } = require('discord-akairo');
const { verify } = require('../../util/Util');

module.exports = class PlayCommand extends Command {
	constructor() {
		super('play', {
			aliases: ['play'],
			category: 'music',
			description: 'Plays a song.',
			ownerOnly: true,
			args: [
				{
					id: 'song',
					prompt: {
						start: 'What song would you like to play?',
						retry: 'You provided an invalid song. Please try again.'
					},
					match: 'content',
					type: 'song'
				}
			]
		});
	}

	async exec(msg, { song }) {
		await msg.util.reply(`Would you like to play **${song.artist} - ${song.title}**?`);
		const verification = await verify(msg.channel, msg.author);
		if (!verification) return msg.util.send('Aborted playback.');
		song.queueStart();
		return msg.util.send(`Queued **${song.artist} - ${song.title}** to play next!`);
	}
};
