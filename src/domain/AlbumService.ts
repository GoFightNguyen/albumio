import { AlbumRepository } from './AlbumRepository';
import { ThirdPartyMusicService } from './ThirdPartyMusicService';

interface AlbumServiceOptions {
  albumRepository: AlbumRepository;
  thirdPartyMusicService: ThirdPartyMusicService;
}

export function create({
  albumRepository,
  thirdPartyMusicService,
}: AlbumServiceOptions) {
  return {
    async add(thirdPartyId: string) {
      const album = await thirdPartyMusicService.getAlbum(thirdPartyId);
      await albumRepository.add(album);
    },
  };
}
