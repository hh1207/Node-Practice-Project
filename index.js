const genres = require('./routes/genres');
const debug = require('debug')('app:startup'); //debug module that loads the module and set a nameplace for that environment
const config = require('config'); //Configuration module
const morgan = require('morgan'); // HTTP logger

const express = require('express'); // loads the express module onto a function. Creates and maintain server
const app = express(); //create an object for a new instance of the Express class

//Templating Engine 
app.set('view engine', 'pug'); //Express internally load the module.
app.set('views', './views'); // load the template from the views folder. Path route 

//Two different ways to display the current environment 
console.log(`Node_ENV: ${process.env.NODE_ENV}`);  
console.log(`app: ${app.get('env')}`); 

//Built in Middleware
app.use(express.json()); //Adding middleware to enable reading of JSON. 
app.use(express.urlencoded({extended: true})); //enable you to pass in urlencoded information for HTTP request
app.use(express.static('public')); // enables you to serve static function to the user 
app.use('/api/genres', genres); //For any route that uses that path, use the genres file

//Third part Middleware
app.use(morgan('tiny')); //Logs HTTP request in the console terminal with the TINY format

//configuration module
console.log('Application Name: ' + config.get('name')); //Prints the name of the current configuration
console.log('Mail server: ' + config.get('mail.host'));// Prints the mail.host of the configuration

if (app.get('env') === 'development'){
    app.use(morgan('tiny'));
    debug('Morgan enabled...');
}

app.get('/',(request,response) => { //Get request takes two argument, the path and the callback function
    // response.send('Hello World!!!');
    response.render('index', { title: 'My Application', message: 'Hello World'});
}); 

const port = process.env.PORT || 5000;
 //Global object.environment variable.Name. 
 // Attempt to read enviroment variable called port. If not available use 3000

app.listen(port, () => console.log(`Listening on port ${port}`))
