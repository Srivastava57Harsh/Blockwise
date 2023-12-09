require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

const MUMBAI_RPC_ENDPOINT = process.env.NEXT_PUBLIC_MUMBAI_RPC_ENDPOINT;
const SCROLL_RPC_ENDPOINT = process.env.NEXT_PUBLIC_SCROLL_RPC_ENDPOINT;
const MANTLE_RPC_ENDPOINT = process.env.NEXT_PUBLIC_MANTLE_RPC_ENDPOINT;
const CELO_RPC_ENDPOINT = process.env.NEXT_PUBLIC_CELO_RPC_ENDPOINT;
const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
const CELOSCAN_API_KEY = process.env.NEXT_PUBLIC_CELOSCAN_API_KEY;

module.exports = {
  solidity: "0.8.18",
  networks: {
    hardhat: {},
    mumbai: {
      url: MUMBAI_RPC_ENDPOINT,
      accounts: [PRIVATE_KEY],
    },
    scrollSepolia: {
      url: SCROLL_RPC_ENDPOINT,
      accounts: [PRIVATE_KEY],
    },
    mantleTest: {
      url: MANTLE_RPC_ENDPOINT,
      accounts: [PRIVATE_KEY]
    },
    alfajores: {
      url: CELO_RPC_ENDPOINT,
      accounts: [PRIVATE_KEY],
      chainId: 44787,
    }
  },
  etherscan: {
    apiKey: {
      alfajores: CELOSCAN_API_KEY,
      mantleTest: ETHERSCAN_API_KEY,
    },
    customChains: [
      {
        network: 'scrollSepolia',
        chainId: 534351,
        urls: {
          apiURL: 'https://sepolia-blockscout.scroll.io/api',
          browserURL: 'https://sepolia-blockscout.scroll.io/',
        },
      },
      {
        network: "mantleTest",
        chainId: 5001,
        urls: {
        apiURL: "https://explorer.testnet.mantle.xyz/api",
        browserURL: "https://explorer.testnet.mantle.xyz"
        }
      },
      {
        network: "alfajores",
        chainId: 44787,
        urls: {
            apiURL: "https://api-alfajores.celoscan.io/api",
            browserURL: "https://alfajores.celoscan.io",
        },
      },
    ],
  },
};
