// Session
const {PrismaSessionStore} = require('@quixo3/prisma-session-store');
const db = require('./prisma/db');
const ONE_DAY_IN_MS = 60 * 60 * 1000 * 24;

const SESSION_OPTS = {
    cookie: {
        httpOnly: true,
        maxAge: ONE_DAY_IN_MS,
        sameSite: 'strict',
        secure: false
    },
    name: 'sid',
    resave: false,
    rolling: true,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    store: new PrismaSessionStore(
        db,
        {
            checkPeriod: 2 * 60 * 1000,  
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }
    )
}

module.exports = {SESSION_OPTS}