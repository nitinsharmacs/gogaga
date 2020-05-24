const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;
const DB_URL = process.env.PORT || 'mongodb://127.0.0.1:27017';
const dbConnection = cb => {
	MongoClient.connect(DB_URL, {useNewUrlParser:true}).then(client=>{
		_db = client.db('gogaga');
		cb(null, _db);
	}).catch(err=>{
		cb(err, null);
	});
};

const database = () => _db?_db:null;

exports.dbConnection = dbConnection;
exports.database = database;

