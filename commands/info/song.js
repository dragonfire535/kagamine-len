const Command = require('../../structures/Command');
const { MessageEmbed, escapeMarkdown } = require('discord.js');
const { oneLine } = require('common-tags');

module.exports = class SongInfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'song-info',
			aliases: ['song'],
			group: 'info',
			memberName: 'song',
			description: 'Responds with detailed information on a song.',
			args: [
				{
					key: 'song',
					prompt: 'What song would you like to get information on?',
					type: 'song'
				}
			]
		});
	}

	run(msg, { song }) {
		const embed = new MessageEmbed()
			.setColor(0x00AE86)
			.addField('❯ Title', escapeMarkdown(song.title));
		if (song.comment) embed.setDescription(song.comment);
		if (song.albumArt) {
			const format = song.albumArt.format.replace('image/', '');
			embed.attachFiles([{ attachment: song.albumArt.data, name: `album.${format}` }]);
			embed.setThumbnail(`attachment://album.${format}`);
		}
		if (song.artist) embed.addField('❯ Artist', escapeMarkdown(song.artist));
		if (song.album.name) {
			embed.addField('❯ Album', oneLine`
				${escapeMarkdown(song.album.name)}
				${song.album.artist ? `\nby ${escapeMarkdown(song.album.artist)}` : ''}
			`);
		}
		if (song.genre) embed.addField('❯ Genre', escapeMarkdown(song.genre));
		if (song.year) embed.setFooter(`Release Year: ${song.year}`);
		return msg.embed(embed);
	}
};
