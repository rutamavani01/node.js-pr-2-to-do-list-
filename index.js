const express = require('express');

const port = 8000;

const app = express();

app.use(express.urlencoded());

app.set('view engine','ejs');

let record = [
    {
        userid : 1,
        task : 'work',
        name : 'ruta',
        priority : 'high'
    },
    {
        userid : 2,
        task : 'work',
        name: 'shreya',
        priority : 'high'
    }                
]

app.get('/',(req,res)=>{
    let single = {};
    return res.render('form',{
        record,
        single
    });
})

app.post('/addRecord',(req,res)=>{
   let name = req.body.name;
   let task = req.body.task;
   let priority = req.body.priority;
   let id = req.body.editid;
   let userid = Math.floor(Math.random()*100);

   let obj = {
    userid : userid,
    name : name,
    task : task,
    priority : priority
   }

   if(id){
    let editData = record.map((v)=>{
        if(v.userid == id){
            v.name = req.body.name;
            v.task = req.body.task;
            v.priority = req.body.priority;
        }
        return v;
    })
    record = editData;
    return res.redirect('/');
   }else{
    record.push(obj);
    return res.redirect('/');
   }
})

app.get('/deleteRecord',(req,res)=>{
   let id = req.query.deleteId;
   let Delete = record.filter((v)=>{
       return v.userid != id;
   })
   record = Delete;
   return res.redirect('/');
})

app.get('/editRecord',(req,res)=>{
    let id = req.query.editId;
    let Edit = record.find((v)=>{
        return v.userid == id;
    })
    return res.render('form',{
        single : Edit,
        record
    })
})

app.listen(port,(err)=>{
    if(err){
        console.log("Server is not responding");
        return false;
    }
    console.log(`Server is start on port:- ${port}`);
})