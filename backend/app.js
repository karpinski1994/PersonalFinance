const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Category = require('./models/category');

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

app.post('/api/categories', (req, res, next) => {
  const category = new Category({
    title: req.body.title,
    budgetPercent: req.body.budgetPercent,
    outcomesList: req.body.outcomesList
  });
  category.save().then(createdCategory => {
    res.status(201).json({
      message: 'Category added successfully.',
      categoryId: createdCategory._id
    });
  });
});

app.put("/api/categories/:id", (req, res, next) => {
  const category = new Category({
    _id: req.body.id,
    title: req.body.title,
    budgetPercent: req.body.budgetPercent,
    outcomesList: req.body.outcomesList
  });

  Category.updateOne({ _id: req.params.id}, category).then(result => {
    console.log(result);
    res.status(200).json({message: 'Update successful!'});
  });
});

app.get('/api/categories', (req, res, next) => {
  Category.find()
  .then(documents => {
     res.status(200).json({
       message: 'Categories fetched successfully.',
       categories: documents
     });
  });
});

app.delete('/api/categories/:id', (req, res, next) => {
  Category.deleteOne({ _id: req.params.id })
  .then(result => {
    console.log(result);
    res.status(200).json({message: 'Category deleted!'});
  });
});

module.exports = app;
