import * as yaml from "js-yaml";
import * as fs from "fs";

interface DiscordSettings {
  token: string;
}

interface DelayColorAfterDays {
  yellow: number,
  orange: number,
  red: number
}

interface UsersSettings {
  github_token: string,
  discord_id: string,
  live_notifications: boolean,
  repositories: string[],
  scheduled_notifications: string[]
}

interface ConfigSettings {
  date_format: string,
  delay_color_after_days: DelayColorAfterDays,
  notify_on_days: string[],
  discord: DiscordSettings,
  users: UsersSettings[]
}

interface ConfigSchema {
  settings: ConfigSettings
}

export class Config {
  public parameters: ConfigSchema;

  constructor() {
    this.parameters = yaml.load(fs.readFileSync(__dirname+"/../config/config.yaml", 'utf8'));
  }
}