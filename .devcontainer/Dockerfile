FROM mcr.microsoft.com/devcontainers/typescript-node:1-20-bookworm

# ensure we use the correct version of yarn since the project was initialized with `yarn init -2`.
# without this, the `yarn -v` was 1.x
# https://yarnpkg.com/getting-started/install
RUN corepack enable
