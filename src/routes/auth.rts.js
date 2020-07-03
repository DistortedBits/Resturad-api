const express = require('express');
const router = express.Router();

var jwt = require('jsonwebtoken');

//NOTE(Viktor): Since we are doing checks against the users table
//              we simply import it same as in the user routes.
const qrs = require('../querys/users.qrs.js');

router.post('/login', async (req, res) =>{
    
    try{
        //Creates a variable with the result of the querry
        let results = null;

        //NOTE(Viktor):Check wether or not the frontend used an Email or an Username to login
        //             by checking wether or not the variables are empty or not. 
        //             Due to the order of wich the checks are, name is prioritised.
        if (req.body.Name){
            results = await qrs.getByName(req.body.Name);
            verifyPassword();
        } 
        else if(req.body.Email){
            results = await qrs.getByEmail(req.body.Email);
            verifyPassword();
        }
        else{
            //If both uname and pswrd is empty, it returns 400
            res.sendStatus(400);
        }
        
        //Authenticates the password
        function verifyPassword(){
            if (req.body.Password) {
                //console.log(results);
                if (results.Password == req.body.Password) {
                    //This creates the token based on the users secret key etc
                    jwt.sign({user:results}, results.secret, {expiresIn: results.token_ttl}, (err, token) =>{
                        res.json({token});
                    });    
                }else{
                    res.status(409).send("Password authentication failed");    
                }
            }else{
                //If the password is empty, it returns 400
                res.sendStatus(400);
            }
        }


     } catch(e){
        //if something goes wrong, it will resolve to a 500 error message
        //or if the e is a number, aka another error code.
        console.log(e);
        if (Number.isInteger(e)) {
            res.sendStatus(e); 
        }else{
            res.sendStatus(500);
        }
    }
});

module.exports = router;