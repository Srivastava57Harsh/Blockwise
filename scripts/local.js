const hre = require("hardhat");

async function getBalance(address) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.formatEther(balanceBigInt);
}

async function consoleBalances(addresses) {
  let counter = 0;
  for (const address of addresses) {
    console.log(`Address ${counter} balance: `, await getBalance(address));  
  }
}


async function main() {
  const [owner, from1, from2, from3] = await hre.ethers.getSigners();
  const cryptoBrew = await hre.ethers.deployContract("CryptoBrew");
  const contract = await cryptoBrew.waitForDeployment();

  const address = await contract.getAddress();
  console.log("Address of deployed contract: ", address);
  const addresses = [owner.address, from1.address, from2.address, from3.address];

  console.log("Balances before brewing: ");
  await consoleBalances(addresses);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
