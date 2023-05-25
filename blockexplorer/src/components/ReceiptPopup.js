import React from "react";
import ReactDOM from "react-dom";

export default function ReceiptPopup({ onClose, receipt }) {
  const {
    transactionHash,
    blockNumber,
    to,
    from,
    cumulativeGasUsed,
    effectiveGasPrice,
    byzantium,
  } = receipt;

  return ReactDOM.createPortal(
    <div className="popup">
      <div className="popup-content fade-in">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <table>
          <tbody>
            <tr>
              <td>Transaction Hash:</td>
              <td>{transactionHash}</td>
            </tr>
            <tr>
              <td>Block Number:</td>
              <td>{blockNumber}</td>
            </tr>
            <tr>
              <td>To:</td>
              <td>{to}</td>
            </tr>
            <tr>
              <td>From:</td>
              <td>{from}</td>
            </tr>
            <tr>
              <td>CumulativeGasUsed:</td>
              <td>{cumulativeGasUsed.toString()}</td>
            </tr>
            <tr>
              <td>EffectiveGasPrice:</td>
              <td>{effectiveGasPrice.toString()}</td>
            </tr>
            <tr>
              <td>Byzantium:</td>
              <td>{byzantium === true ? "true" : "false"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>,
    document.querySelector("#popup"),
  );
}
