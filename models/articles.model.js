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
 module.exports = {fetchArticleById}