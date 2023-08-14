const { fetchAllTopics } = require("../models/topics.model")

function getAllTopics(request, response, next){
    fetchAllTopics()
    .then((result)=> {
     response.status(200).send({topics: result})   
    })
    .catch(next)
}
module.exports = {getAllTopics}