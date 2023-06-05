const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Faucet", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContractAndSetVariables() {
    const Faucet = await ethers.getContractFactory("Faucet");
    const faucet = await Faucet.deploy();

    const [owner] = await ethers.getSigners();

    console.log("Signer 1 address: ", owner.address);

    let withdrawAmount = ethers.utils.parseUnits("1", "ether");
    return { faucet, owner, withdrawAmount };
  }

  it("Should deploy and set the owner correctly", async function () {
    const { faucet, owner } = await loadFixture(deployContractAndSetVariables);

    expect(await faucet.owner()).to.equal(owner.address);
  });

  it("Should not allow withdrawals above .1 ETH at a time", async function () {
    const { faucet, withdrawAmount } = await loadFixture(
      deployContractAndSetVariables,
    );
    await expect(faucet.withdraw(withdrawAmount)).to.be.reverted;
  });

  // CHALLENGE: The destroyFaucet function should be able to called by the contract owner
  // as should the withdrawAll function

  it("Should only allow the owner to call destroryFaucet", async function () {
    const { faucet, owner } = await loadFixture(deployContractAndSetVariables);
    const [, nonOwner] = await ethers.getSigners();

    // Expect that calling destroyFaucet as a non-owner will be reverted
    await expect(faucet.connect(nonOwner).destroyFaucet()).to.be.reverted;

    // Expect that calling destroyFaucet as the owner will succeed
    await expect(faucet.connect(owner).destroyFaucet()).to.not.be.reverted;
  });

  it("Should only allow the owner to call withdraw", async function () {
    const { faucet, owner } = await loadFixture(deployContractAndSetVariables);
    const [, nonOwner] = await ethers.getSigners();

    await expect(faucet.connect(nonOwner).withdrawAll()).to.be.reverted;
    await expect(faucet.connect(owner).withdrawAll()).to.not.be.reverted;
  });
});
