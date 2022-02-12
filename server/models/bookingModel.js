import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
  dealer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});
