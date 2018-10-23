module.exports = (phrase, msg) => {
	const search = phrase.toLowerCase();
	const songs = msg.client.jukebox.list.filter(nameFilterInexact(search));
	if (!songs.size) return null;
	if (songs.size === 1) return songs.first();
	const exactSongs = songs.filter(nameFilterExact(search));
	if (exactSongs.size === 1) return exactSongs.first();
	const artistSongs = songs.filter(nameFilterArtistInexact(search));
	if (artistSongs.size === 1) return artistSongs.first();
	return null;
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
