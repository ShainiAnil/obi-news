const express = require('express');
const { getAllTopics } = require('./controllers/topics.controller');
const { serverErrors, customErrors, psqlErrors } = require('./errors');
const { getEndpoints } = require('./controllers/endpoints.controller');
const {getArticleById, getArticles} = require('./controllers/articles.controller');
const { getCommentsByArticle } = require('./controllers/comments.controller');
const app = express();

app.get('/api', getEndpoints) 

app.get('/api/topics', getAllTopics)

app.get('/api/articles',getArticles)

app.get('/api/articles/:article_id',getArticleById)

app.get('/api/articles/:article_id/comments', getCommentsByArticle)

app.use(customErrors) 

app.use(psqlErrors)

app.use(serverErrors)

module.exports = app