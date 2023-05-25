import { useCallback, useEffect, useState } from "react";

import Table from "./components/Table";
import Transactions from "./components/Transactions";
import { alchemy } from "./utils/alchemy";

import "./App.css";

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [block, setBlock] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }
    getBlockNumber();
  }, []);

  const getBlock = useCallback(async () => {
    setLoading(true);
    const block = await alchemy.core.getBlock(blockNumber);
    setBlock(block);

    const timeoutID = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeoutID);
  }, [blockNumber]);

  useEffect(() => {
    getBlock();
  }, [getBlock]);

  return (
    <div className="container">
      {loading ? (
        <div className="loading-state">WORKING 🚀...</div>
      ) : (
        <div className="wrapper fade-in">
          <h1>Last Block Number {blockNumber}</h1>
          <hr />
          {block && (
            <div>
              <Table block={block} />
              <div className="transactions-wrapper">
                <div className="transactions-title">
                  <h2>Transactions</h2>
                  <p>{block?.transactions?.length} transactions</p>
                </div>
                <Transactions block={block} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
