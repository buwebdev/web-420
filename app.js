/*
============================================
; Title:  app.js
; Author: Professor Krasso
; Date:   8 April 2021
; Description: Main server file for the assignments in WEB 420 RESTful APIs
;===========================================
*/

const express = require('express');
const http = require('http');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const mongoose = require('mongoose');
const fruitAPI = require('./routes/fruit-routes');
const nodeTechAPI = require('./routes/node-tech-routes');
const passwordAPI = require('./routes/password-routes');

/**
 * Student examples
 */
const Ex01 = require('./routes/ex01');

let app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({'extended': true}));

/**
 * TODO: Added during week 3
 */
const conn = 'mongodb+srv://superadmin:s3cret@cluster0.lujih.mongodb.net/web420DB?retryWrites=true&w=majority';
mongoose.connect(conn, {
    promiseLibrary: require('bluebird'),
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log(`Connection to web420DB on MongoDB Atlas successful`);
}).catch(err => {
    console.log(`MongoDB Error: ${err.message}`);
})
// TODO: end of week 3 items

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'WEB 420 RESTful APIs',
            version: '1.0.0',
        },
    },
    apis: ['./routes/*.js'], // files containing annotations for the OpenAPI Specification
};

const openapiSpecification = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use('/api', fruitAPI);
app.use('/api', nodeTechAPI);
app.use('/api', passwordAPI);

/**
 * Example apis
 */
app.use('/api', Ex01);

http.createServer(app).listen(app.get('port'), function() {
    console.log(`Application started and listening on port ${app.get('port')}`);
})
