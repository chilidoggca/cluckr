const path = require('path');
const express = require('express');
const router = express.Router();
const knex = require('../db');
const multer = require('multer');

const UPLOADS_DIR = 'uploads';
const upload = multer({dest: path.join(__dirname, '..', 'public', UPLOADS_DIR)});

// PATH: /posts/new VERB: GET Serves form for creating posts
router.get('/new', (req, res) => {
  res.render('posts/new');
});

// PATH: /posts/idName VERB: Get Display post with idName
router.get('/:id', (req, res) => {
  const id = req.params.id;
  knex
    .first()
    .from('posts')
    .where({id})
    .then(post => {
      res.render('posts/show', {post});
    })
    .catch(err => res.send(err));
});

// PATH: /posts VERB: POST Creating new posts
router.post('/', upload.single('picture'), (req, res) => {
  const username = req.body.username;
  const content = req.body.content;
  // console.log('file', req.file);

  // this if checks that each value exists. If any of the is undefined or something that
  // is not truthy, it will go to the else block.
  if (username && content && req.file) {
    const filename = req.file.filename;
    const picture_path = path.join(UPLOADS_DIR, filename);

    knex
      .insert({username: username, content: content, picture_path: picture_path})
      .into('posts')
      .returning('id')
      .then(result => res.redirect(`/posts/${result}`))
      .catch(err => res.send(err));
  } else {
    res.locals.flash = ['Username, content and pictures are required!'];
    res.render('posts/new');
  }

});

// PATH: /posts VERB: GET List all the posts
router.get('/', (req, res) => {
  knex
    .select()
    .from('posts')
    .orderBy('created_at', 'DESC')
    .then(posts => {
      res.render('posts/index', {posts: posts});
    });
});

module.exports = router;
