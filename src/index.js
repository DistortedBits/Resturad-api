//Setting up the requierd scripts etc.
const express = require('express');
const bodyParser = require('body-parser');
var https = require('https');
var fs = require('fs');

const authRoutes = require('./routes/auth.rts.js');
const restRoutes = require('./routes/restaurant.rts.js');
const userRoutes = require('./routes/users.rts.js');


const app = express();


//Use Json, not very hard
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


//list of all tables and their routs
//app.use('/api/resturants', ResRouts); //Resturants


app.get('/', (req, res) =>{

    res.json({ message: 'You are trying to access the API, but have not specified a path!'});

});


//specified root paths ex: users
app.use('/api/users',       userRoutes);
app.use("/api/auth",        authRoutes);
app.use("/api/restaurants", restRoutes);


// PORT
const port = process.env.PORT || 2053;
app.listen(3000, () => console.log(`(http) listening on port 3000`));
/*
var sslOptions = {
	key: fs.readFileSync('/home/distortedbits/ssl.key'),
    cert: fs.readFileSync('/home/distortedbits/ssl.cert')
  };

https.createServer(sslOptions, app).listen(port, () => console.log(`(https) listening on port ${port}`));*/ 