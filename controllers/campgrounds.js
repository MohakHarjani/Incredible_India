const Campground = require('../models/campground')
const { cloudinary } = require('../cloudinary/index')

//======================================================================================
const renderAllCamps = async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', { campgrounds: campgrounds })
}
const addCampForm = (req, res) => {
    res.render('campgrounds/new')
}

const addCamp = async (req, res, next) => {
    const files = req.files;  //files is an array
    const images = files.map((file) => {         //images will be an array of objects
        return { url: file.path, filename: file.filename }

    })
    const camp = new Campground(req.body.campground)    //req.body contains campground as a property, which has an object containing 
    //form data..so req.body.campground is an object containing form data
    camp.images = images;
    camp.author = req.user._id; //req.user is added to req object by passport
    await camp.save()
    console.log(camp)
    req.flash('success', 'Successfully added a tourist spot')
    res.redirect(`campgrounds/${camp._id}`)
}

const showCamp = async (req, res) => {
    const { id } = req.params
    const foundCampground = await Campground.findById(id).populate({ path: 'reviews', populate: { path: 'author' } }).populate('author')
    if (!foundCampground) {
        req.flash('error', 'Spot not found')
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/show', { campground: foundCampground })
}
const editCampForm = async (req, res) => {
    const { id } = req.params

    const foundCampground = await Campground.findById(id)
    if (!foundCampground) {
        req.flash('error', 'Spot not found')
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/edit', { campground: foundCampground })
}
const editCamp = async (req, res) => {
    const { id } = req.params
    console.log(req.body);
    const camp = req.body.campground
    const updatedCampground = await Campground.findByIdAndUpdate(id, camp)
    //===================================================================================

    const files = req.files;  //files is an array
    const images = files.map((file) => {         //images will be an array of objects
        return { url: file.path, filename: file.filename }
    })
    updatedCampground.images.push(...images);
    //=======================================================================================
    const toDeleteImages = req.body.deleteImages;
    if (toDeleteImages && toDeleteImages.length >= 1) {
        for (let filename of toDeleteImages) {
            await cloudinary.uploader.destroy(filename)
        }
        await updatedCampground.updateOne({ $pull: { images: { filename: { $in: toDeleteImages } } } })
    }
    //=======================================================================================
    updatedCampground.save();
    console.log(updatedCampground)

    req.flash('success', 'Successfully Updated Spot')
    res.redirect(`/campgrounds/${id}`)
}
const deleteCamp = async (req, res) => {
    const { id } = req.params
    await Campground.findByIdAndDelete(id)
    req.flash('success', 'Successfully deleted Spot')
    res.redirect('/campgrounds')
}
//============================================================================================================================
module.exports = { renderAllCamps, addCampForm, addCamp, showCamp, editCampForm, editCamp, deleteCamp }