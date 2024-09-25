import fs from "fs";
import csv from "csv-parser";

export const handleFileUpload = async (req, res) => {
  const results = [];

  console.log(req.file);
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      console.log(results);
    });
  console.log("file uploaded");
  res.json({
    success: true,
    message: "File uploaded successfully",
  });
};
