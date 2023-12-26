import { Album } from './domain/Album';
import { InMemoryAlbumRepository } from './InMemoryAlbumRepository';
import * as AlbumService from './domain/AlbumService';
import { SpotifyThirdPartyMusicService } from './spotify/SpotifyThirdPartyMusicService';
import { DotenvSpotifyConfig } from './spotify/DotenvSpotifyConfig';

describe('Feature: Adding Albums', () => {
  test(`
  Given I use Spotify
  When I add Albums by Spotify ID:
    13nO8KPBlBff3c6qEDAUpd
    1oDkUnjCBAHsaQtr0J0s3t
  Then the following Albums are added to my catalog:
    Canopy
    Let the Trap Say Amen
  `, async () => {
    const config = DotenvSpotifyConfig.create();
    const albumRepository = new InMemoryAlbumRepository();
    const thirdPartyMusicService =
      SpotifyThirdPartyMusicService.fromConfig(config);
    const sut = AlbumService.create({
      albumRepository,
      thirdPartyMusicService,
    });

    await sut.add('13nO8KPBlBff3c6qEDAUpd');
    await sut.add('1oDkUnjCBAHsaQtr0J0s3t');

    const albums = await albumRepository.all();
    expect(findMatchingAlbum(albums, 'Canopy')).toBeDefined();
    expect(findMatchingAlbum(albums, 'Let the Trap Say Amen')).toBeDefined();
  });

  const findMatchingAlbum = (albums: Album[], albumName: string) =>
    albums.find((a) => a.metadata.name === albumName);
});
