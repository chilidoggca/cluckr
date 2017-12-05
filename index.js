const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const multer = require(‘multer’);
const path = require(‘path’);

app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));

const clucksRouter = require('./routes/clucks');
app.use('/clucks', clucksRouter);




const DOMAIN = 'localhost';
const PORT = '2222';
app.listen(PORT, DOMAIN, () => {
  console.log(`🖥 Server listening on http://${DOMAIN}:${PORT}`);
});
