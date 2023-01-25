let http = require('http');
let fs = require('fs');
let https = require('https');
// let p5 = require('p5');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');


const five = require("johnny-five");
const board = new five.Board();

var app = express();

app.use(cors({origin: '*'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname));

// https.createServer({
//     key: fs.readFileSync('./../testing/key.pem'),
//     cert: fs.readFileSync('./../testing/cert.pem'),
//     passphrase: 'testing'
// }, app)
// .listen(7000);

var server = app.listen(7000, '0.0.0.0', () => {
    console.log('Hello world', server.address().port);
   });