const movies = require('./routes/movies');
const express = require('express');
const app = express();
const ejs = require('ejs');

app.set('view engine', 'ejs'); //allows you to edit HTML with javascript logic
app.set('views', './views');


app.use(express.json());
app.use('/api/movies', movies);


app.get('/' , (request,response) => {
    response.send('Hello World');

});

const port = process.env.PORT || 5000; // Set the environment variable or defer to default 5000
app.listen(port, () => console.log(`Listening on port ${port}`))

