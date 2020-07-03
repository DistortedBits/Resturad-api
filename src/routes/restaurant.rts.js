const express = require('express');
const router = express.Router();

var jwt = require('jsonwebtoken');


const qrs = require('../querys/restaurant.qrs.js');

router.get('/', verifyToken, async (req, res, next) =>{

   try{
      let results = await qrs.getAll();
      res.json(results);
   } catch(e){
      //if something goes wrong, it will resolve to a 500 error message
      console.log(e);
      res.sendStatus(500);
   }
});

router.get('/:id', async (req, res, next) =>{

   try{
      let results = await qrs.getOne(req.params.id);
      res.json(results[0]);
   } catch(e){
      //if something goes wrong, it will resolve to a 500 error message
      console.log(e);
      res.sendStatus(500);
   }
});

module.exports = router;

//NOTE(Viktor): verifyToken should be used as middleware where a rout is deemed to be
// importent enough for us to requiere authentication.
function verifyToken(req, res, next){

   //This will get the necisarry header
   const bearerHeader = req.headers['authorization'];

   //check if undefined
   if (typeof bearerHeader !== 'undefined') {
      
      //SPLIT THAT BOI
      const bearer = bearerHeader.split(' ');

      //This takes the actual token from the header.
      const bToken = bearer[1];

      req.token = bToken;

      next();
   }else{
      //if there is no token, 401 dat bish
      res.sendStatus(401);
   }
}
