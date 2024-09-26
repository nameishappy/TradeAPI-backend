import express from "express";
import { connectToDB } from "./db.js";
import dotenv from "dotenv";

import tradeRouter from "./routes/trade.route.js";
dotenv.config();
const app = express();

const PORT = process.env.PORT;

connectToDB();
app.use(express.json());

app.use("/api/v1/trades", tradeRouter);

app.get("/", (req, res) => {
  res.send("Balance Calculator");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
