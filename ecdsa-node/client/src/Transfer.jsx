import { useState, useEffect } from "react";
import server from "./server";
import { sign } from "ethereum-cryptography/secp256k1";
import { utf8ToBytes, toHex } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";

function Transfer({ address, setBalance, user }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [recipientBalance, setRecipientBalance] = useState();

  const setValue = (setter) => (evt) => setter(evt.target.value);
  useEffect(() => {
    if (recipient) {
      (async () => {
        const {
          data: { balance },
        } = await server.get(`balance/${recipient}`);
        setRecipientBalance(balance);
      })();
    } else {
      setRecipientBalance(0);
    }
  }, [recipient]);

  async function transfer(evt) {
    evt.preventDefault();

    if (
      !recipient ||
      !sendAmount ||
      Number.isNaN(Number(sendAmount)) ||
      sendAmount.length > 25
    ) {
      alert("Please fill out a correct address and amount");
      return;
    }

    const reqData = `${address}${+sendAmount}${recipient}`;
    const hashMessage = (msg) => {
      const bytes = utf8ToBytes(msg);
      return keccak256(bytes);
    };

    try {
      const signMessage = async (msg) => {
        const hashMsg = hashMessage(msg);
        const sig = await sign(toHex(hashMsg), user.privateKey, {
          recovered: true,
        });
        return sig;
      };

      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseFloat(sendAmount),
        recipient,
        sig: await signMessage(reqData),
      });
      setBalance(balance);

      try {
        const {
          data: { balance },
        } = await server.get(`balance/${recipient}`);
        setRecipientBalance(balance);
      } catch (error) {
        alert(error.response.data.message);
      }
    } catch (ex) {
      console.log(ex);
      alert(ex.response.data.message);
    }

    setSendAmount("");
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>
      <div className="balance">Recipient Balance: {recipientBalance}</div>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
