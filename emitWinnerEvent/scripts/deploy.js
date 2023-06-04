const hre = require("hardhat");

async function main() {
  const targetContractAddress = "0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502";
  const ProxyContract = await hre.ethers.getContractFactory("ProxyContract");
  const proxyContract = await ProxyContract.deploy();
  await proxyContract.deployed();

  console.log("ProxyContract deployed to:", proxyContract.address);

  const tx = await proxyContract.callAttempt(targetContractAddress);
  const receipt = await tx.wait();
  console.log("Transaction conformed: ", receipt);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
