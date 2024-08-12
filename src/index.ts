import {scheduleJob} from "node-schedule";
import {Github} from "./repository/Github";
import {Config} from "./config/Config";
import {logger, userDescription} from "./logger/logger";
import {DiscordClient} from "./repository/Discord";
import i18next from "i18next";
import Backend from "i18next-fs-backend";
import en from "../translations/translations.en.json";
import fr from "../translations/translations.fr.json";
import es from "../translations/translations.es.json";

const config = new Config();
const github = new Github();
const discordClient = new DiscordClient()
// Initialize translator
i18next
    .use(Backend)
    .init({
      lng: 'fr',
      fallbackLng: "en",
      debug: false,
      preload: ['en', 'fr', 'es'],
      ns: ['translations'],
      defaultNS: 'translations',
      backend: {
        loadPath: 'translations/{{ns}}.{{lng}}.json'
      },
      resources: {
        en: {
          translations: en
        },
        fr: {
          translations: fr
        },
        es: {
          translations: es
        }
      }
    });

config.parameters.settings.users.map(async user => {
  const githubUsername = await github.getUsername(user.github_token);

  user.scheduled_notifications.map(async scheduled_notification => {
    // Instantiate schedules
    scheduleJob(scheduled_notification, async function () {
      logger.info(`Scheduled job triggered: ${scheduled_notification}`);
      let pullRequests = [];
      for (let i = 0; i < user.repositories.length; i++) {
        const repository = user.repositories[i];
        const pullRequestsWaitingForReview = await github.getPullRequestsWaitingForReview(repository, githubUsername, user.github_token);
        if(pullRequestsWaitingForReview.length > 0){
          pullRequests = pullRequests.concat(pullRequestsWaitingForReview);
        }
      }
      if (pullRequests.length > 0) {
        logger.info(`Sending reminder to ${userDescription(user.discord_id, githubUsername)}`)

        pullRequests.map(pullRequest => discordClient.sendMessage(user.discord_id, githubUsername, pullRequest))
      }
    });
  });
});
