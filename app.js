const express = require('express');
const { getAllTopics } = require('./controllers/topics.controller');
const { serverErrors, customErrors, psqlErrors } = require('./errors');
const { getEndpoints } = require('./controllers/endpoints.controller');
const {getArticleById, getArticles,patchArticleVotes} = require('./controllers/articles.controller');
const { getCommentsByArticle,postComment, deleteComment } = require('./controllers/comments.controller');
const { getUsers } = require('./controllers/users.controller');
const app = express();

app.use(express.json())

app.get('/api', getEndpoints) 

app.get('/api/topics', getAllTopics)

app.get('/api/articles',getArticles)

app.get('/api/articles/:article_id',getArticleById)

app.get('/api/articles/:article_id/comments', getCommentsByArticle)

app.post("/api/articles/:article_id/comments", postComment)

app.patch("/api/articles/:article_id", patchArticleVotes)

app.delete("/api/comments/:comment_id",deleteComment) 

app.get('/api/users',getUsers)

app.use(customErrors) 

app.use(psqlErrors)

app.use(serverErrors)

module.exports = app