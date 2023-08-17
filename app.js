const express = require('express');
const { getAllTopics } = require('./controllers/topics.controller');
const { serverErrors, customErrors, psqlErrors } = require('./errors');
const { getEndpoints } = require('./controllers/endpoints.controller');
const {getArticleById, getArticles} = require('./controllers/articles.controller');
const { getCommentsByArticle,postComment } = require('./controllers/comments.controller');
const app = express();

app.use(express.json())

app.get('/api', getEndpoints) 

app.get('/api/topics', getAllTopics)

app.get('/api/articles',getArticles)

app.get('/api/articles/:article_id',getArticleById)

app.get('/api/articles/:article_id/comments', getCommentsByArticle)

app.post("/api/articles/:article_id/comments", postComment)

app.use(customErrors) 

app.use(psqlErrors)

app.use(serverErrors)

module.exports = app