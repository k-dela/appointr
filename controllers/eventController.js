const db = require('../prisma/db');

// Data validation 
const Joi = require('joi');
const eventSchema = Joi.object({
    name: Joi.string().min(2).max(40),
    location: Joi.string().valid('virtual', 'in_person'),
    description: Joi.string(),
    slug: Joi.string().min(1).max(100),
    host: Joi.number().integer().positive()
});

module.exports.new = (req,res) => {
    const {username} = req.session.user;
    res.render('eventNew', {username});
};

module.exports.create = async (req,res) => {
    console.log(req.body);
    let {username, id} = req.session.user;
    let {name, location, description, slug} = req.body;

    let host = Number(id);

    const {error, value} = eventSchema.validate({
        name,
        location,
        description,
        slug,
        host
    });

    console.log(error, value);


    try{
        const newEvent = await db.event.create({
            data: {
                name,
                location,
                description,
                link,
                host: Number(id)
            }
        });

        console.log(newEvent);
    }catch(error){
        console.error('this ran', error.message);
    }
}