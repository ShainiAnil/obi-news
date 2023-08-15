const fs = require('fs/promises')


getEndpoints = (req,res,next) =>{
    return fs
        .readFile('./endpoints.json')
        .then((fileContents)=>{
            const data =JSON.parse(fileContents)
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
}


module.exports = {getEndpoints}