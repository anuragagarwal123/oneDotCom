function checkRole(role){
    return async function(req,res,next){
        // get the userId from request
        const userId = req.header['userId'];
        if(!userId){
            return res.status(401).send("Unauthorized")
        }
        try{
            // get role from db
            let role ;
            if(role == ''){
                next();
            }else {
                res.status(403).send("Access Denied")
            }
        }catch(err){
            res.status(500).send("Internal Server Error") 
        }
    }
}