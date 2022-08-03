const errorMdw = (err, req, res, next)=>{
    console.log(err.message)
    switch (err.message){
        case "USER_NOT_FOUND":
            res.status(403).send("USER IS NOT EXISTED");
            break;
        default:
            next(err);
    }

}
module.exports  = errorMdw;