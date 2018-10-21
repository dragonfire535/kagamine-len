module.exports = class Song {
	constructor(jukebox, filePath, meta) {
		Object.defineProperty(this, 'jukebox', { value: jukebox });
		this.filePath = filePath;
		this.title = meta.common.title || filePath.replace(jukebox.typesRegex, '');
		this.album = {
			name: meta.common.album || '',
			artist: meta.common.albumartist || meta.common.artist || '',
			track: meta.common.track || 1,
			totalTracks: meta.common.totaltracks || 1,
			disk: meta.common.disk || 1,
			totalDisks: meta.common.totaldisks || 1
		};
		this.artist = meta.common.artist || '';
		this.year = meta.common.year || 0;
		this.genre = meta.common.genre || '';
		this.albumArt = meta.common.picture.length ? meta.common.picture[0] : null;
		this.comment = meta.common.comment || '';
	}

	queue() {
		return this.jukebox.queue.push(this);
	}

	queueStart() {
		return this.jukebox.queue.unshift(this);
	}
};
