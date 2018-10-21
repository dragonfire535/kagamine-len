const { Command } = require('discord-akairo');
const { stripIndents } = require('common-tags');

module.exports = class ViewQueueCommand extends Command {
	constructor() {
		super('view-queue', {
			aliases: ['view-queue', 'queued'],
			category: 'music',
			description: 'Responds with the current queue.',
			args: [
				{
					id: 'page',
					prompt: {
						start: 'What page would you like to view?',
						retry: 'You provided an invalid page. Please try again.',
						optional: true
					},
					type: 'integer',
					default: 1
				}
			]
		});
	}

	exec(msg, { page }) {
		const { queue } = this.client.jukebox;
		if (!queue.length) return msg.util.send('Could not find any results.');
		const maxPage = Math.ceil(queue.length / 10);
		const startIndex = (page - 1) * 10;
		const items = queue.slice(startIndex, startIndex + 10);
		return msg.util.send(stripIndents`
			__**Current Queue:**__ _(Page ${page}/${maxPage}, ${queue.length} Results)_
			${items.map((song, i) => `**${i + 1}.** ${song.artist} - ${song.title}`).join('\n')}
		`);
	}
};
