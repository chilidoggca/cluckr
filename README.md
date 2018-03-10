# Cluckr
https://cluckr.herokuapp.com

Note: If you are demo-ing the app, the uploaded images are only saved temporarily on the heroku server. They are destroyed when the server restarts.

## Description
Cluckr is a twitter clone with features including image uploads and trending tags. It is a simple CRUD app built on Node/Express.

## Features
- Create Clucks (Posts)
- Image uploading with posts
- Trending hashtags
- Posts and hashtags are saved into PostgreSQL database

![chiliMD Create Cluck](/public/images/screenshot-2.jpg)

## Technologies
Back-end: Node/Express<br>
Front-end: Server side rendering with EJS, Bootstrap, HTML5, CSS<br>
Database: PostgreSQL, Knex<br>
Deployment: Heroku<br>

## Reflection
- This was a simple CRUD app built on Node/Express. I found writing to and reading from two tables through Express back-end the most challenging because it required some understanding of Promise in ES6 JavaScript.
