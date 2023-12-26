import {
  ANNOTATION_ALBUM_SPOTIFY_ID,
  ANNOTATION_ALBUM_SPOTIFY_URI,
  Album,
  AlbumAnnotations,
  AlbumSpec,
  AlbumType,
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
      const expected: Album = new AlbumHelper(
        '13nO8KPBlBff3c6qEDAUpd',
        'Canopy',
      )
        .withArtists('nobigdyl.')
        .withLabel('indie tribe.')
        .withReleaseDate('2017-02-03')
        .withUpc(859719342136);
      expect(actual).toEqual(expected);
    });

    test('should return the domain Album when multiple artists', async () => {
      const sut = SpotifyThirdPartyMusicService.fromConfig(
        DotenvSpotifyConfig.create(),
      );
      const actual = await sut.getAlbum('1oDkUnjCBAHsaQtr0J0s3t');
      const expected: Album = new AlbumHelper(
        '1oDkUnjCBAHsaQtr0J0s3t',
        'Let the Trap Say Amen',
      )
        .withArtists('Lecrae', 'Zaytoven')
        .withLabel('Reach Records')
        .withReleaseDate('2018-06-22')
        .withUpc(814509011159);
      expect(actual).toEqual(expected);
    });

    test('should return the domain Album when an EP', async () => {
      const sut = SpotifyThirdPartyMusicService.fromConfig(
        DotenvSpotifyConfig.create(),
      );
      const actual = await sut.getAlbum('3OFbKnRMtsZxMFkW0eKeqI');
      const expected: Album = new AlbumHelper(
        '3OFbKnRMtsZxMFkW0eKeqI',
        'Circle of Life',
      )
        .withArtists('Aha Gazelle')
        .withLabel('ALIENZ ALIVE')
        .withReleaseDate('2023-11-24')
        .withTypeEP()
        .withUpc(810482891696);
      expect(actual).toEqual(expected);
    });
  });
});

// TODO: what if release date precision is not day

class AlbumHelper implements Album {
  readonly apiVersion = 'albumio/v1alpha1';
  readonly kind = 'Album';
  readonly metadata: { name: string; annotations: AlbumAnnotations };
  readonly spec: AlbumSpec = {
    artists: [],
    label: '',
    releaseDate: new Date(),
    type: AlbumType.Album,
    upc: 1,
  };

  constructor(id: string, name: string) {
    this.metadata = {
      name,
      annotations: {
        [ANNOTATION_ALBUM_SPOTIFY_ID]: id,
        [ANNOTATION_ALBUM_SPOTIFY_URI]: `spotify:album:${id}`,
      },
    };
  }

  withArtists(...val: string[]) {
    this.spec.artists = val;
    return this;
  }

  withLabel(val: string) {
    this.spec.label = val;
    return this;
  }

  withReleaseDate(val: string) {
    this.spec.releaseDate = new Date(val);
    return this;
  }

  withTypeEP() {
    this.spec.type = AlbumType.EP;
    return this;
  }

  withUpc(val: number) {
    this.spec.upc = val;
    return this;
  }
}
