import React from 'react'
import Web3Provider from 'web3-react'
import { connectors } from './blockchain/connectors'
import { Main } from './components/Main'
import './App.css'

function App() {
  return (
    <div className="App">
      <Web3Provider connectors={connectors} libraryName="ethers.js">
        <div className="App">
          <Main />
        </div>
      </Web3Provider>
    </div>
  )
}

export default App
