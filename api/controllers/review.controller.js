import error from "../utils/error.js";
import Review from "../models/review.model.js";
import Gig from "../models/gig.model.js";

export const createReview = async (req, res, next) => {
  // 1) If the user is a seller, stop the review creation
  if (req.isSeller) return next(error(403, "Sellers cannot write a review!!!"));

  try {
    // 2) Check if the user has already reviewed this gig
    const oldReview = await Review.findOne({
      user: req.userId,
      gigId: req.body.gigId,
    });

    // 3) If a review already exists, stop the creation
    if (oldReview) return next(error(403, "There is already a review!!!"));

    // 4) Create a new review
    const newReview = new Review({
      user: req.userId,
      gigId: req.body.gigId,
      desc: req.body.desc,
      star: req.body.star,
    });

    // 5) Save the review to the database
    await newReview.save();

    // 6) Update the gig with the new review and star rating
    await Gig.findByIdAndUpdate(req.body.gigId, {
      $inc: {
        startCount: req.body.star,
        reviewCount: 1,
      },
    });

    // Send a response
    res
      .status(201)
      .json({ message: "Review created successfully", data: newReview });
  } catch (err) {
    console.error(err);
    return next(error(500, "An error occurred while creating the review"));
  }
};

export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({
      gigId: req.params.gigId,
    }).populate({
      path: "user",
      select: "username country photo",
    });

    res.status(200).json({ message: "Review successfully get", reviews });
  } catch (err) {
    next(error(500, err.message));
  }
};

export const deleteReviews = async (req, res, next) => {
  try {
    // 1) Get Review infos
    const review = await Review.findById(req.params.id);

    // 2) If the user is not owner of the review stop user
    if (req.userId != review.user)
      return next(error(403, "User is not owner of the review"));

    // 3) Delete the review
    await Review.deleteOne({ _id: req.params.id });

    // 4) Update the gig with the deleted reviews and star rating
    await Gig.findByIdAndUpdate(review.gigId, {
      $inc: {
        startCount: -review.star,
        reviewCount: -1,
      },
    });
    res.status(200).json({ message: "Review successfully deleted" });
  } catch (err) {
    next(error(500, err.message));
  }
};
