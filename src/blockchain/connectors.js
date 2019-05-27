import { Connectors } from 'web3-react'
const { InjectedConnector, NetworkOnlyConnector } = Connectors

const GANACHE = 1558908147528
const MAINET = 1
const RINKEBY = 4
const MetaMask = new InjectedConnector({
  supportedNetworks: [MAINET, RINKEBY, GANACHE],
})

const Infura = new NetworkOnlyConnector({
  providerURL: 'https://mainnet.infura.io/v3/...',
})

export const connectors = { MetaMask /*, Infura*/ }
