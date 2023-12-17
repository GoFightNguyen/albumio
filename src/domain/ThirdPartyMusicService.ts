import { Album } from './Album';

export interface ThirdPartyMusicService {
  getAlbum(thirdPartyId: string): Promise<Album>;
}
