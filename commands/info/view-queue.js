const Command = require('../../structures/Command');
const { stripIndents } = require('common-tags');
const { escapeMarkdown } = require('discord.js');

module.exports = class ViewQueueCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'view-queue',
			aliases: ['queued'],
			group: 'info',
			memberName: 'view-queue',
			description: 'Responds with the current queue.',
			args: [
				{
					key: 'page',
					prompt: 'What page would you like to view?',
					type: 'integer',
					default: 1
				}
			]
		});
	}

	run(msg, { page }) {
		const { queue } = this.client.jukebox;
		if (!queue.length) return msg.say('Nothing is currently queued.');
		const maxPage = Math.ceil(queue.length / 10);
		const startIndex = (page - 1) * 10;
		const items = queue.slice(startIndex, startIndex + 10).map((song, i) => {
			const name = `${escapeMarkdown(song.artist)} - ${escapeMarkdown(song.title)}`;
			return `**${i + 1}.** ${name}`;
		});
		return msg.say(stripIndents`
			__**Current Queue:**__ _(Page ${page}/${maxPage}, ${queue.length} Results)_
			${items.join('\n')}
		`);
	}
};
