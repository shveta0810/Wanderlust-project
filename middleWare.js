const Listing = require("./models/listing");
const Review = require("./models/reviews.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema,reviewSchema} = require("./schema.js");

module.exports.isLoggedIn= (req, res,next)=>{
     if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
    req.flash("error", "you must be logged in to create a new listings");
    return res.redirect("/login") ;
  }   
  next();
}
module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl ;
    }
    next();
}
module.exports.isOwner= async(req, res, next)=> {
      let { id } = req.params;
  let listing= await Listing.findById(id);
  if(!listing.owner._id.equals(req.user._id)){
 req.flash("error", "You Are not the Owner of this property ");
   return res.redirect(`/listings/${id}`);
  }
 next();
    }
    module.exports.validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map(el => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
}
module.exports. validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map(el => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
}
//author
// author middleware - FIXED VERSION
module.exports.isAuthor = async(req, res, next) => {
  let { reviewId } = req.params;
  
  // Add error handling if reviewId is not provided
  if (!reviewId) {
    req.flash("error", "Review ID is required");
    return res.redirect("back");
  }
  
  let review = await Review.findById(reviewId);
  
  // Check if review exists
  if (!review) {
    req.flash("error", "Review not found");
    return res.redirect("back");
  }
  
  // Check if user is the author
  // Make sure we're comparing ObjectIds properly
  if (!review.author._id.equals(req.user._id)) {
    req.flash("error", "You are not the author of this review");
    return res.redirect(`/listings/${req.params.id || 'back'}`);
  }
  next();
} 
