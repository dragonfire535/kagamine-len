const { Command } = require('discord-akairo');
const { verify } = require('../../util/Util');

module.exports = class QueueCommand extends Command {
	constructor() {
		super('queue', {
			aliases: ['queue'],
			category: 'music',
			description: 'Queues a song.',
			args: [
				{
					id: 'song',
					prompt: {
						start: 'What song would you like to queue?',
						retry: 'You provided an invalid song. Please try again.'
					},
					match: 'content',
					type: 'song'
				}
			]
		});
	}

	async exec(msg, { song }) {
		await msg.util.reply(`Would you like to queue **${song.artist} - ${song.title}**?`);
		const verification = await verify(msg.channel, msg.author);
		if (!verification) return msg.util.send('Aborted queue.');
		song.queue();
		return msg.util.send(`Queued **${song.artist} - ${song.title}**!`);
	}
};
