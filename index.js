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

app.set('view engine', 'ejs');

app.get('/', (req,res) => {
    res.send('sup for good');
});

app.use(authRoutes);

app.listen(PORT, () => console.log('running on', PORT));