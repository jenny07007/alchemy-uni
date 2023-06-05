# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

## What do you want to test for 🤔

- We don't want someone instantly draining all of our funds, so we should check that the `require` clause in the `withdraw()` function works as expected
- The `destroyFaucet()` function should only be called by the owner, as should the `withdrawAll` function

[From the Hardhat testing docs](https://hardhat.org/tutorial/testing-contracts): A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts, so Faucet here is a factory for instances of our faucet contract.
