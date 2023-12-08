const hre = require("hardhat");

async function main() {
    // const splitPayments = await hre.ethers.deployContract("SplitPayments");
    // const contract = await splitPayments.waitForDeployment();

    const p2pTransactions = await hre.ethers.deployContract("P2PTransactions");
    const contract = await p2pTransactions.waitForDeployment();
  
    const address = await contract.getAddress();
    console.log("Address of deployed contract: ", address);
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  