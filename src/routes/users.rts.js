const express = require('express');
const router = express.Router();

var jwt = require('jsonwebtoken');


const qrs = require('../querys/users.qrs.js');

router.get('/', async (req, res, next) =>{

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

//REMEMBER TO ADD AUTHENTICATION TO THIS LATER!!!!
router.post('/', async (req, res, next) =>{

   try{
      let results = await qrs.create(req.body);
      res.json(results);
   } catch(e){
      //if something goes wrong, it will resolve to a 500 error message
      console.log(e);
      res.sendStatus(500);
   }
});

module.exports = router;