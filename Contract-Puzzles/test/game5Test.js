const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert } = require("chai");
const { ethers } = require("hardhat");

describe("Game5", function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory("Game5");
    const game = await Game.deploy();

    return { game };
  }
  it("should be a winner", async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);

    // good luck
    const provider = game.provider;
    const threshold = ethers.BigNumber.from(
      "0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf",
    );
    const [deployer] = await ethers.getSigners();

    let winnerWallet;
    for (let i = 0; i < 100000; i++) {
      // try 100000 times
      const randomWallet = ethers.Wallet.createRandom().connect(provider);
      if (ethers.BigNumber.from(randomWallet.address).lt(threshold)) {
        winnerWallet = randomWallet;
        break;
      }
    }

    // check if we found a winner address
    assert(winnerWallet, "Failed to find a winner wallet");

    // send some Ether to the winner wallet
    await deployer.sendTransaction({
      to: winnerWallet.address,
      value: ethers.utils.parseEther("1"), // 1 Ether
    });

    // use the winner address to win the game
    const gameWithWinner = game.connect(winnerWallet);
    await gameWithWinner.win();

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
