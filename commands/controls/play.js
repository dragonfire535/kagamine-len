const Command = require('../../structures/Command');
const { escapeMarkdown } = require('discord.js');
const { verify } = require('../../util/Util');

module.exports = class PlayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'play',
			group: 'controls',
			memberName: 'play',
			description: 'Plays a song.',
			ownerOnly: true,
			args: [
				{
					key: 'song',
					prompt: 'What song would you like to play?',
					type: 'song'
				}
			]
		});
	}

	async run(msg, { song }) {
		await msg.reply(`Would you like to play **${escapeMarkdown(song.artist)} - ${escapeMarkdown(song.title)}**?`);
		const verification = await verify(msg.channel, msg.author);
		if (!verification) return msg.say('Aborted playback.');
		song.queueStart();
		this.client.jukebox.skip();
		return msg.say(`Now playing **${escapeMarkdown(song.artist)} - ${escapeMarkdown(song.title)}**!`);
	}
};
