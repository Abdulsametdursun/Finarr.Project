import { Schema, model } from "mongoose";

// create user schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter a username"],
      unique: [true, "Please enter a different username"],
    },

    email: {
      type: String,
      required: [true, "Please enter a email address"],
      unique: [true, "Please enter a different email address"],
    },

    password: {
      type: String,
      required: [true, "Please enter a password"],
    },

    photo: {
      type: String,
      default: "https://picsum.photos/200",
    },

    country: {
      type: String,
      required: [true, "Please enter your country"],
    },

    phone: {
      type: Number,
    },

    desc: {
      type: String,
    },

    isSeller: {
      type: Boolean,
      default: false,
    },
  },
  // settings
  // createdAt & updatedAt is added to the data automatically from timestamps
  {
    timestamps: true,
  }
);

export default model("User", userSchema);
