import { Album } from './Album';
import { AlbumRepository } from './AlbumRepository';

export function create(albumRepository: AlbumRepository) {
  return {
    async add(thirdPartyId: string) {
      console.log(thirdPartyId);
      const album: Album = {
        metadata: { name: thirdPartyId },
      };
      await albumRepository.add(album);
    },
  };
}
