const express = require("express");
const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const owner = { pubKey: "", privateKey: "", address: "", balance: 0 };
const receiver = {
  "0x11cfc6400cda17107757b55604b4346fd2bace2f": 0,
};

// const balances = {
//   "0x1": 100,
//   "0x2": 50,
//   "0x3": 75,
// };

const balances = {};

app.post("/connect-wallet", (req, res) => {
  const privateKey = secp.utils.randomPrivateKey();
  const publicKey = secp.getPublicKey(privateKey);
  const slicedPubKey = publicKey.slice(1);
  const address = keccak256(slicedPubKey).slice(-20);
  owner.privateKey = toHex(privateKey);
  owner.pubKey = toHex(publicKey);
  owner.address = "0x" + toHex(address);
  owner.balance = 100;
  res.send({ owner });
  console.log(owner);
});

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  let balance;
  if (address === owner.address) {
    balance = owner.balance || 0;
  }
  if (Object.keys(receiver).includes(address)) {
    balance = receiver[address] || 0;
  } else {
    receiver[address] = 0;
    balance = receiver[address];
  }
  res.send({ balance });
});

app.post("/send", (req, res) => {
  /**
   * TO DO:
   * get the signature from the client side of application
   * recover the public address from the signature
   */

  const { sender, recipient, amount, sig } = req.body;

  // setInitialBalance(sender);
  // setInitialBalance(recipient);

  if (sender !== owner.address) {
    console.error("Wallet address has been compromised");
  }

  const int8Sig = Uint8Array.from(Object.values(sig[0]));

  const reqData = `${sender}${+amount}${recipient}`;
  const hashMessage = (msg) => {
    const bytes = utf8ToBytes(msg);
    return keccak256(bytes);
  };

  const recoverKey = (message, sig, recoverBit) => {
    const hashMsg = hashMessage(message);
    const pubKey = secp.recoverPublicKey(
      toHex(hashMsg),
      sig,
      recoverBit,
      (isCompressed = false),
    );
    return pubKey;
  };

  const pubKeyFromSender = toHex(recoverKey(reqData, int8Sig, sig[1]));

  try {
    if (pubKeyFromSender !== owner.pubKey || sender !== owner.address) return;
    if (owner.balance < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    }

    owner.balance -= amount;
    receiver[recipient] += amount;
    res.send({ balance: owner.balance });
    console.log(receiver);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

// function setInitialBalance(address) {
//   if (!balances[address]) {
//     balances[address] = 0;
//   }
// }
