import fs from "fs";
import csv from "csv-parser";
import { Order } from "../models/trade.model.js";

export const handleFileUpload = async (req, res) => {
  const results = [];

  console.log(req.file);
  if (!req.file) {
    res.status(400).send({
      status: "error",
      response: "No file uploaded.",
    });
    return;
  }
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (data) => {
      const transformedData = {
        User_ID: data.User_ID,
        UTC_Time: data.UTC_Time,
        Operation: data.Operation,
        Market: data.Market,
        Amount: data["Buy/Sell Amount"],
        Price: data.Price,
      };
      results.push(transformedData);
    })
    .on("end", () => {
      Order.insertMany(results)
        .then(() => {
          fs.unlinkSync(req.file.path);
          res.status(200).send({
            status: "success",
            response: "CSV data successfully stored in the database.",
          });
        })
        .catch((err) => {
          console.error("Error saving to database:", err);
          res.status(500).send("Error saving data to database.");
        });
    });
};

export const fetchBalance = async (req, res) => {
  try {
    const { timestamp } = req.body;
    if (!timestamp) {
      res.status(400).json({ error: "Timestamp is required" });
      return;
    }
    const givenTime = new Date(timestamp);
    const trades = await Order.find({ UTC_Time: { $lte: givenTime } });
    const assetBalances = {};
    trades.forEach((trade) => {
      const [asset] = trade.Market.split("/");
      if (!assetBalances[asset]) {
        assetBalances[asset] = 0;
      }
      if (trade.Operation === "Buy") {
        assetBalances[asset] += trade.Amount;
      } else if (trade.Operation === "Sell") {
        assetBalances[asset] -= trade.Amount;
      }
    });
    res.json(assetBalances);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request" });
  }
};
