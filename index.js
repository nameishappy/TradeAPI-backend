import express from "express";
import { connectToDB } from "./db.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

connectToDB();

app.get("/", (req, res) => {
  res.render("<h1>Hello World</h1>");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
