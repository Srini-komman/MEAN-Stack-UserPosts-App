const express = require('express');
const bodyParser =  require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');
const app = express();

mongoose.connect("mongodb+srv://UID:PWD@cluster0-gpbcc.mongodb.net/user-post-test?retryWrites=true", {useNewUrlParser: true})
  .then(() => {
    console.log('Connected to MongoDB Database!');
  })
  .catch((error) => {
    console.log('Connection to MongoDB is failed!');
  });

app.use(bodyParser.json());


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);

module.exports = app;
