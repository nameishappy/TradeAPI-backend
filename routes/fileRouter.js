import express from "express";
import multer from "multer";

import { handleFileUpload } from "../controllers/file.controller.js";

const router = express.Router();
const upload = multer({ dest: "uploadnew/" });

router.post("/upload", upload.single("file"), handleFileUpload);

export default router;
