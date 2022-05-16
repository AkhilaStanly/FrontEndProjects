const mongoose = require('mongoose')

const Schema = mongoose.Schema

const movieSchema = new Schema({
    movieName: String,
    year: Number,
    director: String,
    imageUrl: String
})

module.exports = mongoose.model('Movie', movieSchema, 'movies')