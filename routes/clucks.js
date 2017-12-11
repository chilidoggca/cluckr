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
  const time_dateTime = new Date();

  if (req.file) {
    const filename = req.file.filename;
    const image_url = `/${path.join(UPLOADS_DIR, filename)}`;
    knex
      .insert({username, content, image_url, time_dateTime})
      .into('clucks')
      .then(result => res.redirect(`/clucks`))
      .catch(err => res.send(err));
  } else {
    image_url = '';
    knex
      .insert({username, content, image_url, time_dateTime})
      .into('clucks')
      .then(result => res.redirect(`/clucks`))
      .catch(err => res.send(err));
  }
});

router.get('/', (req, res) => {
  function timeSince(date) {
    let seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 60) {
      return `Just now`;
    } else {
      let interval = Math.floor(seconds / 31536000);
      if (interval > 1) {
        return interval + " years";
      }
      interval = Math.floor(seconds / 2592000);
      if (interval > 1) {
        return interval + " months";
      }
      interval = Math.floor(seconds / 86400);
      if (interval > 1) {
        return interval + " days";
      }
      interval = Math.floor(seconds / 3600);
      if (interval > 1) {
        return interval + " hours";
      }
      interval = Math.floor(seconds / 60);
      if (interval > 1) {
        return interval + " minutes";
      }
      return Math.floor(seconds) + " seconds";
    }
  }

  knex
    .select()
    .from('clucks')
    .orderBy('created_at', 'DESC')
    .then(clucks => {
      knex
        .select()
        .from('trending_topics')
        .orderBy('count', 'DESC')
        .then(topics => {
          res.render('clucks/index', {topics, clucks, timeSince});
        })
        .catch(err=> res.send(err));
    })
    .catch(err=> res.send(err));
});

module.exports = router;
