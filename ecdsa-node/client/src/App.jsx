import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";
import ConnectWallet from "./ConnectWallet";
import server from "./server";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [user, setUser] = useState(null);

  const handleClick = async (e) => {
    const res = await server.post("/connect-wallet");
    const data = await res.data;
    setAddress(data.owner.address);
    setBalance(data.owner.balance);
    setUser(data.owner);
  };

  return (
    <div className="app">
      {!user ? (
        <div style={{ margin: "auto", marginTop: "40vh" }}>
          <ConnectWallet handleClick={handleClick} />
        </div>
      ) : (
        <>
          <Wallet
            balance={balance}
            setBalance={setBalance}
            address={address}
            setAddress={setAddress}
          />
          <Transfer user={user} setBalance={setBalance} address={address} />
        </>
      )}
    </div>
  );
}

export default App;
