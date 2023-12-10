import React, { useState, useEffect } from "react";
import { useAccount, useNetwork } from "wagmi";
import Web3 from "web3"; // Import Web3.js library

export const Transactions = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { chain, chains } = useNetwork();
  const [transactions, setTransactions] = useState([]);

  // const chainName = chain.name;

  useEffect(() => {
    console.log("HEY", chain);
    const fetchTransactions = async () => {
      try {
        if (!isConnecting && !isDisconnected && address) {
          console.log("kevin");
          const response = await fetch(
            "https://0fa9-14-195-9-98.ngrok-free.app/api/moralis/transactions",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "wallet-address": address,
                chain: "80001",
              },
            }
          );

          console.log("kevin", response);

          if (response.ok) {
            const data = await response.json();
            console.log("kevin", data); // Log the actual data payload
            setTransactions(data.result);
          } else {
            console.error("Failed to fetch transactions");
          }
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [address, isConnecting, isDisconnected, chain]);

  return (
    <section className="py-1 bg-blueGray-50">
      <div className="w-full   px-4 mx-auto mt-5">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full  max-w-full flex items-center">
                <h3 className="font-semibold text-base text-blueGray-700 font-mono">
                  Transaction
                </h3>
              </div>
            </div>
          </div>

          <div className="block w-full overflow-x-auto ">
            <table className="items-center bg-transparent w-full border-collapse ">
              <thead>
                <tr>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold font-mono text-left">
                    From Address
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold font-mono text-left">
                    To Address
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left font-mono">
                    Amount
                  </th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((transaction, index) =>
                  transaction.to_address &&
                  transaction.value !== null &&
                  transaction.value !== "0" ? (
                    <tr key={index} className="hover:bg-gray-200">
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                        {transaction.from_address}
                      </th>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                        {transaction.to_address}
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {Web3.utils.fromWei(transaction.value, "ether")} ETH
                      </td>
                    </tr>
                  ) : null
                )}
                {/* <tr className="hover:bg-gray-200">
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700  ">
                    Saving Wallet
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                    1 ETH
                  </td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Transactions;
