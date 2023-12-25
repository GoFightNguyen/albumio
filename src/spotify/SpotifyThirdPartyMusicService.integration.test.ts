import {
  ANNOTATION_ALBUM_SPOTIFY_ID,
  ANNOTATION_ALBUM_SPOTIFY_URI,
  Album,
} from '../domain/Album';
import { DotenvSpotifyConfig } from './DotenvSpotifyConfig';
import { SpotifyThirdPartyMusicService } from './SpotifyThirdPartyMusicService';

describe.only('SpotifyThirdPartyMusicService', () => {
  describe('getAlbum', () => {
    test('should throw an error when unable to authenticate', async () => {
      const sut = SpotifyThirdPartyMusicService.fromConfig({
        clientId: 'abc',
        clientSecret: '123',
      });
      await expect(sut.getAlbum('123')).rejects.toThrow(
        /failed to get access token/i,
      );
    });

    test('should throw an error when the album cannot be found', async () => {
      const config = DotenvSpotifyConfig.create();
      const sut = SpotifyThirdPartyMusicService.fromConfig(config);
      await expect(sut.getAlbum('123')).rejects.toThrow(/invalid id/i);
    });

    test('should return the domain Album', async () => {
      const sut = SpotifyThirdPartyMusicService.fromConfig(
        DotenvSpotifyConfig.create(),
      );
      const actual = await sut.getAlbum('13nO8KPBlBff3c6qEDAUpd');
      const expected: Album = {
        apiVersion: 'albumio/v1alpha1',
        kind: 'Album',
        metadata: {
          name: 'Canopy',
          annotations: {
            [ANNOTATION_ALBUM_SPOTIFY_ID]: '13nO8KPBlBff3c6qEDAUpd',
            [ANNOTATION_ALBUM_SPOTIFY_URI]:
              'spotify:album:13nO8KPBlBff3c6qEDAUpd',
          },
        },
        spec: {
          artist: 'nobigdyl.',
          label: 'indie tribe.',
          releaseDate: new Date('2017-02-03'),
          upc: 859719342136,
        },
      };
      expect(actual).toEqual(expected);
    });
  });
});

// TODO: acceptance test with mulitple albums
// TODO: what if release date precision is not day
// TODO: what if album is an EP
// TODO: multiple artists
