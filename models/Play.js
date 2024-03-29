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
  },
  year: {
    type: String,
  },
  img: {
    type: String,
  },
  synopsis: {
    type: String,
  },
  characters: {
    type: Array,
  }
})

module.exports = mongoose.model('Play', PlaySchema, 'plays')


