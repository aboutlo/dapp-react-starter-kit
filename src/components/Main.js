import React, { useState } from 'react'
import { useWeb3Context } from 'web3-react'
import BigNumber from 'bignumber.js'
import { Connector } from './Connector'
import ExampleContract from '../abi/Example.abi'
import { useContract } from '../hooks/useContract'

// WARNING this has to be update after truffle deploy
const CONTRACT_ADDRESS = '0x3F2aF34E4250de94242Ac2B8A38550fd4503696d'
console.log('CONTRACT_ADDRESS:', process.env.REACT_APP_CONTRACT_ADDRESS)

function Main() {
  const [value, setValue] = useState(0)
  const contract = useContract(
    CONTRACT_ADDRESS,
    ExampleContract.abi,
    ExampleContract.bytecode
  )
  const context = useWeb3Context()
  const { active } = context

  const onSetValue = async e => {
    e.preventDefault()
    console.log('onSetValue:', { value })
    const tx = await contract.setValue(value)
    console.log(tx.hash)
    await tx.wait()
  }

  const onGetValue = async e => {
    e.preventDefault()
    const returnedValue = await contract.value()
    setValue(BigNumber(returnedValue).toNumber())
    console.log({ returnedValue, vOf: returnedValue.toNumber() })
  }

  const onChange = e => {
    const inputValue = parseInt(e.target.value)
    !isNaN(inputValue)
      ? setValue(parseInt(e.target.value))
      : setValue(e.target.value)
  }
  return (
    <>
      <Connector />
      <form>
        <h1>Example Smart Contract (ethers)</h1>
        <input
          type="number"
          name="value"
          disabled={!active}
          onChange={onChange}
          value={value}
        />
        <button type="button" disabled={!active} onClick={onGetValue}>
          getValue
        </button>
        <button type="button" disabled={!active} onClick={onSetValue}>
          setValue
        </button>
      </form>
    </>
  )
}

export { Main }
