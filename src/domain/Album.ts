/**
 * Albumio catalog Album kind.
 *
 * The tuple of `apiVersion` and `kind` should be enough to know how to interpret the contents of the data.
 */
export interface Album {
  /**
   * The version of specification format for this particular Album that this is written against.
   *
   * This enables evolving the format.
   */
  apiVersion: 'albumio/v1alpha1';
  /**
   * The high-level type being described.
   */
  kind: 'Album';
  /**
   * Metadata related to the Album.
   */
  metadata: {
    /**
     * The name of the Album.
     */
    name: string;
    /**
     * Key/value pairs of non-identifying auxiliary information attached to the Album.
     *
     * @remarks
     *
     * The main purpose is reference into external systems.
     * See also:
     * {@link https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/}
     */
    annotations: AlbumAnnotations;
  };
  /**
   * The specification data describing the Album itself.
   */
  spec: AlbumSpec;
}

/**
 * The Spotify ID of the Album.
 *
 * @remarks
 *
 * This does not clearly identify the type of Spotify resource.
 * If that is needed see {@link ANNOTATION_ALBUM_SPOTIFY_URI}
 *
 *
 * Example: 13nO8KPBlBff3c6qEDAUpd
 *
 * See also:
 * {@link https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids}
 */
export const ANNOTATION_ALBUM_SPOTIFY_ID = 'spotify.com/id';

/**
 * The Spotify resource identifier (URI) of the Album.
 *
 * @remarks
 *
 * Example: spotify:album:13nO8KPBlBff3c6qEDAUpd
 *
 * See also:
 * {@link https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids}
 */
export const ANNOTATION_ALBUM_SPOTIFY_URI = 'spotify.com/uri';

export interface AlbumAnnotations extends Record<string, string> {
  [ANNOTATION_ALBUM_SPOTIFY_ID]: string;
  [ANNOTATION_ALBUM_SPOTIFY_URI]: string;
}

export interface AlbumSpec {
  /**
   * The label associated with the Album.
   */
  label: string;
  /**
   * The date the Album was released.
   */
  releaseDate: Date;
  /**
   * The Universal Product Code (UPC) for the Album.
   *
   * @remarks
   *
   * A UPC conssists of 12 digits.
   *
   * See also:
   *
   * {@link https://en.wikipedia.org/wiki/Universal_Product_Code}
   *
   * {@link https://releese.io/article/what-is-an-album-upc-code-and-what-is-it-used-for/}
   */
  upc: number;
}
