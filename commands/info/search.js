const Command = require('../../structures/Command');
const { stripIndents } = require('common-tags');
const { escapeMarkdown } = require('discord.js');

module.exports = class SearchCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'search',
			group: 'info',
			memberName: 'search',
			description: 'Searches for songs.',
			args: [
				{
					key: 'query',
					prompt: 'What song would you like to search for?',
					type: 'string'
				},
				{
					key: 'page',
					prompt: 'What page would you like to view?',
					type: 'integer',
					default: 1
				}
			]
		});
	}

	run(msg, { query, page }) {
		const results = this.client.jukebox.list
			.filter(song => {
				const search = query.toLowerCase();
				return song.title.toLowerCase().includes(search)
					|| song.artist.toLowerCase().includes(search)
					|| song.album.name.toLowerCase().includes(search);
			});
		if (!results.size) return msg.say('Could not find any results.');
		const maxPage = Math.ceil(results.size / 10);
		const startIndex = (page - 1) * 10;
		let i = 0;
		const items = results
			.map(song => {
				i++;
				return `**${i}.** ${escapeMarkdown(song.artist)} - ${escapeMarkdown(song.title)}`;
			})
			.slice(startIndex, startIndex + 10);
		return msg.say(stripIndents`
			__**Results:**__ _(Page ${page}/${maxPage}, ${results.size} Results)_
			${items.join('\n')}
		`);
	}
};
