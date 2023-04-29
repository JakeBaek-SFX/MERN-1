const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const app = express();
const uri = "mongodb+srv://jakejonggubaek:Cdspace1!@cluster0.c8yeb4l.mongodb.net/?retryWrites=true&w=majority";

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.set('View engine', 'ejs');

var db;
MongoClient.connect(uri, { useUnifiedTopology: true }, function (err, client) {
  if (err) return console.log(err)

  app.listen(8080, function () {
    console.log('listening on 8080')
  });

  app.get('/write', (req, res)=>{
    res.sendFile(__dirname + '/write.html')
  });
  
  app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html')
  })
  
  app.post('/add', (req, res) => {
    db = client.db('Mern-to-do');
    db.collection('post').insertOne({toDo : req.body.toDo, due : req.body.dueDate} , function(err, res){
      console.log('SUCCESS');
      res.send({ status: 'SUCCESS' });
    });
  });
  
  app.get('/list', (req, res)=>{
    db = client.db('Mern-to-do');
    db.collection('post').find().toArray((err, data)=>{
      console.log('res', data);
      res.render('list.ejs', {results: data});
    });
    
  });
});