const db = require('../prisma/db');

// Data validation 
const Joi = require('joi');
const eventSchema = Joi.object({
    name: Joi.string().min(2).max(40),
    location: Joi.string().valid('virtual', 'in_person'),
    description: Joi.string(),
    link: Joi.string(),
    host: Joi.number().integer().positive()
});

module.exports.new = (req,res) => {
    res.render('eventNew');
};

module.exports.create = async (req,res) => {
    console.log(req.body);
    let {username, id} = req.session.user;
    let {eventName: name, location, description, slug} = req.body;

    // Hard coded for now
    const link = `localhost:3000/${username}/${slug}`;

    let host = Number(id);

    const {error, value} = eventSchema.validate({
        name,
        location,
        description,
        link,
        host
    });

    console.log(error, value);


    // try{
    //     const newEvent = await db.event.create({
    //         data: {
    //             name: eventName,
    //             location,
    //             description,
    //             link,
    //             host: Number(id)
    //         }
    //     });

    //     console.log(newEvent);
    // }catch(error){
    //     console.error(error);
    // }
}