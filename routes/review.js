const express =require("express");
const router =express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js");
const { validateReview, isLoggedIn, isAuthor}= require("../middleWare.js");
const reviewsController = require("../controllers/reviews.js");

// Reviews post Route
router.post("/",isLoggedIn, validateReview, wrapAsync(reviewsController.postReview));

// Delete Review Route 
router.delete("/:reviewId",isLoggedIn,isAuthor, wrapAsync(reviewsController.deleteReview));

module.exports=router;