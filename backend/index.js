import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { ethers } from "ethers";

dotenv.config({
    path: "./backend/.env"
});

const app = express();

app.use(cors());
app.use(express.json());

/*
|--------------------------------------------------------------------------
| Provider
|--------------------------------------------------------------------------
*/

const provider =
  new ethers.JsonRpcProvider(
    process.env.RPC_URL
  );

/*
|--------------------------------------------------------------------------
| Wallet
|--------------------------------------------------------------------------
*/

const wallet =
  new ethers.Wallet(
    process.env.PRIVATE_KEY,
    provider
  );

/*
|--------------------------------------------------------------------------
| ABI
|--------------------------------------------------------------------------
*/

const abi = [

  "event Incremented(address indexed user, uint256 value)",

  "function increment()",

  "function getCount() view returns(uint256)"
];

/*
|--------------------------------------------------------------------------
| Contract
|--------------------------------------------------------------------------
*/

const contract =
  new ethers.Contract(
    process.env.CONTRACT_ADDRESS,
    abi,
    wallet
  );

/*
|--------------------------------------------------------------------------
| Event Listener
|--------------------------------------------------------------------------
*/

console.log(
  "Listening for blockchain events..."
);

contract.on(
  "Incremented",
  (
    user,
    value,
    event
  ) => {

    console.log(
      "\n========== EVENT RECEIVED =========="
    );

    console.log(
      "User:",
      user
    );

    console.log(
      "Counter Value:",
      value.toString()
    );

    console.log(
      "Transaction Hash:",
      event.log.transactionHash
    );

    console.log(
      "Block Number:",
      event.log.blockNumber
    );

    console.log(
      "===================================="
    );
  }
);

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

app.get(
  "/count",
  async (req, res) => {

    try {

      const count =
        await contract.getCount();

      res.json({
        success: true,
        count: count.toString()
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
);

app.post(
  "/increment",
  async (req, res) => {

    try {

      const tx =
        await contract.increment();

      console.log(
        "Transaction Sent:",
        tx.hash
      );

      const receipt =
        await tx.wait();

      res.json({
        success: true,
        txHash: tx.hash,
        blockNumber:
          receipt.blockNumber
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
);

/*
|--------------------------------------------------------------------------
| Start Server
|--------------------------------------------------------------------------
*/

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Backend running on port ${PORT}`
  );
});