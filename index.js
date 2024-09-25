import express from "express";
import { connectToDB } from "./db.js";
import dotenv from "dotenv";
import multer from "multer";
import fileRouter from "./routes/fileRouter.js";
dotenv.config();
const app = express();

connectToDB();

app.use("/api/v1/files", fileRouter);
const upload = multer({ dest: "uploads/" });

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
