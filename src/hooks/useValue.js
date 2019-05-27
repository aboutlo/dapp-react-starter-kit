import { useState, useEffect } from 'react'
import { web3 } from '../blockchain/Web3'
import ExampleAbi from '../abi/Example.abi'

function useGetValue() {
  const [value, setValue] = useState(0)
  const [fetching, setStatus] = useState(true)

  console.log(ExampleAbi.abi)
  const exampleContract = web3.eth.contract(
    [ExampleAbi],
    '0xCfEB869F69431e42cdB54A4F4f105C19C080A601'
  )
  console.log('address:', exampleContract.address)

  const getValue = async () => {
    const returnedValue = await exampleContract.value.call()
    console.log({ returnedValue })
    setValue(parseInt(returnedValue))
    setStatus(false)
  }

  useEffect(() => {
    getValue()
  }, [getValue])

  return [value, fetching]
}
export { useGetValue }
