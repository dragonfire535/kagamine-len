const { Command } = require('discord-akairo');
const { stripIndents } = require('common-tags');
const { INVITE, LEN_GITHUB_REPO_NAME, LEN_GITHUB_REPO_USERNAME } = process.env;

module.exports = class InviteCommand extends Command {
	constructor() {
		super('invite', {
			aliases: ['invite', 'join'],
			category: 'util',
			description: 'Responds with the bot\'s invite links.'
		});
	}

	exec(msg) {
		return msg.util.send(stripIndents`
			You cannot invite me to your server, but you can join my home server to use me:
			${INVITE || 'Coming soon...'}

			You can also self-host me if you prefer:
			<https://github.com/${LEN_GITHUB_REPO_USERNAME}/${LEN_GITHUB_REPO_NAME}>
		`);
	}
};
