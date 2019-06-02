import { ethers } from 'ethers'
import { useState, useEffect } from 'react'
import { useWeb3Context } from 'web3-react'

function useContract(address, abi, bytecode) {
  const [contract, setContract] = useState(null)

  const context = useWeb3Context()
  const { active, library } = context

  useEffect(() => {
    function initialize() {
      console.log('useContract: initialize', { address })
      const contract = new ethers.ContractFactory(
        abi,
        bytecode,
        library.getSigner()
      )
        .attach(address)
        .on('ValueChanged', (author, oldValue, newValue, event) => {
          const { blockNumber } = event
          console.log({ event })
          // Called when anyone changes the value

          console.log({ author })
          // "0x14791697260E4c9A71f18484C9f997B308e59325"

          console.log({ oldValue: oldValue.toNumber() })
          // "Hello World"

          console.log({ newValue: newValue.toNumber() })
          // "Ilike turtles."

          // See Event Emitter below for all properties on Event
          console.log(blockNumber)
          // 4115004
        })
      setContract(contract)
    }
    active && initialize()
  }, [active, library, abi, address, bytecode])

  return contract
}
export { useContract }
