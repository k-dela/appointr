const auth = (req,res,next) => {
    if(req.session.user){
        return next();
    }

    // Todo: send a flash message
    return res.redirect('/login');
}

module.exports = auth;