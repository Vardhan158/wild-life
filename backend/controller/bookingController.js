import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  try {
    const {
      serviceType,
      serviceId,
      serviceName,
      serviceImage,
      bookingDate,
      checkInDate,
      checkOutDate,
      guests,
      rooms,
      groupSize,
      totalAmount,
      paymentStatus,
      paymentOrderId,
      paymentId,
      paymentSignature,
    } = req.body;

    if (!serviceType || !serviceId || !serviceName || !totalAmount) {
      return res.status(400).json({
        success: false,
        message: "Missing required booking details",
      });
    }

    const booking = await Booking.create({
      user: req.userId,
      serviceType,
      serviceId,
      serviceName,
      serviceImage,
      bookingDate,
      checkInDate,
      checkOutDate,
      guests: Number(guests) || 0,
      rooms: Number(rooms) || 0,
      groupSize: Number(groupSize) || 0,
      totalAmount: Number(totalAmount),
      paymentStatus: paymentStatus || "pending",
      paymentOrderId,
      paymentId,
      paymentSignature,
    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "userName email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { adminStatus } = req.body;

    if (!["confirmed", "rejected", "pending"].includes(adminStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking status",
      });
    }

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    booking.adminStatus = adminStatus;
    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      booking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
