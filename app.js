const express=require('express');
const app=express();
const path=require('path')

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');

const inputBox=[];

app.get('/',function(req,res){
  res.render('index',{inputBox:inputBox,message:''});
})

app.post('/todo',function(req,res){
  const input=req.body.todoVal;

  if(input.trim()===''){
    return res.render('index',{inputBox:inputBox,message:''});
  }

  if(inputBox.includes(input)){
    return res.render('index',{inputBox:inputBox,message:`${input} is already present in the todo`});
  }

  inputBox.push(input);
  res.render('index',{inputBox:inputBox,message:''});
})
app.post('/delete',function(req,res){
  const index=req.body.index;
  inputBox.splice(index,1);
  res.render('index',{inputBox:inputBox,message:''});
})

module.exports=app;