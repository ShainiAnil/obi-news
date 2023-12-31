const serverErrors=((err,req,res,next)=>{
    res.status(500).send({status:500,msg:"internal server error"})
})

const customErrors = ((err,req,res,next)=>{
    if(err.status){
        res.status(err.status).send({msg: err.msg})
    }
   else next(err)
})
const psqlErrors = ((err,req,res,next)=>{ 
    if(err.code === '22P02'|| err.code === '23502'){
        res.status(400).send({msg: 'Bad request'})
    }
    if (err.code === "23503") {
        res.status(404).send({ msg: "Not Found" });
      }
    else next(err)
})
module.exports = {serverErrors, customErrors, psqlErrors}