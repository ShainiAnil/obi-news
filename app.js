const express = require('express');
const { getAllTopics } = require('./controllers/topics.controller');
const { serverErrors, customErrors } = require('./errors');
const { getEndpoints } = require('./controllers/endpoints.controller');
const {getArticleById} = require('./controllers/articles.controller')
const app = express();


app.get('/api', getEndpoints) 

app.get('/api/topics', getAllTopics)

app.get('/api/articles/:article_id',getArticleById)

app.use(customErrors) 

app.use(serverErrors)

module.exports = app