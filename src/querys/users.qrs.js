const database = require('../database/index.js');

let users = {};

users.getAll = () =>{
    return new Promise((resolve, reject) =>{
        database.query("SELECT * FROM `resturad`.`user`;", (err, results)=>{
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

users.getOne = (id) =>{
    return new Promise((resolve, reject) =>{
        database.query("SELECT * FROM `resturad`.`user` WHERE id=?;", id, (err, results)=>{
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

users.getByEmail = (email) =>{
    return new Promise((resolve, reject) =>{
        database.query("SELECT * FROM `resturad`.`user` WHERE `user`.`Email` = ?;", email, (err, results)=>{
            if(err){
                return reject(err);
            }
            //this will check if the 
            else if (!results.leangth) {
                err = 404;
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

users.getByName = (name) =>{
    return new Promise((resolve, reject) =>{
        database.query("SELECT * FROM `resturad`.`user` WHERE `Username`=?;", name, (err, results)=>{
            if(err){
                //console.log(err);
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

users.create = (newUser) =>{
    return new Promise((resolve, reject) =>{
        database.query("INSERT INTO `resturad`.`user` SET ?", newUser, (err, results)=>{
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};


users.update = (id, restaurant) =>{
    return new Promise((resolve, reject) =>{
        database.query("UPDATE `resturad`.`user` SET `Name` = ?,`Description` = ?,`Image_URL` = ?,`Long` = ?,`Lat` = ? WHERE `id` = ?;", 
        [restaurant.Name, restaurant.Description, restaurant.Image_URL, restaurant.Long, restaurant.Lat, id], (err, results)=>{
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

users.deleteOne = (id) =>{
    return new Promise((resolve, reject) =>{
        database.query("DELETE FROM `resturad`.`user` WHERE id=?;", id, (err, results)=>{
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

users.deleteAll = () =>{
    return new Promise((resolve, reject) =>{
        database.query("DELETE FROM `resturad`.`user`;", (err, results)=>{
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

module.exports = users;