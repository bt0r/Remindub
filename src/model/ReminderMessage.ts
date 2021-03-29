import {MessageEmbed} from "discord.js";
import {PullRequest} from "../repository/Github";
import dayjs from "dayjs";
import {Config} from "../config/Config";
import Translator from "../translator/Translator";

const config = new Config();

const delaysColors = {
  GREEN: "#40c24d",
  YELLOW: "#e0d728",
  ORANGE: "#d77116",
  RED: "#ba2121"
}

const ReminderColor = (delaysInDays: number) => {
  const delayColorAfterDays = config.parameters.settings.delay_color_after_days;

  if(delaysInDays <= delayColorAfterDays.yellow) {
    return delaysColors.GREEN;
  }
  if(delaysInDays > delayColorAfterDays.yellow && delaysInDays <= delayColorAfterDays.orange) {
    return delaysColors.YELLOW;
  }

  if(delaysInDays > delayColorAfterDays.orange && delaysInDays <= delayColorAfterDays.red) {
    return delaysColors.ORANGE;
  }

  return delaysColors.RED;
}

export const ReminderMessage = (pullrequest: PullRequest) => {
  const createdAtFormatted =  dayjs(pullrequest.createdAt).format(config.parameters.settings.date_format)
  const delaysInDays = dayjs(new Date()).diff(pullrequest.createdAt, 'days')

  return new MessageEmbed()
    .setColor(ReminderColor(delaysInDays))
    .setTitle(pullrequest.title)
    .setURL(pullrequest.url)
    .setAuthor(pullrequest.author.username, pullrequest.author.avatar)
    .setDescription(Translator.t('reminder.description',{username: pullrequest.author.username}))
    .setTimestamp()
    .setFooter(Translator.t('reminder.footer.base', {
      createdAtFormatted,
      delay: Translator.t('reminder.footer.delay', {count: delaysInDays})
    }));
}