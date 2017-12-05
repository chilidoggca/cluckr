const path = require('path');
const express = require('express');
const router = express.Router();
const knex = require('../db');
const multer = require('multer');

const UPLOADS_DIR = 'uploads';
const upload = multer({dest: path.join(__dirname, '..', 'public', UPLOADS_DIR)});

router.get('/new', (req, res) => {
  res.render('clucks/new');
});

router.post('/', upload.single('picture'), (req, res) => {
  const username = req.body.username || 'anonymous';
  const content = req.body.content || '';

  if (req.file) {
    const filename = req.file.filename;
    const image_url = `/${path.join(UPLOADS_DIR, filename)}`;
    knex
      .insert({username, content, image_url})
      .into('clucks')
      // .returning('id')
      .then(result => res.redirect(`/clucks`))
      .catch(err => res.send(err));
  } else {
    image_url = '';
    knex
      .insert({username, content, image_url})
      .into('clucks')
      // .returning('id')
      .then(result => res.redirect(`/clucks`))
      .catch(err => res.send(err));
  }
});

router.get('/', (req, res) => {
  // res.render('./clucks/index');
  knex
    .select()
    .from('clucks')
    .orderBy('created_at', 'DESC')
    .then(clucks => {
      res.render('clucks/index', {clucks});
    });
});

module.exports = router;
