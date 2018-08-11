const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const categoriesRoutes = require('./routes/categories.js');

const app = express();

mongoose.connect('mongodb+srv://karpinski94:57bxSoI0GE4FI5E0@cluster0-vz0or.mongodb.net/test?retryWrites=true')
.then(() => {
  console.log('Connected to the database.');
})
.catch(() => {
  console.log('Connection to the database failed.')
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use('/api/categories/', categoriesRoutes);

module.exports = app;
