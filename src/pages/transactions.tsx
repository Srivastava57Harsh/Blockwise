import React, { useEffect, useState } from "react";

export default function Home() {
  const [walletAddress, setWalletAddress] = useState("");
  const [transactions, setTransactions] = useState(null);

  const handleGetTransactions = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/transaction/transactions`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Wallet-Address": walletAddress,
            // Add any other headers your API requires
          },
        }
      );

      console.log("hello");
      console.log(response);

      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
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
