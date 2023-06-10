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

  app.get('/results', (req, res)=>{
    res.render('results.ejs');
  })
  
  app.post('/add', (request, results) => {
    db = client.db('Mern-to-do');
    db.collection('counter').findOne({name: 'totalPost'}, (req, res)=>{
      const counter = res.totalPost;
      console.log('counter', counter);
      db.collection('post').insertOne({_id: counter + 1, toDo : request.body.toDo, due : request.body.dueDate} , function(err, res){
        db.collection('counter').updateOne({name: 'totalPost'} , { $inc : {totalPost: 1}},  function(err, res){
          results.redirect('/list');
        });
      });
    });
  });
  
  app.get('/list', (req, res)=>{
    db = client.db('Mern-to-do');
    db.collection('post').find().toArray((err, data)=>{
      console.log('data', data);
      res.render('list.ejs', {results: data});
    });
  });
    
  app.get('/detail/:id', (req, res)=>{
    db = client.db('Mern-to-do');
    db.collection('post').findOne({_id: parseInt(req.params.id) }, (err, data)=>{
      console.log('data', data);
      if(data){
        res.render('detail.ejs', {result: data});
      }
    });
  });

  app.delete('/delete', (req, res)=>{
    const id = req.body._id
    db = client.db('Mern-to-do');
    db.collection('post').deleteOne({_id: parseInt(id)}, function(err, req, results, next){
      if(err){
        res.status(400).send();
      }
      res.status(200).send();
    });
  })
});