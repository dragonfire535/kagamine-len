const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

module.exports = class SongInfoCommand extends Command {
	constructor() {
		super('song-info', {
			aliases: ['song-info', 'song'],
			category: 'info',
			description: 'Responds with detailed information on a song.',
			args: [
				{
					id: 'song',
					prompt: {
						start: 'What song would you like to get information on?',
						retry: 'You provided an invalid song. Please try again.'
					},
					match: 'content',
					type: 'song'
				}
			]
		});
	}

	exec(msg, { song }) {
		const embed = new MessageEmbed()
			.setColor(0x00AE86)
			.addField('❯ Title', song.title);
		if (song.comment) embed.setDescription(song.comment);
		if (song.albumArt) {
			const format = song.albumArt.format.replace('image/', '');
			embed.attachFiles([{ attachment: song.albumArt.data, name: `album.${format}` }]);
			embed.setThumbnail(`attachment://album.${format}`);
		}
		if (song.artist) embed.addField('❯ Artist', song.artist);
		if (song.album.name) {
			embed.addField('❯ Album', `${song.album.name}${song.album.artist ? `\nby ${song.album.artist}` : ''}`);
		}
		if (song.genre) embed.addField('❯ Genre', song.genre);
		if (song.year) embed.setFooter(`Release Year: ${song.year}`);
		return msg.util.send({ embed });
	}
};
