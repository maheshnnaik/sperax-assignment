import React, { useEffect, useState } from 'react';
import './App.css';
import { getAccount } from './utils/utility';
import { Home } from './Home';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [accountAddress, setAccountAddress] = useState("");

  useEffect(() => {
    async function connectWallet() {
      try {
        const account = await getAccount();
        setAccountAddress(account);
        setIsConnected(true);
      } catch (error) {
        setIsConnected(false);
      }
    }
    connectWallet();
    // connect()
  }, [])
  return (
    <div className="App">
      <Home isConnected={isConnected} setIsConnected={setIsConnected} accountAddress={accountAddress} setAccountAddress={setAccountAddress}/>
    </div>
  );
}

export default App;
