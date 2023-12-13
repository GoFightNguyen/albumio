import { Album } from './Album';
import { ThirdPartyMusicService } from './ThirdPartyMusicService';

export class SpotifyThirdPartyMusicService implements ThirdPartyMusicService {
  async getAlbum(thirdPartyId: string): Promise<Album> {
    const album: Album = {
      metadata: { name: thirdPartyId },
    };
    return Promise.resolve(album);
  }
}
