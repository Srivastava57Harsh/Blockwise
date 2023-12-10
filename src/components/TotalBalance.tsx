import React, { useState, useEffect } from "react";
import { ethers, BigNumberish } from "ethers";
import { Divide } from "lucide-react";

interface Wallet {
  id: number;
  addr: string;
  name: string;
}

const walletAddr: Wallet[] = [
  {
    id: 1,
    addr: "0x8EA809076374708aEF0d6e9C3F0a7A64CAD17368",
    name: "lending wallet 1",
  },
  {
    id: 2,
    addr: "0x788529118F2A28C60b9de2Ba0353f5EE4293e044",
    name: "lending wallet 2",
  },
  {
    id: 3,
    addr: "0x433562fe290637D32ccF24e95713B96Ad8542803",
    name: "lending wallet 3",
  },
];

export const TotalBalance: React.FC = () => {
  const [totalBalance, setTotalBalance] = useState<string>("0");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchBalances() {
      try {
        const provider = new ethers.JsonRpcProvider(); // Initialize your provider
        let balance: BigNumberish = ethers.parseEther("0"); // Initialize balance as 0 ETH
        const individualBalances: { [key: string]: string } = {};

        // Loop through each wallet address and fetch its balance
        for (const wallet of walletAddr) {
          const balanceOfWallet = await provider.getBalance(wallet.addr);
          balance = balance + balanceOfWallet;
          individualBalances[wallet.addr] = ethers.formatEther(balanceOfWallet);
        }

        // Log individual balances
        console.log("Individual Balances:", individualBalances);

        // Update the total balance in the state
        setTotalBalance(ethers.formatEther(balance));
        setIsLoading(false); // Update loading state once balances are fetched
      } catch (error) {
        console.error("Error fetching balances:", error);
        setIsLoading(false); // Update loading state in case of an error
      }
    }

    fetchBalances();
  }, []);

  return (
    <div className="h-32 rounded-lg bg-gray-200 mt-5 text-black flex items-center">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex p-3 bg-white rounded-lg items-center mx-auto">
          <span className="font-mono text-black">Total balance is: </span>
          <span className="text-black font-thin font-mono"> 0.000932 ETH</span>
        </div>
      )}
    </div>
  );
};
