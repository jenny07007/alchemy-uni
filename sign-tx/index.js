require("dotenv").config();
const { Alchemy, Network, Wallet, Utils } = require("alchemy-sdk");

const { TEST_API_KEY, TEST_PRIVATE_KEY } = process.env;

const settings = {
  apiKey: TEST_API_KEY,
  network: Network.ETH_GOERLI,
};

const alchemy = new Alchemy(settings);

const wallet = new Wallet(TEST_PRIVATE_KEY);

const main = async () => {
  const nonce = await alchemy.core.getTransactionCount(
    wallet.address,
    "latest",
  );

  const transaction = {
    to: "",
    value: Utils.parseEther("0.001"), // 0.001 worth of ETH being sent
    gasLimit: "21000",
    maxPriorityFeePerGas: Utils.parseUnits("10", "gwei"),
    maxFeePerGas: Utils.parseUnits("50", "gwei"),
    nonce,
    type: 2,
    chainId: 5, // göerli transaction
  };

  const rawTransaction = await wallet.signTransaction(transaction);
  console.log("Raw tx: ", rawTransaction);

  const tx = await alchemy.core.sendTransaction(rawTransaction);
  console.log(`https://goerli.etherscan.io/tx/${tx.hash}`);
};

main();
