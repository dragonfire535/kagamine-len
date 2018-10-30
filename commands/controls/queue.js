const Command = require('../../structures/Command');
const { verify } = require('../../util/Util');

module.exports = class QueueCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'queue',
			group: 'controls',
			memberName: 'queue',
			description: 'Queues a song.',
			args: [
				{
					key: 'song',
					prompt: 'What song would you like to queue?',
					type: 'song'
				}
			]
		});
	}

	async run(msg, { song }) {
		await msg.reply(`Would you like to queue **${song.artist} - ${song.title}**?`);
		const verification = await verify(msg.channel, msg.author);
		if (!verification) return msg.say('Aborted queue.');
		song.queue();
		return msg.say(`Queued **${song.artist} - ${song.title}**!`);
	}
};
