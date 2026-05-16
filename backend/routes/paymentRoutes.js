import express from "express";
import crypto from "crypto";
import Razorpay from "razorpay";

const router = express.Router();
const DEFAULT_MAX_TRANSACTION_AMOUNT = 100000;

const getRazorpayClient = () => {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error("Razorpay credentials are missing");
  }

  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
};

router.post("/create-order", async (req, res) => {
  try {
    const amount = Number(req.body.amount);
    const maxTransactionAmount =
      Number(process.env.RAZORPAY_MAX_TRANSACTION_AMOUNT) ||
      DEFAULT_MAX_TRANSACTION_AMOUNT;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "A valid amount is required",
      });
    }

    if (amount > maxTransactionAmount) {
      return res.status(400).json({
        success: false,
        message: `Online payment is currently limited to ₹${maxTransactionAmount.toLocaleString()} per booking. Please reduce the booking amount or update your Razorpay transaction limit.`,
      });
    }

    const options = {
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const razorpay = getRazorpayClient();
    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      order,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Order creation failed",
    });

  }
});

router.post("/verify-payment", (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Missing payment verification fields",
      });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    return res.json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
  }
});

export default router;
