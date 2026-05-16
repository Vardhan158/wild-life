import mongoose from "mongoose";

const safariSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    highlights: [String],
    included: [String],
    notIncluded: [String],
    bestFor: [String],
    itinerary: [
      {
        day: Number,
        title: String,
        activities: [String],
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Safari = mongoose.model("Safari", safariSchema);
export default Safari;
