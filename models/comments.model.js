const db = require("../db/connection");
const { checkArticleExists } = require("../utils/utils");

exports.fetchCommentsByArticle = (articleId) => {
    
  return checkArticleExists("articles", "article_id", articleId)
    .then(() => {
      return db.query(
        `SELECT * FROM comments
      WHERE article_id = $1
      ORDER BY created_at DESC;`,
        [articleId]
      );
    })
    .then(({ rows }) => rows);
};