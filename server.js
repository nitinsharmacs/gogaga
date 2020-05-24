const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

//importing db
const dbConnection = require('./util/database').dbConnection;
//importing User model
const User = require('./models/User');

const app = express();

app.use(express.static(path.join(__dirname+'/public')));
app.use(bodyParser.urlencoded({extended:false}));

app.get('/gogaga/list.html', (req, res)=>{
	res.setHeader('Content-Type','text/html');
	return res.sendFile(__dirname+'/views/list.html');
});

app.get('/gogaga/add.html', (req, res)=>{
	res.setHeader('Content-Type', 'text/html');
	return res.sendFile(__dirname +'/views/add.html');
})

app.get('/users', (req, res)=>{
	User.fetchAll().then(result=>{
		console.log(result)
		if(!result)
			throw new Error('Users not fetched');
		return res.status(200).json({message:'Users fetched', data:result})
	}).catch(err=>{
		console.log(err);
	});
})
app.post('/gogaga/add', (req, res)=>{
	const frndName = req.body.frndName;
	const user = new User(frndName);
	user.save().then(result=>{
		if(!result)
			throw new Error('Friend Not Added');
		return res.redirect('/gogaga/add.html');
	}).catch(err=>{
		console.log(err);
	})
});

app.use((req, res)=>{
	res.redirect('/gogaga/list.html');
})


const port = process.env.PORT || 3001;

dbConnection((err, db)=>{
	console.log(err);
	app.listen(port, ()=>{
		console.log(`App is running on ${port}`);
	});
});
