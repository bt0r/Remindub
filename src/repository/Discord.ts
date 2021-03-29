import {logger, userDescription} from "../logger/logger";
import {Client} from "discord.js";
import {Config} from "../config/Config";
import {PullRequest} from "./Github";
import {ReminderMessage} from "../model/ReminderMessage";

export class DiscordClient {
  private client: Client;

  constructor() {
    this.client = new Client();
    const config = new Config();
    this.client
      .login(config.parameters.settings.discord.token)
      .catch(e => logger.error(`Cannot login to discord, error: ${e}`));

    this.client.on('ready', () => {
      logger.info(`Logged in as ${this.client.user.tag}!`);
    });
  }

  sendMessage = (discordId: string, githubUsername: string, pullRequest: PullRequest) => {
    this.client.users.fetch(discordId).then((user) => {
      user
        .send(ReminderMessage(pullRequest))
        .catch(e => {
          console.log(e)
          logger.error('Cannot send reminder to user ')
        });
    }).catch(e => {
      console.log(e);
      logger.error(`Cannot find discord user ${userDescription(discordId, githubUsername)}`)
    })
  }
}
