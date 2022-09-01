const express = require('express');
const app = express();

// General config
const { SESSION_OPTS } = require('./config');

const bodyParser = require('body-parser');
const session = require('express-session');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(session(SESSION_OPTS))

// APP routers 
const authRoutes = require('./routes/authRoutes');
const homeRoutes = require('./routes/homeRoutes');
const eventRoutes = require('./routes/eventRoutes');

// APP middleware
const authMiddleware = require('./middleware/auth');


app.set('view engine', 'ejs');

app.use((req,res,next) => {
    console.log(req.method, req.url, req.session);
    next()
});

// I will put a landing page on this route

// app.get('/', authMiddleware, (req,res) => {
//     console.log(req.session.user);
//     const {user} = req.session;
//     res.render('home', {user});
// });

app.use(authRoutes);
app.use(homeRoutes);
app.use('/event', eventRoutes);

app.listen(PORT, () => console.log('running on', PORT));