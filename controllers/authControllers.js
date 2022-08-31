const db = require('../prisma/db');
const {isEmail} = require('validator');
const bcrypt =  require('bcryptjs');

module.exports.indexSignup = (req,res) => {
    res.render('signup')
}

module.exports.createUser = async (req,res) => {
    let {email, password} = req.body;

    const validEmail = isEmail(email);
    if(!validEmail) return res.status(400).json({message: 'Please provide a valid email'});

    const validPassword = password.length >= 8 && password.length <= 64;
    if(!validPassword) return res.status(400).json({message: 'Please provide a valid password'});

    try{
        const existingUser = await db.user.findUnique({
            where:{
                email
            }
        });

        if(existingUser) return res.status(409).json({message: 'Email is already registered'});

        password = await bcrypt.hash(password, 12);

        const newUser = await db.user.create({
            data: {
                email,
                password
            }
        });

        console.log(newUser);
        return res.redirect('/login');


    }catch(error){
        console.error(error);
    }
}

module.exports.indexLogin = (req,res) => {
    res.render('login');
}