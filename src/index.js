const express = require('express');
const path = require('path');
const morgan = require('morgan')
const { mongoose } = require('./database');


const app = express();
//configuración
app.set('port', 3000)
//middleware
app.use(morgan('dev'));
app.use(express.json());
//routes
app.use('/api',require('./routes/routes'));
app.use('/api1',require('./routes/patricio'));
//static
app.use(express.static(path.join(__dirname, 'public')));
//start server
app.listen(app.get('port'), () => {
    console.log('server on port '+app.get('port'));
});