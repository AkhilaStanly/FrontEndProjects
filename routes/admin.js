const express = require('express');
const router = express.Router()
const path = require('path')
const movieController = require('../controllers/movie.js')

router.get('/add-movie', movieController.getAddMovie)

router.post('/add-movie', movieController.postAddMovie)

router.get('/edit-movie/:id', movieController.getEditMovie)

router.post('/edit-movie', movieController.postEditMovie)

router.post('/delete-movie', movieController.postDeleteMovie)

module.exports = router