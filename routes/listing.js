const express =require("express");
const router =express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing}= require("../middleWare.js");
const listingController =require("../controllers/listings.js");
const multer = require("multer");
const {storage}= require("../cloudConfig.js");
const upload = multer({storage});

router.route("/").get( wrapAsync(listingController.index))
.post(isLoggedIn, 
    upload.single("listing[image]"),
    validateListing,
   wrapAsync(listingController.creatListing));


   // New Route
router.get("/new", isLoggedIn, listingController.newForm);

   router.route("/:id").get(wrapAsync(listingController.showListing))
   .put(isLoggedIn,isOwner, upload.single("listing[image]"),validateListing, wrapAsync(listingController.updateListing))
   .delete(isLoggedIn,isOwner,  wrapAsync(listingController.deleteListing));



// Edit route
router.get("/:id/edit", isLoggedIn,isOwner, wrapAsync(listingController.editListing));

module.exports = router;
