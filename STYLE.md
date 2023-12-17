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

1. Keep constructors private, prefer static factory methods for creating instances.

   ```ts
   class MongoDBAlbumRepository implements AlbumRepository {
     // Use `create` for the main way to create an instance.
     static create(options?: AlbumRepositoryOptions) {
       /* ... */
     }

     // If there are multiple different types of instances that can be
     // created, suffix the create method.
     static createWithCaching(options?: AlbumRepositoryOptions) {
       /* ... */
     }

     // If the instantiation process is based on a specific value, use `from*`.
     // The most common example of this is reading from configuration.
     // Use a second parameter in case additional options are needed.
     static fromConfig(config: Config, deps: { logger: Logger }) {
       /* ... */
     }

     private constructor(/* ... */) {
       /* ... */
     }
   }
   ```

1. When a type relates directly to other symbols, use the name of those as prefix for the type.

   ```ts
   // Option types should be prefixed with the name of the operation.
   function upgradeWidget(options: UpgradeWidgetOptions) {}
   function activateWidget(options: ActivateWidgetOptions) {}

   // An exception to this are create methods, where the name of the thing
   // being created may be used as the prefix instead.
   function createWidget(options: WidgetOptions) {}

   // In this case the related names for request types are `ReportsApi` and
   // the method name. If there is a low risk of conflict we can keep them
   // short by only prefixing with the method name, but if there is a higher
   // risk of conflict then we would want to use the full prefix instead, while
   // omitting redundant parts, i.e. `ReportsApiUploadRequest.
   interface ReportsApi {
     uploadReports(request: UploadReportsRequest): Promise<void>;
     deleteReport(request: DeleteReportRequest): Promise<void>;
   }
   ```

1. When there is a significant number of arguments to a function or method, prefer to use a single options object as the argument, rather than many positional arguments.

   ```ts
   // Bad
   function createWidget(id: string, name: string, width: number) {}

   // Good
   function createWidget(options: CreateWidgetOptions) {}
   ```
