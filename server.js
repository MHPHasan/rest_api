const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Database Path
mongoose.connect('mongodb://localhost/contacts-db', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true)

// Database Connection Status
const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.once('open', () => console.log('Database Connection Established!'))


const app = express();
app.use(morgan('dev'));
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// if has server port or 4000
const PORT = process.env.PORT || 4000;

// Root server route
app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
});

// Import & Connect Route
const contactRoute = require('./api/routes/contact');
const userRoute = require('./api/routes/users')
app.use('/api/contacts', contactRoute);
app.use('/api/users', userRoute);

// PORT Listener
app.listen(PORT, () => {
    console.log(`Server is Running ON PORT ${ PORT }`);
});