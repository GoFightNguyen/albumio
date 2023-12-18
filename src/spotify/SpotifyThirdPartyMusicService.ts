import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import {
  ANNOTATION_ALBUM_SPOTIFY_ID,
  ANNOTATION_ALBUM_SPOTIFY_URI,
  Album,
} from '../domain/Album';
import { SpotifyConfig } from './SpotifyConfig';
import { ThirdPartyMusicService } from '../domain/ThirdPartyMusicService';

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
      apiVersion: 'albumio/v1alpha1',
      kind: 'Album',
      metadata: {
        name: album.name,
        annotations: {
          [ANNOTATION_ALBUM_SPOTIFY_ID]: album.id,
          [ANNOTATION_ALBUM_SPOTIFY_URI]: album.uri,
        },
      },
      spec: {
        releaseDate: new Date(album.release_date),
      },
    };
    return result;
  }
}
