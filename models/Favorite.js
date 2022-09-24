const mongoose = require('mongoose')

const FavoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
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
  },
  assignments: {
    type: Array,
  }
})

module.exports = mongoose.model('Favorite', FavoriteSchema)