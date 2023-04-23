const express = require('express');
const app = express();

app.listen(8080, ()=>{
  console.log('HIII');
});

app.get('/beauty', (req, res)=>{
  res.send('beauty webpage')
});

app.get('/pet', (req, res)=>{
  res.send('pet page honeyyy')
})

app.get('/', (req, res)=>{
  res.sendFile(__dirname + '/index.html')
})