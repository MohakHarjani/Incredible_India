const {campgroundSchema}= require('./schemas')
const {reviewSchema} = require('./schemas')
const Campground = require('./models/campground')
const Review = require('./models/review')
const ExpressError = require('./utils/ExpressError')

const validateCampground = (req, res, next)=>{
    const {error} = campgroundSchema.validate(req.body)   //middleware functions have access to req object
    if (error){
        const msg = error.details.map((x)=>{return x.message}).join(',') //error.details gives an array of error objects, ".join returns array as string"
        throw new ExpressError(msg, 404)                       //each error object inside array has messgae as property
    }   
    else{
        next()   //calling the next middleware
    }   
}
const validateReview = (req, res, next)=>{
    const {error} = reviewSchema.validate(req.body)   //middleware functions have access to req object
    if (error){
        const msg = error.details.map((x)=>{return x.message}).join(',') //error.details gives an array of error objects, ".join returns array as string"
        throw new ExpressError(msg, 404)                       //each error object inside array has messgae as property
    }   
    else{
        next()   //calling the next middleware
    }

}

const isLoggedIn = (req, res, next)=>{
    if (!req.isAuthenticated())
    {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in');
        return res.redirect('/login');
    }
    next();
}
const isAuthor = async (req, res, next)=>{
    const {id} = req.params;
    const foundUser = await Campground.findById(id);
    if (!foundUser.author._id.equals(req.user._id))
    {
        req.flash('error', `You don't have permission to do that !`)
        return res.redirect(`/campgrounds/${id}`);
    }
    next()
}
const isReviewAuthor = async (req, res, next)=>{
    const {id, reviewId} = req.params;
    const foundReview = await Review.findById(reviewId).populate('author');
    if (!req.user._id.equals(foundReview.author._id))
    {
        req.flash('error', `You don't have permission to do that !`)
        return res.redirect(`/campgrounds/${id}`)
    }
    next()
}

module.exports = {isLoggedIn, isAuthor, validateCampground, validateReview, isReviewAuthor}