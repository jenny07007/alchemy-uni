const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert } = require("chai");
const { ethers } = require("hardhat");

describe("Game4", function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory("Game4");
    const game = await Game.deploy();

    const singer = ethers.provider.getSigner(0);
    const address = await singer.getAddress();

    return { game, singer, address };
  }
  it("should be a winner", async function () {
    const { game, singer, address } = await loadFixture(
      deployContractAndSetVariables,
    );

    // nested mappings are rough :}
    await game.connect(singer).write(address);
    await game.connect(singer).win(address);

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
