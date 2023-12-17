import { Album } from './domain/Album';
import { AlbumRepository } from './domain/AlbumRepository';
import { InMemoryAlbumRepository } from './InMemoryAlbumRepository';
import * as AlbumService from './domain/AlbumService';
import { SpotifyThirdPartyMusicService } from './spotify/SpotifyThirdPartyMusicService';
import { DotenvSpotifyConfig } from './spotify/DotenvSpotifyConfig';

describe('Feature: Adding Albums', () => {
  test(`
  Given these albums are already in my collection:
  'album 1',
  'album 2'
  When adding these albums:
  'album 3'
  'album 4'
  Then my collection is:
  'album 1'
  'album 2'
  'album 3'
  'album 4'`, async () => {
    // Given
    const album1: Album = new SeedAlbum('album 1');
    const album2: Album = new SeedAlbum('album 2');
    const sut: AlbumRepository = new InMemoryAlbumRepository();
    await sut.add(album1);
    await sut.add(album2);

    // When
    const album3: Album = new SeedAlbum('album 3');
    const album4: Album = new SeedAlbum('album 4');
    await sut.add(album3);
    await sut.add(album4);

    // Then
    const albums = await sut.all();
    expect(albums.length).toBe(4);
    expect(findMatchingAlbum(albums, album1)).toBeDefined();
    expect(findMatchingAlbum(albums, album2)).toBeDefined();
    expect(findMatchingAlbum(albums, album3)).toBeDefined();
    expect(findMatchingAlbum(albums, album4)).toBeDefined();
  });

  test(`
  Given I use Spotify
  When I add an Album by Spotify ID 13nO8KPBlBff3c6qEDAUpd
  Then the Album "Canopy" is added to my catalog
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

    const albums = await albumRepository.all();
    const expected = new SeedAlbum('Canopy');
    expect(findMatchingAlbum(albums, expected)).toBeDefined();
  });

  const findMatchingAlbum = (albums: Album[], album: Album) =>
    albums.find((a) => a.metadata.name === album.metadata.name);
});

class SeedAlbum implements Album {
  metadata: { name: string };
  constructor(name: string) {
    this.metadata = { name };
  }
}
