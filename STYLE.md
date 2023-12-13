# TypeScript Coding Conventions

Our TypeScript style is inspired by the [style guidelines](https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines) of the TypeScript implementation itself.

## Naming

1. Use PascalCase for type names.
1. Do not use `I` as a prefix for interface names.
1. Use PascalCase for `enum` values.
1. Use `camelCase` for function names.
1. Use `camelCase` for property names and local variables.
1. Use `_` as a prefix for private class fields.
1. Use whole words in names when possible.
1. Give type parameters names prefixed with `T`, for example `Request<TBody>`.

## Syntax and Types

1. Use `undefined`. Do not use `null`.
1. Do not introduce new types/values to the global namespace.

## File and Export Structure

1. Keep `index.ts` free from implementation, it should only contain re-exports.
1. If a file has a single or a main export, name the file after the export.

## API Design

This section describes guidelines for designing APIs.

1. Keep [SOLID](https://en.wikipedia.org/wiki/SOLID) principles in mind.
1. Consume interfaces rather than concrete implementations.
1. Prefer classes for encapsulating functionality and implementing interfaces.
1. Suffix the name of concrete implementations with the name of the implemented interface.
   Use a prefix that describes the behavior of the implementation, or use a `Default` prefix.

   ```ts
   interface AlbumRepository {...}

   class InMemoryAlbumRepository implements AlbumRepository { /* persists Albums only in-memory */ }
   class MongoDBAlbumRepository implement AlbumRepository { /* persists Albums in MongoDB*/ }
   ```
