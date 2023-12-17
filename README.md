# albumio

## Spotify

The [Spotify TypeScript SDK for the Spotify Web API](https://github.com/spotify/spotify-web-api-ts-sdk) is used with the [Client Credentials Flow](https://developer.spotify.com/documentation/web-api/tutorials/client-credentials-flow).

Configure Spotify as a 3rd-party music service:

- Go to your [Dashboard](https://developer.spotify.com/dashboard)
- Create app (see [Spotify docs for more info](https://developer.spotify.com/documentation/web-api/concepts/apps))
  - Set `Redirect URI` to `http://localhost:8080/`
    - This value does not matter since we are using the Spotify SDK with Client Credentials Flow
  - Select `Web API`
  - Copy `Client ID` to the `SPOTIFY_CLIENT_ID` key in `.env`
  - Copy `Client Secret` to the `SPOTIFY_CLIENT_SECRET` key in `.env`
