'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const expect = require('chai').expect;
const cors = require('cors');
require('dotenv').config();

const apiRoutes = require('./routes/api.js');
const fccTestingRoutes = require('./routes/fcctesting.js');
const runner = require('./test-runner');
const ConvertHandler = require('./controllers/convertHandler.js');

let app = express();

app.use('/public', express.static(process.cwd() + '/public'));

app.use(cors({ origin: '*' })); //For FCC testing purposes only

//for getting values from form using req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//Index page (static HTML)
app.route('/')
  .get(function(req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

//For FCC testing purposes
fccTestingRoutes(app);

//Routing for API 
apiRoutes(app);

app.get('/api/convert', (req, res) => {
  let convertHandler = new ConvertHandler();
  const valueToConvert = req.query.input;
  try {
    const initNum = convertHandler.getNum(valueToConvert);
    const initUnit = convertHandler.getUnit(valueToConvert);
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const returnString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
    return res.json({ initNum: Number(initNum), initUnit, returnNum: Number(returnNum), returnUnit, string: returnString })
  } catch (err) {
    const errorDescription = err.message || 'Unknown error';
    if (errorDescription === 'invalid number') {
      try {
        convertHandler.getUnit(valueToConvert)
      } catch (err) {
        if (err.message === 'invalid unit') {
          return res.json('invalid number and unit')
        }
      }
      return res.json('invalid number')
    }
    if (errorDescription === 'invalid unit') {
      return res.json('invalid unit')
    }

    return res.json({ error: errorDescription });

  }
})

//404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

const port = process.env.PORT || 3000;

//Start our server and tests!
app.listen(port, function() {
  console.log("Listening on port " + port);
  if (process.env.NODE_ENV === 'test') {
    console.log('Running Tests...');
    setTimeout(function() {
      try {
        runner.run();
      } catch (e) {
        console.log('Tests are not valid:');
        console.error(e);
      }
    }, 1500);
  }
});

module.exports = app; //for testing
