const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
// const multer = require('multer');

app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));

const clucksRouter = require('./routes/clucks');
app.use('/clucks', clucksRouter);

app.get('/', (req, res) => {
  res.render('index');
});

const DOMAIN = 'localhost';
const PORT = '3222';
app.listen(PORT, DOMAIN, () => {
  console.log(`🖥 Server listening on http://${DOMAIN}:${PORT}`);
});
