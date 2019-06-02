import React from 'react'
import { useWeb3Context } from 'web3-react'
import { connectors } from '../blockchain/connectors'
import { Web3Info } from './Web3Info'

function Connector() {
  const context = useWeb3Context()

  if (context.error) {
    console.error('Error!')
  }

  return (
    <React.Fragment>
      <h1>web3-react Demo</h1>
      <h3>(latest)</h3>

      <Web3Info />

      {context.error && (
        <section>
          <h4>Something went wrong</h4>
          <code>{context.error}</code>
          <p>Check the console for more details.</p>
        </section>
      )}

      {Object.keys(connectors).map(connectorName => (
        <button
          key={connectorName}
          disabled={context.connectorName === connectorName}
          onClick={() => context.setConnector(connectorName)}
        >
          Activate {connectorName}
        </button>
      ))}

      <br />
      <br />

      {(context.active || (context.error && context.connectorName)) && (
        <button onClick={() => context.unsetConnector()}>
          {context.active ? 'Deactivate Connector' : 'Reset'}
        </button>
      )}
    </React.Fragment>
  )
}

export { Connector }
