const express = require('express')
const router = express.Router({mergeParams : true}) //we are doing this as our prefix for Router conatins an :id, by default params cannot be accessed
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')
const {reviewSchema}= require('../schemas')

const Review = require('../models/review')
const Campground = require('../models/campground')  //importing models from campground.js
//================================================================================================================
const {validateReview, isLoggedIn, isReviewAuthor} = require('../middleware')
const {addReview, deleteReview} = require('../controllers/reviews')

//===============================================================================================================
router.post('/', isLoggedIn, validateReview, catchAsync(addReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor,  catchAsync(deleteReview))
//======================================================================================================================
module.exports = router