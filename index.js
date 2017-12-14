const express=require('express');
const app = express();
const path=require('path');
app.get('/', function(req, res){
   res.sendFile(path.join(__dirname+'/index.html'));
});
app.get('/toform.js',function(req,res){
  res.sendFile(path.join(__dirname+'/todoform.js'));
});
app.get('/pageschema.json',function(req,res){
  res.sendFile(path.join(__dirname+'/pageschema.json'));
});
app.listen(8081);