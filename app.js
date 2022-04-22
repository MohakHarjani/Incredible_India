if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv');
    dotenv.config();
}
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')   //alternative for partial using a package => 'ejs-mate'

const joi = require('joi')
const ExpressError = require('./utils/ExpressError')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
const { findById, findByIdAndUpdate } = require('./models/campground')

const campgroundRoutes = require('./routes/campgrounds')
const reviewRoutes = require('./routes/reviews')
const userRoutes = require('./routes/users')

const passport = require('passport');
const LocalStrategy = require('passport-local')
const User = require('./models/user')

//mongodb://localhost:27017/yelp-camp
//mongodb+srv://mohak:mohakdb@cluster0.nmaww.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//process.env.DB_URL
mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => {
        console.log('CONNECTED WITH MONGO:)')
    })
    .catch((err) => {
        console.log('CONNECTION FAILED :(')
        console.log(err)

    })
const app = express()
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))


const sessionConfig = {
    secret: 'notasecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + (7 * 24 * 60 * 60 * 1000),       //Date.now() gives date in "ms"...we need to keep cookie in browser for 1 week
        //we need to add 1 week [in ms] to the current date
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true

    }

}
app.use(session(sessionConfig))
app.use(flash())

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()

})

//=====================================================================================================================================
app.use('/', userRoutes)


//================================================================================================================================================
app.use('/campgrounds', campgroundRoutes)
app.get('/', (req, res) => {
    res.render('home')
})
//============================REVIEW ROUTES======================================================================
app.use('/campgrounds/:id/reviews', reviewRoutes)  //

//===================================================================================================================
app.all('*', (req, res, next) => {   //all for any kind of (post, get..) and '*' for all kind if routes
    next(new ExpressError('Page not found!', 409))
})
//=========================================================================================================================
app.use((err, req, res, next) => {
    const { status = 500 } = err
    res.status(status)
    if (!err.message) err.message = 'Something went wrong !'
    res.render('error', { err: err })

})

//===========================================================================================================================================
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server Started')
})