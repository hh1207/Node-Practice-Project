const Joi = require('joi');
const express = require('express');
const mongoose = require('mongoose'); //load the mongoose module
const router = express.Router(); //since we have routes in seperate module we call the Route function

mongoose.connect('mongodb://localhost/Movie_Collections')  //connect to the local database
    .then(() => console.log('Connected to MongoDB...')) //once connected execute 
    .catch(err => console.error('Could not connect to MongoDB..'));

//Creating a schema - Shape of documents within a collection in Mongoose 
 const movieSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type:Date, default: Date.now},
    hasPaid: Boolean
 });

const Movie = mongoose.model('Movies', movieSchema); //mongoose.model method takes in the name of the collection and the shape (schema) of the collection


//Get movie collections based on the parameters listed 
async function getMovies(){
    const movies = await Movie
    .find({ author: 'Hai', hasPaid: true}) //Find movies with author as Hai that has paid
    .limit(10) // Limit search to 10 entries
    .sort({ name: 1}) // 
    .select({ name: 1, tags: 1});
    console.log(movies);

}

async function createMovie(){
     const movie = new Movie({
     name: 'Home Alone',
     author: 'Tommy',
     tags: ['frontend', 'backend'],
     hasPaid: true
 })
 const result = await movie.save(); //Asynchronus function.We will save this to MongoDB though the save method
 console.log(result); //confirmation through terminal that movie has been added
}



router.get('/',(req,res) => {
     Movie.find({}, function(err,movies){
         res.render('index', {
         moviesList: movies
         })
     })
    
});

createMovie();
getMovies();
 
module.exports = router;