require("dotenv").config();
const axios = require("axios");

const main = async () => {
  try {
    const response = await axios.post(process.env.ALCHEMY_URL, {
      jsonrpc: "2.0",
      id: 1,
      method: "eth_getBlockByNumber",
      params: [
        "0x1b4", // block 436
        false, // retrieve the full transaction object in transactions array
      ],
    });
    console.log(response.data.result);
  } catch (error) {
    console.log(error.message);
  }
};

main();
