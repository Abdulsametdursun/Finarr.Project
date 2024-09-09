import { Schema, model } from "mongoose";

const gigSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: "User",
      required: [true, "Please enter a user id"],
    },
    title: {
      type: String,
      required: [true, "Please enter a title for the gig"],
    },
    desc: {
      type: String,
      required: [true, "Please enter a description for the gig"],
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    startCount: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: [true, "Please select a category for the gig"],
    },
    cover: {
      type: String,
      required: [true, "Please upload a cover image for the gig"],
    },
    images: {
      type: [String],
    },
    shortTitle: {
      type: String,
      required: [true, "Please enter a short title for the gig"],
      maxlength: 50,
    },
    deliveryTime: {
      type: Number,
      required: [true, "Please enter the delivery time for the gig"],
    },
    revisionNumber: {
      type: Number,
      required: [true, "Please enter the revision number for the gig"],
    },
    features: {
      type: [String],
    },
    sales: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Please enter a price for the gig"],
    },
  },
  { timestamps: true, toJSON: { virtual: true }, toObject: { virtuals: true } }
);

// Calculate the average of rating
gigSchema.virtual("avgRating").get(function () {
  return (this.starCount / this.reviewCount).toFixed(2);
});

export default model("Gig", gigSchema);
