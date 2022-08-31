const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }))

// APP routers 
const authRoutes = require('./routes/authRoutes');

app.set('view engine', 'ejs');

app.get('/', (req,res) => {
    res.send('sup for good');
});

app.use(authRoutes);

app.listen(PORT, () => console.log('running on', PORT));