const Joi = require('joi'); //Load the Joi Class. This provides simple validation methods to be used
const express = require('express');
const router = express.Router(); //since we have routes in seperate module we call the Route function

const genres= [  //create an array of videos available associated to a given ID
    {id: 1, name: 'Action'},
    {id: 2, name: 'Comedy'},
    {id: 3, name: 'Horror'},
]

//CRUD methods

function validateGenres(course) { //Function created to validate if the input meets the requirement.
    const schema = {
        name: Joi.string().min(3).required() //requires the name to be a string with 3 min letters
    };
    return Joi.validate(course,schema); 
}

router.get('/', (request,response) => { //set up additional routes. This one goes to the movie catelog
    response.send(genres);
});

router.post('/', (request,response) => {
    const { error } = validateGenres(request.body); // Equivalent to validateGenres(request.body).error
    if(error) { //Exception handling in case customer input wrong items
        response.status(400).send(error.details[0].message);
        return; //Joi provides client details on the error and how to resolve
    }

    const genre = {
        id: genres.length +1,
        name: request.body.name
    };
    
    genres.push(genre);
    response.send(genre); 
})


router.put('/:id', (request, response) => {
    const course = genres.find( c => c.id === parseInt(request.params.id));
     if(!course) 
     return response.status(404).send('The course with the given ID was not found') //exceptions for movies not included
 
    const { error } = validateGenres(request.body); // Equivalent to result.error
    if(error) { //Exception handling in case customer input wrong items
       return  response.status(400).send(error.details[0].message);
    }

    course.name = request.body.name;
    response.send(course);
});
router.get('/:id',(request,response) =>{ //set up additional routes. This one for specifically going directly to a movie in the catelog
   const course = genres.find( c => c.id === parseInt(request.params.id));

   if(!course) return response.status(404).send('The course with the given ID was not found') //exceptions for movies not included
   response.send(course);
});


router.delete('/:id', (request, response) =>{
    const course = genres.find(c => c.id === parseInt(request.params.id)); //Logic that sets a boolean value to course. Find method iterates through courses array until finding one that returns true
     if(!course) return response.status(404).send('The course with the given ID was not found') //exceptions for movies not included
    
     const index = genres.indexOf(course);
     genres.splice(index, 1);

     response.send(course);
})


module.exports = router;