import express from "express";
import {
  createBooking,
  getMyBookings,
} from "../controller/bookingController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protectRoute, createBooking);
router.get("/my", protectRoute, getMyBookings);

export default router;
