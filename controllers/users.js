const User = require("../models/user.js");
module.exports.renderSignup = (req, res) => {
    res.render("users/signup.ejs")
}
module.exports.signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ username, email });
        const registered = await User.register(newUser, password);
        console.log(registered);
        req.login(registered, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcomt to WanderLust !");
            res.redirect("/listings");
        });
    }
    catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}

module.exports.renderLogin  = (req, res) => {
    res.render("users/login.ejs");
}

module.exports.login =  async (req, res) => {
        req.flash("success", "Welcome back to Wanderlust!");
        let redirect = res.locals.redirectUrl || "/listings";
        res.redirect(redirect)
    }

    module.exports.logout
     =  (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "you are logged out");
        res.redirect("/listings");
    })
}