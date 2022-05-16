const Movie = require('../model/movie')

const mongodb = require('mongodb')
objectId = mongodb.ObjectId

exports.getAddMovie = (req,res)=>{
    if(!req.isAuthenticated()){
        res.redirect('/login')
    }
    res.render('add-movie',{pageTitle:"Add Movie", path:"/admin/add-movie"})
}

exports.postAddMovie = (req,res)=>{
    const movie = new Movie({
        movieName: req.body.movieName,
        year: req.body.year,
        director: req.body.director,
        imageUrl: req.body.imageUrl
    })

    movie.save().then((result)=>{console.log('Created the movie')})
    res.redirect('/')
}

exports.getEditMovie = (req,res)=>{
    const movieId = req.params.id
    Movie.findById(movieId).then(movie=>{
        res.render('edit-movie',{movie:movie, pageTitle: "Edit Movie", path:null})
    })
}

exports.postEditMovie = (req,res)=>{
    const movieId = req.body.id
    const updatedName = req.body.movieName
    const updatedYear = req.body.year
    const updatedDirector = req.body.director
    const updatedImgUrl = req.body.imageUrl

    Movie.findByIdAndUpdate(new mongodb.ObjectId(movieId), {
        movieName: updatedName,
        year: updatedYear,
        director: updatedDirector,
        imageUrl: updatedImgUrl
    }).then(()=>{
        console.log("Movie Updated"); 
        res.redirect('/')
    })
    .catch(err => console.error(err))
}

exports.postDeleteMovie = (req,res)=>{
    const movieId = req.body.id;
    Movie.findByIdAndRemove(movieId)
    .then(()=>{
        console.log("Movie Deleted")
        res.redirect('/');
    }).catch(err=>{console.log(err)})
}

exports.getMovies = (req,res,next)=>{
    if(!req.isAuthenticated()){
        res.redirect('/login')
    }
    Movie.find()
    .then(movies =>{
        res.render('movie',
        {
            pageTitle:"Movies", 
            movies:movies, 
            path:"/"
        })
    })
}

exports.getMovie = (req,res)=>{
    const movieId = req.params.id;
    Movie.findById(movieId)
    .then(movie =>{
        res.render('movie-details', {movie:movie, pageTitle: "Movie Details", path:"error"})
    })
}