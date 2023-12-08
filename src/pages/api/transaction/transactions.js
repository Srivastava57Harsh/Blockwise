// pages/api/getTransactions.js
import Moralis from "moralis";
import Cors from "cors";
import { EvmChain } from "@moralisweb3/common-evm-utils";

const cors = Cors({
  methods: ["GET"],
});

async function handler(req, res) {
  // Extract wallet address from headers
  const walletAddress = req.headers["wallet-address"]; // Modify this according to your actual header name

  Moralis.start({
    appId: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
  });

  await cors(req, res);

  if (req.method !== "GET") {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    // Use the extracted wallet address
    const address = walletAddress || req.query.address;
    const chain = EvmChain.ETHEREUM; // Update with the correct chain if needed

    // Validate that the address is provided
    if (!address) {
      return res.status(400).json({ error: "Wallet address is required" });
    }

    const response = await Moralis.EvmApi.transaction.getWalletTransactions({
      address,
      chain,
    });

    console.log("harsh", response);

    res.status(200).json(response.toJSON());
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export default handler;
