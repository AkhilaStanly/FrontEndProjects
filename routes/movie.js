const express = require('express');
const router = express.Router()
const path = require('path')
const adminData = require('./admin')
const movieController = require('../controllers/movie.js')

router.get('/', movieController.getMovies)
router.get('/movie/:id', movieController.getMovie)

module.exports = router