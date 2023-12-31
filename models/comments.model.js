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

exports.createComment = (reqBody, articleId) => {
  const { username } = reqBody
  const { body } = reqBody
  
  return db
    .query(
      `INSERT INTO comments(
        article_id, author, body
      )
    VALUES
    ($1, $2, $3)
    RETURNING *;
    `,
      [articleId, username, body]
    )
    .then(({ rows }) => {
      return rows[0]
    })
}
exports.removeComment = (commentId) => {
  return checkArticleExists("comments", "comment_id", commentId).then(() => {
    db.query(`DELETE FROM comments WHERE comment_id = $1;`, [commentId])
  })
}