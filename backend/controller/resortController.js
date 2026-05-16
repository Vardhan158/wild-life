import Resort from "../models/Resort.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

/* ================= CREATE RESORT ================= */

export const createResort = async (req, res) => {
  try {

    const {
      name,
      type,
      price,
      rating,
      reviews,
      description,
      location,
      amenities,
      facilities,
      roomTypes,
      roomsAvailable,
    } = req.body;
    let imageUrl = req.body.image;

    /* ---------- CHECK IMAGE ---------- */
    if (!req.file && !imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image",
      });
    }

    if (req.file) {
      /* ---------- UPLOAD TO CLOUDINARY ---------- */
      const cloudinaryResponse = await cloudinary.uploader.upload(
        req.file.path,
        {
          folder: "wild-life-resorts",
        }
      );

      console.log(cloudinaryResponse);
      imageUrl = cloudinaryResponse.secure_url;

      /* ---------- DELETE LOCAL FILE ---------- */
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
    }

    /* ---------- CREATE RESORT ---------- */

    const resort = new Resort({
      name,
      type,
      price,
      rating,
      reviews,
      image: imageUrl,

      description,
      location,

      amenities: amenities
        ? JSON.parse(amenities)
        : [],

      facilities: facilities
        ? JSON.parse(facilities)
        : [],

      roomTypes: roomTypes
        ? JSON.parse(roomTypes)
        : [],

      roomsAvailable,

      createdBy: req.userId,
    });

    await resort.save();

    res.status(201).json({
      success: true,
      message: "Resort created successfully",
      resort,
    });

  } catch (error) {
    console.error(error);

    // Delete file if upload failed
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

/* ================= GET ALL RESORTS ================= */

export const getAllResorts = async (req, res) => {
  try {

    const resorts = await Resort.find()
      .populate("createdBy", "userName email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      resorts,
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

/* ================= GET RESORT BY ID ================= */

export const getResortById = async (req, res) => {
  try {

    const resort = await Resort.findById(req.params.id)
      .populate("createdBy", "userName email");

    if (!resort) {
      return res.status(404).json({
        success: false,
        message: "Resort not found",
      });
    }

    res.status(200).json({
      success: true,
      resort,
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

/* ================= UPDATE RESORT ================= */

export const updateResort = async (req, res) => {
  try {

    const resort = await Resort.findById(req.params.id);

    if (!resort) {
      return res.status(404).json({
        success: false,
        message: "Resort not found",
      });
    }

    /* ---------- CHECK OWNER ---------- */

    if (resort.createdBy.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this resort",
      });
    }

    /* ---------- UPDATE IMAGE IF PROVIDED ---------- */

    if (req.file) {

      const cloudinaryResponse = await cloudinary.uploader.upload(
        req.file.path,
        {
          folder: "wild-life-resorts",
        }
      );

      // Delete local file
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      resort.image = cloudinaryResponse.secure_url;
    }

    if (req.body.image) {
      resort.image = req.body.image;
    }

    /* ---------- UPDATE OTHER FIELDS ---------- */

    resort.name = req.body.name || resort.name;
    resort.type = req.body.type || resort.type;
    resort.price = req.body.price || resort.price;
    resort.rating = req.body.rating || resort.rating;
    resort.reviews = req.body.reviews || resort.reviews;
    resort.description =
      req.body.description || resort.description;
    resort.location =
      req.body.location || resort.location;

    resort.roomsAvailable =
      req.body.roomsAvailable || resort.roomsAvailable;

    resort.amenities = req.body.amenities
      ? JSON.parse(req.body.amenities)
      : resort.amenities;

    resort.facilities = req.body.facilities
      ? JSON.parse(req.body.facilities)
      : resort.facilities;

    resort.roomTypes = req.body.roomTypes
      ? JSON.parse(req.body.roomTypes)
      : resort.roomTypes;

    await resort.save();

    res.status(200).json({
      success: true,
      message: "Resort updated successfully",
      resort,
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

/* ================= DELETE RESORT ================= */

export const deleteResort = async (req, res) => {
  try {

    const resort = await Resort.findById(req.params.id);

    if (!resort) {
      return res.status(404).json({
        success: false,
        message: "Resort not found",
      });
    }

    /* ---------- CHECK OWNER ---------- */

    if (resort.createdBy.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this resort",
      });
    }

    await Resort.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Resort deleted successfully",
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
