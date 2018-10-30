const { CommandoClient } = require('discord.js-commando');
const winston = require('winston');
const Jukebox = require('./Jukebox');
const { LEN_CHANNEL_ID } = process.env;

module.exports = class LenClient extends CommandoClient {
	constructor(options) {
		super(options);

		this.logger = winston.createLogger({
			transports: [new winston.transports.Console()],
			format: winston.format.combine(
				winston.format.timestamp({ format: 'MM/DD/YYYY HH:mm:ss' }),
				winston.format.printf(log => `[${log.timestamp}] [${log.level.toUpperCase()}]: ${log.message}`)
			)
		});
		this.jukebox = new Jukebox(this, LEN_CHANNEL_ID);
	}
};
