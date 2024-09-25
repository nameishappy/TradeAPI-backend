export const handleFileUpload = async (req, res) => {
  console.log("file uploaded");
  res.json({
    success: true,
    message: "File uploaded successfully",
  });
};
