const mongoose = require('mongoose');

const detailSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  theater: {
    type: String,
    required: true,
  },
});

const User = new mongoose.model("mvedetails",detailSchema);
module.exports=User;