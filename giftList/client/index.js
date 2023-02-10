const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";
const merkeTree = new MerkleTree(niceList);

async function main() {
  // TODO: how do we prove to the server we're on the nice list?
  const name = "Sheila Bartell DDS";
  const index = niceList.findIndex((n) => n === name);

  console.log(`index: ${index}`);
  console.log(`name: ${name}`);

  try {
    const proof = await merkeTree.getProof(index);
    const { data: gift } = await axios.post(`${serverUrl}/gift`, {
      // TODO: add request body parameters here!
      proof,
      left: name,
    });
    console.log({ gift });
  } catch (error) {
    console.log(error.message);
  }
}

main();
