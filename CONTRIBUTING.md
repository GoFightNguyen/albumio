# Contributing

## Getting Started

1. Clone the repo
2. Open in a [devcontainer](#devcontainer)
3. Make your changes;
   use [standardized commit messages](#standardized-commit-messages)

### devcontainer

This project relies on [Development Containers](https://containers.dev/).

> [!NOTE]
> To enable this functionality in VS Code,
> install the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers);
> this extension is included in the [Remote Development extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack).

### Standardized Commit Messages

Commit messages should follow the conventional form `type(scope): message`.
No tool, like commitizen, is configured to enforce the form because it is unnecessary for now.

The type should come from the [Commitizen list of types](https://github.com/commitizen/conventional-commit-types/blob/master/index.json).

The scope should be the area, component, file name, etc. you made the change in.
