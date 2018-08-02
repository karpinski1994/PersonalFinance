const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use('/api/categories', (req, res, next) => {
  const categories = [
    {
    _id: 'bla',
    title: 'Something',
    budgetPercent: 20,
    outcomesList: []
    },
    {
      _id: 'blasda',
      title: 'Another',
      budgetPercent: 20,
      outcomesList: []
    }
  ];
  res.status(200).json({
    message: 'categories fetched succesfully',
    categories: categories
  });
});

module.exports = app;
