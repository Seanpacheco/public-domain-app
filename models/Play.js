const mongoose = require('mongoose')

const PlaySchema = new mongoose.Schema({
  title: {
    type: String,
  },
  playwright: {
    type: String,
  },
  roles: {
    type: String,
  },
  acts: {
    type: String,
  },
  genre: {
    type: Array,
  }
})

module.exports = mongoose.model('Play', PlaySchema, 'plays')


