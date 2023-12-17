import { DotenvSpotifyConfig } from './DotenvSpotifyConfig';
import { SpotifyThirdPartyMusicService } from './SpotifyThirdPartyMusicService';

describe.only('SpotifyThirdPartyMusicService', () => {
  describe('getAlbum', () => {
    test('should throw an error when unable to authenticate', async () => {
      const sut = SpotifyThirdPartyMusicService.fromConfig({
        clientId: 'abc',
        clientSecret: '123',
      });
      await expect(sut.getAlbum('123')).rejects.toThrow(
        /failed to get access token/i,
      );
    });

    test('should throw an error when the album cannot be found', async () => {
      const config = DotenvSpotifyConfig.create();
      const sut = SpotifyThirdPartyMusicService.fromConfig(config);
      await expect(sut.getAlbum('123')).rejects.toThrow(/invalid id/i);
    });
  });
});
