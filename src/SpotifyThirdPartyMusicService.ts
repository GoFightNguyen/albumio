import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { Album } from './Album';
import { Config } from './Config';
import { ThirdPartyMusicService } from './ThirdPartyMusicService';

export class SpotifyThirdPartyMusicService implements ThirdPartyMusicService {
  private readonly _client: SpotifyApi;

  constructor({ clientId, clientSecret }: Config) {
    this._client = SpotifyApi.withClientCredentials(clientId, clientSecret);
  }

  async getAlbum(thirdPartyId: string): Promise<Album> {
    await this._client.albums.get(thirdPartyId);
    const album: Album = {
      metadata: { name: thirdPartyId },
    };
    return Promise.resolve(album);
  }
}
