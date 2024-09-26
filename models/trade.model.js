import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
  User_ID: {
    type: String,
    required: true,
  },
  UTC_Time: {
    type: Date,
  },
  Operation: {
    type: String,
  },
  Market: { type: String },
  Amount: { type: Number },
  Price: { type: String },
});

export const Order = mongoose.model("Order", orderSchema);
