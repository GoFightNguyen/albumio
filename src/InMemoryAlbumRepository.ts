import { Album } from './domain/Album';
import { AlbumRepository } from './domain/AlbumRepository';

export class InMemoryAlbumRepository implements AlbumRepository {
  private readonly _albums: Album[] = [];

  public async all() {
    return Promise.resolve(this._albums.slice());
  }

  public async add(album: Album) {
    this._albums.push(album);
    return Promise.resolve();
  }
}
