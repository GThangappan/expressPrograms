const express=require('express');
const app=express();
//with regex for getting 3 digit ids
app.get('/:id([0-5]{3})',(req,res)=>{res.send("The identity you send is:"+req.params.id);})
//for all other urls
app.get('*',(req,res)=>{res.send("The url is not in format");})
app.listen(8081);