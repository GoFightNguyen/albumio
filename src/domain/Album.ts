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
}

/**
 * The Spotify ID of the Album.
 *
 * @remarks
 *
 * This does not clearly identify the type of Spotify resource.
 *
 * See also:
 * {@link https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids}
 */
export const ANNOTATION_ALBUM_SPOTIFY_ID = 'spotify.com/id';

export interface AlbumAnnotations extends Record<string, string> {
  [ANNOTATION_ALBUM_SPOTIFY_ID]: string;
}
