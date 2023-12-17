import { SpotifyConfig } from './SpotifyConfig';
import 'dotenv/config';

export class DotenvSpotifyConfig implements SpotifyConfig {
  private readonly _config;

  private constructor() {
    this._config = Object.freeze({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
    });
  }

  static create() {
    return new DotenvSpotifyConfig();
  }

  get clientId() {
    return this._config.clientId;
  }

  get clientSecret() {
    return this._config.clientSecret;
  }
}
