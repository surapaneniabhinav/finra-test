
const express = require('express'),
app = express(),
bodyParser = require('body-parser');



app.use(bodyParser.urlencoded({extended: false, parameterLimit: 100000, limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb', extended: true}));

app.use('/', configSetup, express.static(__dirname + '/../../client/dist'));


const phoneRouter = require('./routes/phone.route')();
app.use('/', phoneRouter);


function configSetup(req, res, next) {
    // code to configure requests
    next();
}


const server = app.listen('4200', () => {
    console.log('Server started at http://localhost:',server.address().port);
});