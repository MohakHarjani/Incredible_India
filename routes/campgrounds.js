const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')
const { storage } = require('../cloudinary/index')
const multer = require('multer')
const upload = multer({ storage })

const { campgroundSchema } = require('../schemas')
const Campground = require('../models/campground')  //importing models from campground.js
const { renderAllCamps, addCampForm, addCamp, showCamp, editCampForm, editCamp, deleteCamp } = require('../controllers/campgrounds')


const { isLoggedIn, validateCampground, isAuthor } = require('../middleware')
//===============================================================================================================================
router.route('/')
    .get(catchAsync(renderAllCamps))
    .post(isLoggedIn, upload.array('image'),  validateCampground  , catchAsync (addCamp))  //we need to first upload image then validateCamp
    // .post(upload.array('image'), (req, res) => { console.log(req.body, req.files); res.send('ok') })

router.get('/new', isLoggedIn, addCampForm)

router.route('/:id')
    .get(catchAsync(showCamp))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(editCamp))
    .delete(isLoggedIn, isAuthor, catchAsync(deleteCamp))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(editCampForm))

//=====================================================================================================================================
module.exports = router