const db = require('../prisma/db');

// Data validation 
const Joi = require('joi');
const eventSchema = Joi.object({
    name: Joi.string().min(2).max(40).required(),
    location: Joi.string().valid('virtual', 'in_person').required(),
    description: Joi.string(),
    slug: Joi.string().min(1).max(100).pattern(/^[a-z0-9_-]*$/).lowercase().required(),
    address: Joi.string().when('location', {is: 'in_person', then: Joi.required()}),
    durationInMinutes: Joi.number().integer().positive(),
    host: Joi.number().integer().positive(),
    startDateRange: Joi.date().required(),
    endDateRange: Joi.date().required()
});

module.exports.new = (req,res) => {
    const {username} = req.session.user;
    const currentDate = new Date().toISOString().slice(0,10);
    res.render('eventNew', {username, currentDate});
};

module.exports.create = async (req,res) => {
    console.log(req.body);
    let {id: host} = req.session.user;
    let {name,
        location, 
        description, 
        slug, 
        address, 
        duration, 
        timeUnit,
        startDateRange,
        endDateRange
    } = req.body;

    console.log(startDateRange, new Date());

    //console.log(typeof id);
    //let host = Number(id);
    let durationInMinutes = duration;

    if(timeUnit === 'hrs'){
        durationInMinutes = durationInMinutes * 60;
    }

    const {error, value: data} = eventSchema.validate({
        name,
        location,
        description,
        slug,
        host,
        address,
        durationInMinutes,
        startDateRange,
        endDateRange
    });

    // console.log(error, value);
    if(error){
        console.log(error);
        return;
    }

    //console.log('the value', value);


    try{
        const newEvent = await db.event.create({
            data
        });

        console.log(newEvent);
    }catch(error){
        console.error('this ran', error.message);
    }
}