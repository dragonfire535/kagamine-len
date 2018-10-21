const metadata = require('music-metadata');
const { Collection } = require('discord.js');
const fs = require('fs');
const dir = require('node-dir');
const Song = require('./Song');
const { LEN_MUSIC_TYPES } = process.env;
const types = LEN_MUSIC_TYPES ? LEN_MUSIC_TYPES.split(',') : ['mp3', 'm4a'];

module.exports = class Jukebox {
	constructor(client, channelID) {
		Object.defineProperty(this, 'client', { value: client });
		this.types = types;
		this.typesRegex = new RegExp(`\\.(${types.join('|')})$`, 'i');
		this.dispatcher = null;
		this.channelID = channelID;
		this.list = new Collection();
		this.queue = [];
		this.current = null;
	}

	async registerSongs(directory) {
		const files = (await dir.promiseFiles(directory)).filter(file => this.typesRegex.test(file));
		for (const file of files) {
			const meta = await metadata.parseFile(file);
			this.list.set(file, new Song(this, file, meta));
		}
		return this.list;
	}

	play(connection) {
		try {
			if (this.queue.length) {
				this.current = this.queue[0];
				this.queue.shift();
			} else {
				this.current = this.list.random();
			}
			this.client.user.setActivity(`${this.current.artist} - ${this.current.title}`, { type: 'LISTENING' })
				.catch(() => null);
			this.dispatcher = connection.play(fs.createReadStream(this.current.filePath));
			this.dispatcher.once('finish', () => this.play(connection));
			this.dispatcher.once('error', () => this.play(connection));
			return this.dispatcher;
		} catch (err) {
			return this.play(connection);
		}
	}

	pause() {
		return this.dispatcher.pause();
	}

	resume() {
		return this.dispatcher.resume();
	}

	skip() {
		return this.dispatcher.end();
	}

	get paused() {
		return this.dispatcher.paused;
	}

	get channel() {
		return this.client.channels.get(this.channelID);
	}
};
