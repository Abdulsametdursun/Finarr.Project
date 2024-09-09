import express from "express";
import {
  getAllGigs,
  getGig,
  createGig,
  deleteGig,
} from "../controllers/gig.controller.js";
import protect from "../middlewares/protect.js";
import upload from "../utils/multer.js";

// 1) create route
const router = express.Router();

// 2) set the route
router.get("/", getAllGigs);
router.get("/:id", getGig);
router.post(
  "/",
  protect,
  upload.fields([
    { name: "cover", maxCount: 1 },
    { name: "images", maxCount: 6 },
  ]),
  createGig
);
router.delete("/:id", protect, deleteGig);

// 3) connect the route to app
export default router;
