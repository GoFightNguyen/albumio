import { AlbumRepository } from './AlbumRepository';
import { ThirdPartyMusicService } from './ThirdPartyMusicService';

export function create(
  albumRepository: AlbumRepository,
  thirdPartyMusicService: ThirdPartyMusicService,
) {
  return {
    async add(thirdPartyId: string) {
      const album = await thirdPartyMusicService.getAlbum(thirdPartyId);
      await albumRepository.add(album);
    },
  };
}
