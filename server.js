const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const uri = "mongodb+srv://jakejonggubaek:Cdspace1!@cluster0.c8yeb4l.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    
  } finally {
    await client.close();
  }
}

const db = client.db('Mern-to-do');
db.collection('post').insertOne({name: 'jake', look: 'hot'}, (err, res) => {
  console.log('data stored');
})

app.listen('8080', ()=>{
  console.log('website opened');
});

app.get('/write', (req, res)=>{
  res.sendFile(__dirname + '/write.html')
});

app.get('/', (req, res)=>{
  res.sendFile(__dirname + '/index.html')
})

app.post('/add', (req, res)=>{
  res.send('success')
})

run().catch(console.dir);