const mongoose = require('mongoose')
const Review = require('./review')
const Schema = mongoose.Schema    //we are just reducing our effort of writing ('mongoose.Schema')

const ImageSchema = new Schema({
    url: String,
    filename: String
})
ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('upload/', 'upload/w_200,h_200/');
})

const CampgroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    description: String,
    location: String,
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'  //model name from mongoose side
    }],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})
CampgroundSchema.post('findOneAndDelete', async function (data) {
    console.log('Deleted')
    if (data) {
        await Review.deleteMany({ _id: { $in: data.reviews } })
    }

})
const Campground = mongoose.model('Campground', CampgroundSchema)
module.exports = Campground