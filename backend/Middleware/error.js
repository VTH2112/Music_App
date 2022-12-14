const errorMdw = (err, req, res, next)=>{
    console.log(err.message)
    switch (err.message){
        case "USER_NOT_FOUND":
            res.status(403).send("USER IS NOT EXISTED");
            break;
        case "AUTH_DENIED":
            res.status(403).send("LOGIN FAIL");
            break;
        default:
            next(err);
    }

}
module.exports  = errorMdw;