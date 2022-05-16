const mongodb = require('mongodb'); //mongodb driver
const MongoClient = mongodb.MongoClient

let _db;

mongoConnect = (callbk)=>{
    MongoClient.connect("mongodb+srv://akhila:california@cluster0.dnne2.mongodb.net/myMovieDB?retryWrites=true&w=majority")
    .then(client =>{
        console.log("DB connected")
        _db = client.db()
        callbk()
    })
    .catch(err=>{
        console.log(err)
    })
};

const getDb = ()=>{
    if(_db){
        return(_db)
    }
    throw 'No database found'
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;