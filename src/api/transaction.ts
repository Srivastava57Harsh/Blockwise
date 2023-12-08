// pages/api/getTransactions.js
import { getTransactionsByAddress } from "etherscan-api";
import ethers from "ethers";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const apiKey = "YOUR_ETHERSCAN_API_KEY"; // Replace with your Etherscan API key
    const walletAddress = req.query.address;

    // Validate that the address is provided
    if (!walletAddress) {
      return res.status(400).json({ error: "Wallet address is required" });
    }

    // Create an ethers.js provider using Etherscan
    const provider = new ethers.providers.EtherscanProvider(
      "homestead",
      apiKey
    );

    // Get the transaction history for the address
    const transactions = await getTransactionsByAddress(apiKey, walletAddress);

    res.status(200).json({ transactions });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
