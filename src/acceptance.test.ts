import { Album } from './Album';
import { AlbumRepository } from './AlbumRepository';
import { InMemoryAlbumRepository } from './InMemoryAlbumRepository';

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

  const findMatchingAlbum = (albums: Album[], album: Album) =>
    albums.find((a) => a.metadata.name === album.metadata.name);
});

class SeedAlbum implements Album {
  metadata: { name: string };
  constructor(name: string) {
    this.metadata = { name };
  }
}