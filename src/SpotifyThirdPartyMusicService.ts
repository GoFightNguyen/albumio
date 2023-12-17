import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { Album } from './Album';
import { ThirdPartyMusicService } from './ThirdPartyMusicService';

export class SpotifyThirdPartyMusicService implements ThirdPartyMusicService {
  private readonly _client: SpotifyApi;

  constructor(clientId: string, clientSecret: string) {
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
