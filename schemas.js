const Joi = require('Joi')
const campgroundSchema = Joi.object({   //[Joi.object]means type and [.required() is validation]
    campground : Joi.object({
        title : Joi.string().required(),
        
        // image : Joi.string().required(),
        location : Joi.string().required(),
        description : Joi.string().required()
    }).required()  ,
    deleteImages : Joi.array() 
})
const reviewSchema = Joi.object({
    review : Joi.object({
        rating : Joi.number().required().min(1).max(5),
        body : Joi.string().required()

    }).required()
})
module.exports = {campgroundSchema, reviewSchema}   //Schema are note same as mongoose schema, it can be named anything
// module.exports = reviewSchema
