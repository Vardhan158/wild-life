import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    serviceType: {
      type: String,
      enum: ["resort", "safari"],
      required: true,
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    serviceName: {
      type: String,
      required: true,
    },
    serviceImage: {
      type: String,
      default: "",
    },
    bookingDate: {
      type: String,
      default: "",
    },
    checkInDate: {
      type: String,
      default: "",
    },
    checkOutDate: {
      type: String,
      default: "",
    },
    guests: {
      type: Number,
      default: 0,
    },
    rooms: {
      type: Number,
      default: 0,
    },
    groupSize: {
      type: Number,
      default: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "not_required", "failed"],
      default: "pending",
    },
    adminStatus: {
      type: String,
      enum: ["pending", "confirmed", "rejected"],
      default: "pending",
    },
    paymentOrderId: {
      type: String,
      default: "",
    },
    paymentId: {
      type: String,
      default: "",
    },
    paymentSignature: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
