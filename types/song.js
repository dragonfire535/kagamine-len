const { ArgumentType, util: { disambiguation } } = require('discord.js-commando');
const { escapeMarkdown } = require('discord.js');

module.exports = class EmojiArgumentType extends ArgumentType {
	constructor(client) {
		super(client, 'emoji');
	}

	validate(value, msg) {
		const search = value.toLowerCase();
		const artistSongs = msg.client.jukebox.list.filter(nameFilterArtistInexact(search));
		if (artistSongs.size === 1) return true;
		let songs = msg.client.jukebox.list.filter(nameFilterInexact(search));
		if (!songs.size) return false;
		if (songs.size === 1) return true;
		const exactSongs = songs.filter(nameFilterExact(search));
		if (exactSongs.size === 1) return true;
		if (exactSongs.size > 0) songs = exactSongs;
		return songs.size <= 15
			? `${disambiguation(songs.map(song => escapeMarkdown(song.name)), 'songs', null)}\n`
			: 'Multiple songs found. Please be more specific.';
	}

	parse(value, msg) {
		const search = value.toLowerCase();
		const artistSongs = msg.client.jukebox.list.filter(nameFilterArtistInexact(search));
		if (artistSongs.size === 1) return artistSongs.first();
		const songs = msg.client.jukebox.list.filter(nameFilterInexact(search));
		if (!songs.size) return null;
		if (songs.size === 1) return songs.first();
		const exactSongs = songs.filter(nameFilterExact(search));
		if (exactSongs.size === 1) return exactSongs.first();
		return null;
	}
};

function nameFilterArtistInexact(search) {
	return thing => search.includes(thing.title.toLowerCase()) && search.includes(thing.artist.toLowerCase());
}

function nameFilterInexact(search) {
	return thing => thing.title.toLowerCase().includes(search);
}

function nameFilterExact(search) {
	return thing => thing.title.toLowerCase() === search;
}
