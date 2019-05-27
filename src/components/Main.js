import React, { useState } from 'react'
import { useWeb3Context } from 'web3-react'
import { ethers } from 'ethers'
import BigNumber from 'bignumber'
import { connectors } from '../blockchain/connectors'
import { Web3Info } from './Web3Info'
import ExampleContract from '../abi/Example.abi'

const CONTRACT_ADDRESS = '0xCfEB869F69431e42cdB54A4F4f105C19C080A601'

function Main() {
  const [value, setValue] = useState(0)
  const context = useWeb3Context()

  const onSubmit = async e => {
    e.preventDefault()
    const exampleContract = new ethers.ContractFactory(
      ExampleContract.abi,
      ExampleContract.bytecode,
      context.library.getSigner()
    ).attach(CONTRACT_ADDRESS)
    const tx = await exampleContract.setValue(value)
    console.log(tx.hash)
    await tx.wait()
  }

  const getValue = async e => {
    e.preventDefault()

    const exampleContract = new ethers.ContractFactory(
      ExampleContract.abi,
      ExampleContract.bytecode,
      context.library.getSigner()
    ).attach(CONTRACT_ADDRESS)
    console.log({ exampleContract })
    const returnedValue = await exampleContract.value()
    console.log({ value, returnedValue })
    setValue(BigNumber(returnedValue).toNumber())
  }
  return (
    <>
      <Connector />
      <form onSubmit={onSubmit}>
        <h1>Example Smart Contract (ethers)</h1>
        <input
          type="number"
          name="value"
          onChange={e => setValue(parseInt(e.target.value))}
          value={value}
        />
        <button type="button" onClick={getValue}>
          getValue
        </button>
        <button type="submit">setValue</button>
      </form>
      <h2>Configurations</h2>
      <p>URL:</p>
    </>
  )
}

function Connector() {
  const context = useWeb3Context()

  console.log(context)

  if (context.error) {
    console.error('Error!')
  }

  const [transactionHash, setTransactionHash] = useState()

  function sendTransaction() {
    const signer = context.library.getSigner()

    signer
      .sendTransaction({
        to: ethers.constants.AddressZero,
        value: ethers.utils.bigNumberify('0'),
      })
      .then(({ hash }) => {
        setTransactionHash(hash)
      })
  }

  return (
    <React.Fragment>
      <h1>web3-react Demo</h1>
      <h3>(latest)</h3>

      <Web3Info />

      {context.error && (
        <p>An error occurred, check the console for details.</p>
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

      {context.active && context.account && !transactionHash && (
        <button onClick={sendTransaction}>Send Dummy Transaction</button>
      )}

      {transactionHash && <p>{transactionHash}</p>}
    </React.Fragment>
  )
}

export { Main }
