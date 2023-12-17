/**
 * Albumio catalog Album kind
 */
export interface Album {
  /**
   * The version of specification format for this particular Album that this is written against.
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
  };
}
