const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');
const { shorten, base64 } = require('../../util/Util');
const { GITHUB_USERNAME, GITHUB_PASSWORD, LEN_GITHUB_REPO_USERNAME, LEN_GITHUB_REPO_NAME } = process.env;

module.exports = class ChangelogCommand extends Command {
	constructor() {
		super('changelog', {
			aliases: ['changelog', 'updates', 'commits'],
			category: 'util',
			description: 'Responds with the bot\'s latest 10 commits.'
		});
	}

	async exec(msg) {
		const { body } = await request
			.get(`https://api.github.com/repos/${LEN_GITHUB_REPO_USERNAME}/${LEN_GITHUB_REPO_NAME}/commits`)
			.set({ Authorization: `Basic ${base64(`${GITHUB_USERNAME}:${GITHUB_PASSWORD}`)}` });
		const commits = body.slice(0, 10);
		const embed = new MessageEmbed()
			.setTitle(`[${LEN_GITHUB_REPO_NAME}:master] Latest 10 commits`)
			.setColor(0x7289DA)
			.setURL(`https://github.com/${LEN_GITHUB_REPO_USERNAME}/${LEN_GITHUB_REPO_NAME}/commits/master`)
			.setDescription(commits.map(commit => {
				const hash = `[\`${commit.sha.slice(0, 7)}\`](${commit.html_url})`;
				return `${hash} ${shorten(commit.commit.message.split('\n')[0], 50)} - ${commit.author.login}`;
			}).join('\n'));
		return msg.util.send({ embed });
	}
};
