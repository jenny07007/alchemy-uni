// import testing libraries: https://www.chaijs.com/guide/styles/
const { expect, assert } = require("chai");

// the `describe` scope encapsulates an entire test called `TestModifyVariable`
// the `it` says the behavior that should be expected from the test
describe("TestModifyVariable", function () {
  let contract;

  beforeEach(async () => {
    // this line creates an ethers ContractFactory abstraction: https://docs.ethers.org/v5/api/contract/contract-factory/
    const ModifyVariable = await ethers.getContractFactory("ModifyVariable");

    // we then use the ContractFactory object to deploy an instance of the contract
    contract = await ModifyVariable.deploy(10, "hello");

    // wait for contract to be deployed and validated!
    await contract.deployed();
  });

  it("should change x to 1337", async function () {
    // modify x from 10 to 1337 via this function!
    await contract.modifyToLeet();
    // getter for state variable x
    const newX = await contract.x();
    assert.equal(newX.toNumber(), 1337);
  });

  it("should change s to leet", async function () {
    await contract.modifyToLeet();
    const newS = await contract.s();
    assert.equal(newS.toString(), "leet");
  });
});
