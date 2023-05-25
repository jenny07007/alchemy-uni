export default function Table({ block }) {
  const timestamp = block.timestamp;
  const date = new Date(timestamp * 1000);
  const formattedTime = date.toLocaleTimeString([], {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <table>
      <tbody>
        <tr>
          <td>Hash:</td>
          <td>{block.hash}</td>
        </tr>
        <tr>
          <td>Block Number:</td>
          <td>{block.number}</td>
        </tr>
        <tr>
          <td>Difficulty:</td>
          <td>{block.difficulty}</td>
        </tr>
        <tr>
          <td>Nonce:</td>
          <td>{block.nonce}</td>
        </tr>
        <tr>
          <td>Miner:</td>
          <td>{block.miner}</td>
        </tr>
        <tr>
          <td>Parent Hash:</td>
          <td>{block.parentHash}</td>
        </tr>
        <tr>
          <td>Timestamp:</td>
          <td>{`${formattedTime} ${formattedDate}`}</td>
        </tr>
      </tbody>
    </table>
  );
}
