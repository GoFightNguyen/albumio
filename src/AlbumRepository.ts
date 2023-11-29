import { Album } from "./Album";

export interface AlbumRepository {
  all(): Promise<Album[]>;
  add(album: Album): Promise<void>;
}
