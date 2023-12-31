const db = require("../db/connection")
const { checkArticleExists } = require("../utils/utils")
const fetchArticleById = (id) =>{
    
    return db.query(`SELECT article_id, title, author, body, topic, created_at, votes, article_img_url FROM articles WHERE article_id=$1;`,[id])
    .then(({rows})=>{
        if(rows.length === 0){
            return Promise.reject({
                status:404, 
                msg: `No article found for article_id:${id}`
            })
        }
       return rows[0]
    })
    
}

const fetchArticles = () => {
    return db
      .query(
        `SELECT 
          articles.author, 
          title, 
          articles.article_id, 
          topic, 
          articles.created_at, 
          articles.votes, 
          article_img_url, 
          COUNT(comment_id) AS comment_count
        FROM articles
        LEFT OUTER JOIN comments ON articles.article_id = comments.article_id
        GROUP BY articles.article_id
        ORDER BY articles.created_at DESC;
      `
      )
      .then(({ rows }) => {
        rows.forEach(({ comment_count }) => {
          comment_count = parseInt(comment_count)
        })
        return rows
      })
  };

  const updateArticleVotes = (articleId, incVotes) => {
    
    return checkArticleExists("articles", "article_id", articleId)
      .then(() => { 
        return db.query(
          `UPDATE articles
            SET votes = votes + $1
            WHERE article_id = $2
            RETURNING *`,
            [incVotes, articleId]
        )
      })
      .then(({ rows }) => { 
        return rows[0]
      })
  }
  const getArticlesByTopic = (topic) => {
    return db
      .query(
        `SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id) AS comment_count 
       FROM articles
       LEFT JOIN comments ON articles.article_id = comments.article_id 
       WHERE articles.topic = $1
       GROUP BY articles.article_id
       ORDER BY articles.created_at DESC;`,
        [topic]
      )
      .then(({rows}) => {
        return rows;
      });
  };

 module.exports = {fetchArticleById, fetchArticles, updateArticleVotes, getArticlesByTopic}