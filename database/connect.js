require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;

let _db;

const initializeDb = async function(callback) {
    if(_db) {
        console.log("Database already initialized");
        return callback(null, _db);
    }

    try{
        _db = await MongoClient.connect(process.env.MONGO_URL);
        console.log ("Database initialized Sucessfully")
        return callback(null, _db);

    }catch(error){
        callback(error);
    }
}

const getDb = function() {
    if(!_db){
        throw Error("Database has not been initialized");
    };

    return _db
}

module.exports = {initializeDb, getDb}