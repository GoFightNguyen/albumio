import { Config } from './Config';
import 'dotenv/config';

export class DotenvConfig implements Config {
  private readonly _config;

  private constructor() {
    this._config = Object.freeze({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
    });
  }

  static create() {
    return new DotenvConfig();
  }

  get clientId() {
    return this._config.clientId;
  }

  get clientSecret() {
    return this._config.clientSecret;
  }
}
