import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

import { handleFileUpload } from "../controllers/file.controller.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the folder to store the files
  },
  filename: function (req, file, cb) {
    // Extract the file extension
    const ext = path.extname(file.originalname);
    // Create a custom file name: use original name or a random name + extension
    cb(null, file.fieldname + "-" + Date.now() + ext);
  },
});

const router = express.Router();
const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), handleFileUpload);

export default router;
