const User = require('../models/user');


//===============================================================================================

module.exports.registerForm = (req, res)=>{
    res.render('users/register')
}
module.exports.register = async(req, res, next)=>{
    try{
        const {username, password, email} = req.body;
        const newUser = await User.register({username : username, email : email}, password);
        req.login(newUser, (err)=>{
            if (err) return next(err);

            req.flash('success', 'WELCOME TO INDIA !')
            res.redirect('/campgrounds')
        })
    }catch(err){
        req.flash('error', err.message);
        res.redirect('/register')
    }

}
module.exports.loginForm = (req, res)=>{
    res.render('users/login')
}
module.exports.login = (req, res)=>{
    req.flash('success', 'Welcome Back !');
    const redirectUrl = req.session.returnTo || '/campgrounds'
    delete req.session.returnTo
    res.redirect(redirectUrl)
}
module.exports.logout = (req, res)=>{
    req.logout();
    req.flash('success', 'Goodbye !');
    res.redirect('/campgrounds');
}