#

- [x] [week 1 project](/ecdsa-node/)

  The solution involves creating a login page to obtain the sender's private key. Once logged in, a random private key is generated and associated with the sender. The client signs the transaction with the private key, amount, and recipient address, which is validated on the server by recovering the public key from the signature. Input validations and component styling are also implemented.

- [x] [week 2 project](/giftList/)

  The solutions involves generating the Merkle root that represents the whole nice list, when the client tries to send one name to the server, the server then takes the client's proof to verify the name is actually in the nice list.

- [x] [week 3 project](/blockexplorer/)

  Here's a [demo](https://youtu.be/C8aDR6EHWSc) of the block explorer. I haven't implemented the API on the server-side, and since I don't want to expose my Alchemy API key, there's no link to share. 🙂

- [x] [week 4 assignment](/emitWinnerEvent/)

  The assignment asks how we could possibly make `tx.origin` (the EOA who originated the transaction) unequal to `msg.sender` in the target contract. As it turns out, we can create a proxy contract to trigger the attempt function in the target contract. This meets the condition where `msg.sender` and `tx.origin` are not equal, and subsequently triggers the 'Winner' event in the target contract.
  Therefore, the main concept here is that `msg.sender` can be either an EOA or a contract, depending on who or what initiated the function call. On the other hand, `tx.origin` is always the address that initiated the transaction.

  [proxy contrast](https://goerli.etherscan.io/address/0x48ee2F1402A87C55089360A8f8E9871d52C07dD5)
