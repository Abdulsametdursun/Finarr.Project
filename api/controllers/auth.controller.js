import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import error from "../utils/error.js";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloudinary.js";

// Utility function to remove the password from the user object
const hidePassword = (user) => {
  const userWithoutPass = user.toJSON(); // Convert to plain object
  delete userWithoutPass.password; // Remove the password
  return userWithoutPass;
};

// create a new user - sign in
export const register = async (req, res, next) => {
  try {
    // hash and salt the password
    const hashedPass = bcrypt.hashSync(req.body.password, 12);

    // global configuration
    let photo;

    // Upload the photo to cloudinary
    await cloudinary.uploader.upload(req.file.path, (err, result) => {
      // If there was an error
      if (err) {
        console.log("🚩 There was an error uploading 🚩");
        return console.log(err);
      }
      photo = result.secure_url;
    });

    // Save the photo URL in the user object
    req.body.photo = photo;

    // create a new user and save
    const newUser = await User.create({ ...req.body, password: hashedPass });

    // Remove password from user object
    const userWithoutPass = hidePassword(newUser);

    // send the message to client
    res.status(200).json({
      message: "👽 Request is successful 😁",
      user: userWithoutPass,
    });
  } catch (err) {
    console.log(err);
    // Pass the error to the client
    next(error(401, "🚩There was an error while creating the account🚩"));
  }
};

// The user - sign in
export const login = async (req, res, next) => {
  try {
    // 1) find the user by name
    const user = await User.findOne({ username: req.body.username });

    // 2) if there is no user sent error
    if (!user)
      return next(
        error(
          404,
          "The name or password you entered isn't connected to an account."
        )
      );

    // 3) if there is user already check the password is correct
    const isCorrect = bcrypt.compareSync(req.body.password, user.password);

    // 4) if password is not correct, sent error
    if (!isCorrect)
      return next(
        error(
          404,
          "The name or password you entered isn't connected to an account."
        )
      );

    // 5) if password is correct, create a jwt token
    const token = jwt.sign(
      { id: user._id, isSeller: user.isSeller },
      process.env.JWT_KEY,
      {
        expiresIn: "7days",
      }
    );

    // Remove password from user object
    const userWithoutPass = hidePassword(user);

    // 6) send the token to client
    res.cookie("token", token).status(200).json({
      message: "👽 Sign-in is successful 😁",
      user: userWithoutPass,
      token,
    });
  } catch (err) {
    next(error(400, "🚩There was an error while signing in🚩"));
  }
};

// The user - logout
export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({
    message: "👽 Logout is successful 😁",
  });
};
