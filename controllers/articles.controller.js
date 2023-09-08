const articles = require("../db/data/test-data/articles");
const {fetchArticleById, fetchArticles, updateArticleVotes, getArticlesByTopic} = require("../models/articles.model")

exports.getArticleById = (req, res, next)=>{
    const {article_id} = req.params;
    
    fetchArticleById(article_id)
    .then((article) => {
        res.status(200).send({ article });
    })
    .catch(err =>{
        
        next(err)
    })
}
exports.getArticles = (req, res, next) => {
  const{topic} = req.query;
  if(topic){
    getArticlesByTopic(topic)
    .then((articles)=>{
      res.status(200).send({
        articles:articles
      })
    })
    .catch(next)
  }
  else{
    fetchArticles()
    .then((articles) => {
      res.status(200).send({ articles })
    })
    .catch(next)
  }
   
}
exports.patchArticleVotes = (req, res, next) => {
    const { article_id } = req.params
    const { inc_votes } = req.body
    updateArticleVotes(article_id, inc_votes)
      .then((article) => {
        res.status(200).send({ article })
    })
      .catch(next)
};
  