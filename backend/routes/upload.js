import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const router = express.Router();

/* ---------------- CLOUDINARY CONFIG ---------------- */

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_APIKEY,
  api_secret: process.env.CLOUD_SECRETKEY,
});

/* ---------------- MULTER STORAGE ---------------- */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "./uploads";

    // Create uploads folder if not exists
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    cb(null, dir);
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
      folder: "wild-life",
    });

    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(200).json({
      success: true,
      url: cloudinaryResponse.secure_url,
    });
  } catch (error) {
    console.log(error);

    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({
      success: false,
      message: "Error uploading image",
      error: error.message,
    });
  }
});

/* ---------------- ADD RESORT ---------------- */

router.post(
  "/resort",
  upload.single("image"),
  async (req, res) => {
    try {

      console.log(req.body);
      console.log(req.file);

      // Check image
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No image uploaded",
        });
      }

      /* ---------- UPLOAD IMAGE TO CLOUDINARY ---------- */

      const cloudinaryResponse = await cloudinary.uploader.upload(
        req.file.path,
        {
          folder: "wild-life-resorts",
        }
      );

      console.log(cloudinaryResponse);

      /* ---------- DELETE LOCAL FILE ---------- */

      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      /* ---------- CREATE RESORT ---------- */

      const resort = {
        name: req.body.name,
        location: req.body.location,
        type: req.body.type,
        price: req.body.price,
        description: req.body.description,

        amenities: req.body.amenities
          ? JSON.parse(req.body.amenities)
          : [],

        // IMPORTANT
        image: cloudinaryResponse.secure_url,
      };

      console.log(resort);

      /* ---------- SAVE TO DATABASE ---------- */

      // Example:
      // const savedResort = await Resort.create(resort);

      /* ---------- RESPONSE ---------- */

      res.status(201).json({
        success: true,
        message: "Resort added successfully",
        resort,
      });

    } catch (error) {
      console.log(error);

      // Delete uploaded file if error
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      res.status(500).json({
        success: false,
        message: "Error adding resort",
        error: error.message,
      });
    }
  }
);

/* ---------------- GET ALL RESORTS ---------------- */

router.get("/resort", async (req, res) => {
  try {

    // Example:
    // const resorts = await Resort.find();

    const resorts = [];

    res.status(200).json({
      success: true,
      resorts,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Error fetching resorts",
      error: error.message,
    });
  }
});

export default router;
