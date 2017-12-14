const express=require('express');
const path=require('path');
const app=express();
app.use(express.static(path.join(__dirname,'public')));
//app.get('/:id',(req,res)=>res.send("hello i am from get"+req.params.id));
app.post('/myForm',(req,res)=>res.sendFile(path.join(__dirname,'public')));
app.listen(8081);