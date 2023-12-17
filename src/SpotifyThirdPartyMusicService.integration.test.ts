import { SpotifyThirdPartyMusicService } from './SpotifyThirdPartyMusicService';

describe.only('SpotifyThirdPartyMusicService', () => {
  describe('getAlbum', () => {
    test('should throw an error when unable to authenticate', async () => {
      const sut = new SpotifyThirdPartyMusicService({
        clientId: 'abc',
        clientSecret: '123',
      });
      await expect(sut.getAlbum('123')).rejects.toThrow(
        /failed to get access token/i,
      );
    });
  });
});
