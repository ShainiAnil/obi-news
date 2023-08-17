const db = require("../db/connection")

const checkArticleExists = (id) => {
    return db.query("SELECT * FROM articles WHERE article_id = $1",[id]).then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
    })
  }
exports.fetchCommentsByArticleId = (articleId) => {
    return checkArticleExists(articleId)
      .then(() => {
        return db.query(
          `SELECT * FROM comments WHERE article_id = $1
        ORDER BY created_at DESC;`,
          [articleId]
        );
      })
      .then(({ rows }) => rows);
  };