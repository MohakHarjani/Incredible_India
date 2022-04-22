const Campground = require('../models/campground')
const Review = require('../models/review')

//============================================================================================================
module.exports.addReview = async(req, res)=>{
    const {id} = req.params
    const foundCampground = await Campground.findById(id)

    const newReview = new Review(req.body.review)  //we are grouping everything inside review property in review
    newReview.author = req.user._id;
    foundCampground.reviews.push(newReview)

    await newReview.save() //saving in reviews model
    await foundCampground.save()  //saving in campground model
    req.flash('success', 'Created new review')
    res.redirect(`/campgrounds/${id}`)

}
module.exports.deleteReview = async(req, res)=>{  //we can delte review by 'reviewID' but we need to remove reference of review from "campgroundId"
    const {reviewId, id} = req.params   //id is campId, ew need to use only ":id" for router
    await  Campground.findByIdAndUpdate(id, {$pull : {reviews : reviewId}})  //removing reference of review
    await Review.findByIdAndDelete(reviewId)    //removing the review itself
    req.flash('success', 'Successfully deleted review')
    res.redirect(`/campgrounds/${id}`)

}
