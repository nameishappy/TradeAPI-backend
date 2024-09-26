import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

import {
  fetchBalance,
  handleFileUpload,
} from "../controllers/trade.controller.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + ext);
  },
});

const router = express.Router();
const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), handleFileUpload);
router.post("/get-balance", fetchBalance);

export default router;
