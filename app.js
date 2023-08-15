const express = require('express');
const { getAllTopics } = require('./controllers/topics.controller');
const { serverErrors } = require('./errors');
const { getEndpoints } = require('./controllers/endpoints.controller');

const app = express();


app.get('/api', getEndpoints) 

app.get('/api/topics', getAllTopics)

app.use(serverErrors)

module.exports = app