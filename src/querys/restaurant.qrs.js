const database = require('../database/index.js');

let restaurants = {};

restaurants.getAll = () =>{
    return new Promise((resolve, reject) =>{
        database.query("SELECT * FROM `resturad`.`resturant`;", (err, results)=>{
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

restaurants.getOne = (id) =>{
    return new Promise((resolve, reject) =>{
        database.query("SELECT * FROM `resturad`.`resturant` WHERE id=?;", id, (err, results)=>{
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

restaurants.create = () =>{
    return new Promise((resolve, reject) =>{
        database.query("SELECT * FROM `resturad`.`resturant` WHERE id=?;", id, (err, results)=>{
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};


restaurants.update = (id, restaurant) =>{
    return new Promise((resolve, reject) =>{
        database.query("UPDATE `resturad`.`resturant` SET `Name` = ?,`Description` = ?,`Image_URL` = ?,`Long` = ?,`Lat` = ? WHERE `id` = ?;", 
        [restaurant.Name, restaurant.Description, restaurant.Image_URL, restaurant.Long, restaurant.Lat, id], (err, results)=>{
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

restaurants.deleteOne = (id) =>{
    return new Promise((resolve, reject) =>{
        database.query("DELETE FROM `resturad`.`resturant` WHERE id=?;", id, (err, results)=>{
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

restaurants.deleteAll = () =>{
    return new Promise((resolve, reject) =>{
        database.query("DELETE FROM `resturad`.`resturant`;", (err, results)=>{
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

module.exports = restaurants;