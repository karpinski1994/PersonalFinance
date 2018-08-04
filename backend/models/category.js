const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  title: {type: String, required: true},
  budgetPercent: {type: Number, required: false},
  outcomesList: {type:Array, required: false}
});


module.exports = mongoose.model('Category', categorySchema);
