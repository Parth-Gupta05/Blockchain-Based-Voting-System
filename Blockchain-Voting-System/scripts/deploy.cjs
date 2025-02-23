const hre = require("hardhat");

async function main() {
  // Get the contract factory
  const Voting = await hre.ethers.getContractFactory("Voting");

  // Deploy the contract
  const voting = await Voting.deploy();
  await voting.deployed();

  console.log("Voting Contract deployed at:", voting.address);
}
// console.log("Deploying Voting Contract...");

// Handle errors
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
