// Generate root
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");
const merkeTree = new MerkleTree(niceList);

console.log(`Root: ${merkeTree.getRoot()}`);
console.log(`Leaves: ${niceList.length}`);
console.log(`Layers: ${Math.ceil(Math.log2(niceList.length))}`);

process.exit();
