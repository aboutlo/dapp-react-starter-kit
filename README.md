# Dapp React Starter Kit

## Features

- All the [create react app](https://facebook.github.io/create-react-app) features
- Prettier configured
- Commit hooks for Linting and Prettier
- Example based on [web3-react](https://noahzinsmeister.gitbook.io/web3-react/)
- Connect to Metamask
- Read and write a value in a Smart Contract

notice: This repo assume you are using [Solidity Starter Kit](https://github.com/aboutlo/solidity-starter-kit)

## TODO:

- Rebuild the smart contract state
- Keep the smart contract state updated using the events
- Add UI Components

## Requirements

- yarn
  - Mac: `brew install yarn`
  - Win: https://yarnpkg.com/lang/en/docs/install/#windows-tab

## Optional tool

- NVM (Node Version Manager)
  - Mac & Linux: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash` [more info|https://github.com/nvm-sh/nvm]
  - Win: https://github.com/coreybutler/nvm-windows
- AVN (Automatic Switch to the Node version of the project)
  - Mac & Linux: [setup instructions](https://github.com/wbyoung/avn)
  - Win: [setup instructions](https://github.com/wbyoung/avn/issues/46#issuecomment-357673650) (never tested)

## Install

    yarn install

## Develop

- Download and install [Solidity Starter Kit](https://github.com/aboutlo/solidity-starter-kit)
- In the [Solidity Starter Kit](https://github.com/aboutlo/solidity-starter-kit)
  - `yarn build` the Example.sol and copy the ABI file from `solidity-starter-kit/build/contract/Example.json` in `src/abi`
  - `yarn ganache:start && yarn deploy`
- In this project `yarn start`
