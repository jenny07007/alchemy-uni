// add the game address here and update the contract name if necessary
// const gameAddr1 = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
// const gameAddr2 = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
// const gameAddr3 = "0x0165878A594ca255338adfa4d48449f69242Eb8F";
// const gameAddr4 = "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6";
const gameAddr5 = "0x610178dA211FEF7D417bC0e6FeD39F05609AD788";

const contractName = "Game5";

async function main() {
  // attach to the game
  const game = await hre.ethers.getContractAt(contractName, gameAddr5);

  // do whatever you need to do to win the game here:
  // const tx1 = await game.setX(10);
  // await tx1.wait();
  // const tx2 = await game.setY(40);
  // await tx2.wait();

  // GAME3
  // const tx = await game.win(45);

  // GAME4: 210(y) + 56(x) = 266. uint8 overflows at 256. result = 10
  // const tx = await game.win(56);

  // GAEM5
  const tx1 = await game.giveMeAllowance(10000);
  await tx1.wait();

  const tx2 = await game.mint(10000);
  await tx2.wait();

  const tx = await game.win();

  // did you win? Check the transaction receipt!
  // if you did, it will be in both the logs and events array
  const receipt = await tx.wait();
  console.log(receipt);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
