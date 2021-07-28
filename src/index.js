const express = require('express');
const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(require('./routes/index'));
app.get('/', function(req,res){
    res.send('Ruta INICIO')
})
app.listen(3000);
console.log('Server on port 3000');

