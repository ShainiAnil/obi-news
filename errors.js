const serverErrors=((err,req,res,next)=>{
    res.status(500).send({status:500,msg:"internal server error"})
})

module.exports = {serverErrors}