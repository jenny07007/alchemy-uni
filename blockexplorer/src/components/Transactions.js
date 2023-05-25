import { useState } from "react";
import Pagniation from "./Pagniation";
import ReceiptPopup from "./ReceiptPopup";
import { alchemy } from "../utils/alchemy";

const Transactions = ({ block }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentReceipt, setCurrentReceipt] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // Calculate the index of the first and last transaction
  const indexOfLastTx = currentPage * itemsPerPage;
  const indexOfFirstTx = indexOfLastTx - itemsPerPage;

  // Get current transactions
  const currentTransactions = block?.transactions?.slice(
    indexOfFirstTx,
    indexOfLastTx,
  );

  async function getTransaction(globalIdx) {
    const receipt = await alchemy.core.getTransactionReceipt(
      block.transactions[globalIdx],
    );
    setCurrentReceipt(receipt);
    setIsModalOpen(true);
  }

  return (
    <>
      {isModalOpen && (
        <ReceiptPopup
          onClose={() => setIsModalOpen(false)}
          receipt={currentReceipt}
        />
      )}

      <div className="transactions">
        {currentTransactions?.map((tx, idx) => {
          const globalIdx = (currentPage - 1) * itemsPerPage + idx;
          return (
            <p
              className="transaction"
              onClick={() => getTransaction(globalIdx)}
              key={tx}
            >
              {tx.replace(/(0x.{6}).*(.{6})$/, "$1...$2")}
            </p>
          );
        })}
      </div>
      <Pagniation
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        block={block}
      />
    </>
  );
};

export default Transactions;
