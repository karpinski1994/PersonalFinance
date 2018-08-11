const express = require('express');
const Category = require('../models/category');
const router = express.Router();



router.post('', (req, res, next) => {
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

router.put("/:id", (req, res, next) => {
  const category = new Category({
    _id: req.body.id,
    title: req.body.title,
    budgetPercent: req.body.budgetPercent,
    outcomesList: req.body.outcomesList
  });

  Category.updateOne({
    _id: req.params.id
  }, category).then(result => {
    console.log(result);
    res.status(200).json({
      message: 'Update successful!',
      category: category
    });
  });
});

router.get('/:id', (req, res, next) => {
  Category.findById(req.params.id).then(category => {
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({
        message: 'Category not found.'
      });
    }
  });
});

router.get('', (req, res, next) => {
  Category.find()
    .then(documents => {
      res.status(200).json({
        message: 'Categories fetched successfully.',
        categories: documents
      });
    });
});

router.delete('/:id', (req, res, next) => {
  Category.deleteOne({
      _id: req.params.id
    })
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: 'Category deleted!'
      });
    });
});

module.exports = router;
