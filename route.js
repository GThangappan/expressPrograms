const express=require('express');
const app=express();
const parser=require('body-parser');
const mongoClient=require('mongodb').MongoClient;
const url="mongodb://localhost:27017/test";
const router=express.Router();
app.use(parser.json()); // support json encoded bodies
app.use(parser.urlencoded({ extended: true })); // support encoded bodies
app.post('/api/users/insert', function(req, res) {
    var user_id = req.body.id;
    var token = req.body.token;
    var geo = req.body.geo;
	var msg=""
	mongoClient.connect(url,function(err,db){
		if(err) throw err;
		console.log("Connected withDB");
		var obj={uid:user_id,token:token,geo:geo};
		db.collection("coll").insertOne(obj,function(err,res){
			if(err) throw err;
			console.log("values inserted");
			msg="Succcess fully inserted";
			db.close();
		});
	});
    res.send("hi pro:"+msg);
});
app.post('/api/users/find',function(req,res){
	var user_id=req.body.id;
	mongoClient.connect(url,function(err,db){
		if(err) throw err;
		console.log("Connected withDB");
		var query={uid:user_id};
		db.collection("coll").find(query).toArray(function(err,result){
			if(err) throw err;
			console.log("result found");
			res.send("ID: "+result[0].uid+"token: "+result[0].token+"geo: "+result[0].geo);
			db.colose();
		});
	});
});
app.post('/api/users/delete',function(req,res){
	var user_id=req.body.id;
	mongoClient.connect(url,function(err,db){
		if(err) throw err;
		console.log("Connected withDB");
		var query={uid:user_id};
		db.collection("coll").deleteOne(query,function(err,result){
			if(err) throw err;
			console.log("result found");
			res.send(query.uid+"is Deleted");
			db.colose();
		});
	});
});
app.listen(8080);