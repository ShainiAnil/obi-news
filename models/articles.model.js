const db = require("../db/connection")

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

 module.exports = {fetchArticleById, fetchArticles}