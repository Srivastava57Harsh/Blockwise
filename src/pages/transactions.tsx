// pages/index.js or any other Next.js component
import React, { useState } from 'react';

export default function Home() {
  const [walletAddress, setWalletAddress] = useState('');
  const [transactions, setTransactions] = useState(null);

  const handleGetTransactions = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/transactions?address=${walletAddress}`);
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={walletAddress}
        onChange={(e) => setWalletAddress(e.target.value)}
        placeholder="Enter wallet address"
      />
      <button onClick={handleGetTransactions}>Get Transactions</button>

      {transactions && (
        <div>
          <h2>Transactions:</h2>
          <pre>{JSON.stringify(transactions, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
