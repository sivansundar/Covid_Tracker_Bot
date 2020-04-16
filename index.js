var express = require('express');
var packageInfo = require('./package.json');
const axios = require('axios');
const config = require('./config');

var token = config.SECRET_TOKEN.toString();
//var token = "1269749304:AAHYGGnKCKlsp9EGn-J_4uMQk32rZtjOqQ0"
var result;
var Array;

axios.get('https://api.covid19india.org/data.json')
  .then(response => {
   // console.log(response.data.statewise);
Array = response.data.statewise[1].state;
    console.log(Array);
    //console.log(response.data.state);
    //result = response.data.url;
  })
  .catch(error => {
    console.log(error);
  });

var Bot = require('node-telegram-bot-api'),
    bot = new Bot(token, { polling: true });

    console.log('bot server started...');

    var b = "Bb"

    bot.on('message', (msg) => {
    
      var Hi = "mh";
      if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
      bot.sendMessage(msg.chat.id, Array);
      } 
          
      });

var app = express();

app.get('/', function (req, res) {
  res.json({ version: packageInfo.version });
});

var server = app.listen(5000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Web server started at http://%s:%s', host, port);
});