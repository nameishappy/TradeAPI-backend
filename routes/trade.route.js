import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

import {
  fetchBalance,
  handleFileUpload,
} from "../controllers/trade.controller.js";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UPLOADS_DIR = path.join(__dirname, "../uploads");
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOADS_DIR);
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
