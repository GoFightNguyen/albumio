import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { Album } from './Album';
import { SpotifyConfig } from './SpotifyConfig';
import { ThirdPartyMusicService } from './ThirdPartyMusicService';

export class SpotifyThirdPartyMusicService implements ThirdPartyMusicService {
  private readonly _client: SpotifyApi;

  private constructor(clientId: string, clientSecret: string) {
    this._client = SpotifyApi.withClientCredentials(clientId, clientSecret);
  }

  static fromConfig(config: SpotifyConfig) {
    return new SpotifyThirdPartyMusicService(
      config.clientId,
      config.clientSecret,
    );
  }

  async getAlbum(thirdPartyId: string): Promise<Album> {
    const album = await this._client.albums.get(thirdPartyId);
    const result: Album = {
      metadata: { name: album.name },
    };
    return result;
  }
}
