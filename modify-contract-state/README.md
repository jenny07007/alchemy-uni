# Installations

```shell
mkdir modify-contract-state && cd modify-contract-state
npm init -y
npm install --save-dev hardhat
npm install @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers
npx hardhat  # select "Create an empty hardhat.config.js"
```

## Extra Challenges

- Create a new type `string` state variable and modify it
- Change the constructor argument
- Add a new test
- Create a `scripts` directory, deploy your contract and change the contract state
