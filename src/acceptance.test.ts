import { Album } from "./Album";
import { AlbumRepository } from "./AlbumRepository";
import { InMemoryAlbumRepository } from "./InMemoryAlbumRepository";

describe("Feature: Adding Albums", () => {
  test("works", async () => {
    const album1: Album = {
      metadata: {
        name: "album 1",
      },
    };
    const album2: Album = {
      metadata: {
        name: "album 2",
      },
    };

    const sut: AlbumRepository = new InMemoryAlbumRepository();
    await sut.add(album1);
    await sut.add(album2);

    const albums = await sut.all();
    expect(albums.length).toBe(2);
    expect(
      albums.find((a) => a.metadata.name === album1.metadata.name),
    ).toBeDefined();
    expect(
      albums.find((a) => a.metadata.name === album2.metadata.name),
    ).toBeDefined();
  });
});
