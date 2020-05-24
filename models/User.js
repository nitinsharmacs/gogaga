const database = require('../util/database').database;


class User{
	constructor(name){
		this.user = {
			name:name
		}
	}
	save(){
		const db = database();
		return db.collection('users').insertOne(this.user);
	}
	static fetchAll(){
		const db = database();
		return db.collection('users').find().toArray();
	}
}

module.exports = User;