const db = require('../prisma/db');

// Data validation 
const Joi = require('joi');
const eventSchema = Joi.object({
    name: Joi.string().min(2).max(40).required(),
    location: Joi.string().valid('virtual', 'in_person').required(),
    description: Joi.string(),
    slug: Joi.string().min(1).max(100).pattern(/^[a-z0-9_-]*$/).lowercase().required(),
    address: Joi.string().when('location', {is: 'in_person', then: Joi.required()}),
    host: Joi.number().integer().positive()
});

module.exports.new = (req,res) => {
    const {username} = req.session.user;
    res.render('eventNew', {username});
};

module.exports.create = async (req,res) => {
    console.log(req.body);
    let {username, id} = req.session.user;
    let {name, location, description, slug, address} = req.body;

    let host = Number(id);

    const {error, value} = eventSchema.validate({
        name,
        location,
        description,
        slug,
        host,
        address
    });

    console.log(error, value);
    if(error){
        console.log(error);
        return;
    }


    try{
        const newEvent = await db.event.create({
            data: {
                name,
                location,
                description,
                slug,
                host: Number(id),
                address
            }
        });

        console.log(newEvent);
    }catch(error){
        console.error('this ran', error.message);
    }
}