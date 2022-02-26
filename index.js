const Joi = require('joi'); //Load the Joi Class 
const express = require('express'); // loads the express module onto a function
const app = express(); //create an object for a new instance of the Express class

app.use(express.json()); //Adding middleware 

const courses = [  //create an array of videos available associated to a given ID
    {id: 1, name: 'course1'},
    {id: 2, name: 'course3'},
    {id: 3, name: 'course2'},
]

function validateCourse(course) { //Function created to validate if the input meets the requirement.
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course,schema);
}

//CRUD methods
app.get('/',(request,response) => { //Get request takes two argument, the path and the callback function
    response.send('Hello World!!!');
}); 

app.get('/api/courses', (request,response) => { //set up additional routes. This one goes to the movie catelog
    response.send(courses);
});

app.post('/api/courses', (request,response) => {
    const { error } = validateCourse(request.body); // Equivalent to result.error
    if(error) { //Exception handling in case customer input wrong items
        response.status(400).send(error.details[0].message);
        return; //Joi provides client details on the error and how to resolve
    }

    const course = {
        id: courses.length +1,
        name: request.body.name
    };
    courses.push(course);
    response.send(course); 
})


app.put('/api/courses/:id', (request, response) => {
    const course = courses.find( c => c.id === parseInt(request.params.id));
     if(!course) 
     return response.status(404).send('The course with the given ID was not found') //exceptions for movies not included
 


    const { error } = validateCourse(request.body); // Equivalent to result.error
    if(error) { //Exception handling in case customer input wrong items
       return  response.status(400).send(error.details[0].message);
    }

    course.name = request.body.name;
    response.send(course);
});



app.get('/api/courses/:id',(request,response) =>{ //set up additional routes. This one for specifically going directly to a movie in the catelog
   const course = courses.find( c => c.id === parseInt(request.params.id));

   if(!course) return response.status(404).send('The course with the given ID was not found') //exceptions for movies not included
   response.send(course);
});

//Setting up PORT Environment Variable 

const port = process.env.PORT || 5000;
 //Global object.environment variable.Name. 
 // Attempt to read enviroment variable called port. If not available use 3000

app.delete('/api/courses/:id', (request, response) =>{
    const course = courses.find( c => c.id === parseInt(request.params.id));
     if(!course) return response.status(404).send('The course with the given ID was not found') //exceptions for movies not included
    
     const index = courses.indexOf(course);
     courses.splice(index, 1);

     response.send(course);
})



app.listen(port, () => console.log(`Listening on port ${port}`))




