const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req,res) => {
    res.send('sup for good');
});

app.listen(PORT, () => console.log('running on', PORT));