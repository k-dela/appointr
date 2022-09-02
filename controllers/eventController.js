const db = require('../prisma/db');

module.exports.new = (req,res) => {
    res.render('eventNew');
};

module.exports.create = async (req,res) => {
    console.log(req.body);
    let {username, id} = req.session.user;
    let {eventName, location, description, slug} = req.body;

    eventName = eventName.trim();

    if(eventName === ''){
        return res.status(400);
    }

    // Hard coded for now
    const link = `localhost:3000/${username}/${slug}`;

    try{
        const newEvent = await db.event.create({
            data: {
                name: eventName,
                location,
                description,
                link,
                host: Number(id)
            }
        });

        console.log(newEvent);
    }catch(error){
        console.error(error);
    }


}