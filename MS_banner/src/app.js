const express = require('express');
const bodyParser = require('body-parser');
const url = require('./config/database.config.js');
const mongoose = require('mongoose');
//const client = require('./config/eureka')
const compression = require('compression');
var cors = require ('cors');

/*  Connecting to Eureka  */
/* client.start(function(error){
  console.log('start')
  console.log(error || 'complete');
}); */
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
// Connecting to the database
mongoose.connect(url, { useNewUrlParser: true,  useFindAndModify: false, useUnifiedTopology: true })

.then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())
app.use(cors());

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Market application."});
});
app.use(compression())
require('./routes/routes.banner')(app);
require('./routes/routes.ad')(app);
// listen for requests
app.listen(4006, () => {
    console.log("Server is listening on port 4006");
    //4006
});