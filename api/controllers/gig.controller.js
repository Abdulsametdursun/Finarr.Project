import Gig from "../models/gig.model.js";
import cloudinary from "../utils/cloudinary.js";
import error from "../utils/error.js";

// Method for filtering settings
const buildFilters = (query) => {
  // filtering
  const filters = {};

  if (query.userId) {
    filters.user = query.userId;
  }

  if (query.category) {
    filters.category = query.category;
  }

  if (query.min || query.max) {
    filters.price = {};
    if (query.min) {
      filters.price.$gte = query.min;
    }
    if (query.max) {
      filters.price.$lte = query.max;
    }
  }

  if (query.search) {
    filters.title = { $regex: query.search, $options: "i" };
  }

  // returning settings
  return filters;
};

export const getAllGigs = async (req, res, next) => {
  const filters = buildFilters(req.query);

  try {
    const gigs = await Gig.find(filters).populate({
      path: "user",
      select: "username photo",
    });

    if (gigs.length === 0) {
      return next(error(404, "Could not find any services for search!!!"));
    }
    res.status(200).json({
      message: "Getting all services are success",
      results: gigs.length,
      gigs,
    });
  } catch (err) {
    next(error(404, err.message));
  }
};

export const createGig = async (req, res, next) => {
  // 1) If the user's account making the request is not a seller, send an error
  if (!req.isSeller)
    return next(error(423, "Only 'seller' accounts can create a service"));

  // Variable to hold the URL of the cover photo
  let cover;

  // Upload the cover photo
  await cloudinary.uploader.upload(req.files.cover[0].path, (err, result) => {
    if (err) return next(error(500, "An error occurred"));

    cover = result.secure_url;
  });

  // Prepare requests to upload all photos received in the backend to the cloud
  let imagesToUpload = req.files.images.map((file) =>
    cloudinary.uploader.upload(file.path, (err, result) => {
      if (err) return next(error(500, "An error occurred"));

      return result;
    })
  );

  // Trigger all upload requests
  const uploads = await Promise.all(imagesToUpload);

  // Array of just the URLs of the uploaded files
  const images = uploads.map((i) => i.secure_url);

  try {
    // Add the images to the body
    req.body.images = images;
    req.body.cover = cover;

    // Convert the features to an array
    req.body.features = req.body.features.split(",");

    // 2) Create/save the new service
    const savedGig = await Gig.create({ ...req.body, user: req.userId });

    // 3) Send a successful response to the client
    res
      .status(201)
      .json({ message: "Service created successfully", gig: savedGig });
  } catch (err) {
    next(error(400, err.message));
  }
};

export const getGig = async (req, res, next) => {
  try {
    // get the service from id that was saved in the URL
    const gig = await Gig.findById(req.params.id).populate("user");
    res.status(200).json({ message: "Getting a service is success", gig });
  } catch (err) {
    next(error(500, "There is no service as you search", err.message));
  }
};

export const deleteGig = async (req, res, next) => {
  try {
    //get service details
    const gig = await Gig.findById(req.params.id);

    //check if service created by same user
    if (gig.user != req.userId) {
      return next(error(423, "Only service owner can delete it"));
    }
    // delete service
    await Gig.findByIdAndDelete(req.params.id);

    // sent answer to client
    res.status(200).json({ message: "Deleting a service is success" });
  } catch (err) {
    next(error(500, "There is an error deleting a service", err.message));
  }
};
