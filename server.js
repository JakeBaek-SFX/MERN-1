const express = require('express');
const app = express();

app.listen(8080, ()=>{

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