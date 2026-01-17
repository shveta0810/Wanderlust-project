const Joi = require("joi");

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required().trim().min(3).max(100),
    description: Joi.string().required().trim().min(1).max(1000),
   
    price: Joi.number().required().min(0),
    country: Joi.string().required(),
    location: Joi.string().required(),
    image: Joi.object({
      url:Joi.string().uri().required(),
      filename:Joi.string().optional(),
    })
  }).required()
}).options({ stripUnknown: true });

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5).integer(),
    comment: Joi.string().required().min(1).max(500)
  }).required()
}).options({ stripUnknown: true });

