import React from 'react'
import Web3Provider, { useWeb3Context, Web3Consumer } from 'web3-react'

function Web3Info() {
  return (
    <Web3Consumer>
      {context => {
        const { active, connectorName, account, networkId } = context
        return (
          active && (
            <React.Fragment>
              <p>Active Connector: {connectorName}</p>
              <p>Account: {account || 'None'}</p>
              <p>Network ID: {networkId}</p>
            </React.Fragment>
          )
        )
      }}
    </Web3Consumer>
  )
}

export { Web3Info }
