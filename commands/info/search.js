const { Command } = require('discord-akairo');
const { stripIndents } = require('common-tags');

module.exports = class SearchCommand extends Command {
	constructor() {
		super('search', {
			aliases: ['search'],
			category: 'info',
			description: 'Searches for songs.',
			args: [
				{
					id: 'query',
					prompt: {
						start: 'What song would you like to search for?',
						retry: 'You provided an invalid query. Please try again.'
					},
					type: 'string'
				},
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

	exec(msg, { query, page }) {
		const results = this.client.jukebox.list
			.filter(song => {
				const search = query.toLowerCase();
				return song.title.toLowerCase().includes(search)
					|| song.artist.toLowerCase().includes(search)
					|| song.album.name.toLowerCase().includes(search);
			});
		if (!results.size) return msg.util.send('Could not find any results.');
		const maxPage = Math.ceil(results.size / 10);
		const startIndex = (page - 1) * 10;
		let i = 0;
		const items = results
			.map(song => {
				i++;
				return `**${i}.** ${song.artist} - ${song.title}`;
			})
			.slice(startIndex, startIndex + 10);
		return msg.util.send(stripIndents`
			__**Results:**__ _(Page ${page}/${maxPage}, ${results.size} Results)_
			${items.join('\n')}
		`);
	}
};
