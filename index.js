var express = require('express');
var packageInfo = require('./package.json');
var where = require("lodash");

const axios = require('axios');
const config = require('./config');

var token = config.SECRET_TOKEN.toString();

var result;
let responseArray;

var json = '[{"user": "a", "age": 20}, {"user": "b", "age": 30}, {"user": "c", "age": 40}]';



axios.get('https://api.covid19india.org/data.json')
  .then(response => {
   // console.log(response.data.statewise);
   responseArray = response.data.statewise;
    console.log(responseArray);
    //console.log(response.data.state);
    //result = response.data.url;
  })
  .catch(error => {
    console.log(error);
  });


var Bot = require('node-telegram-bot-api'),
    bot = new Bot(token, { polling: true });

    console.log('bot server started...');

    var maharashtra = "MH"
    var TamilNadu = "TN"

    var botMsg;

    bot.on('message', (msg) => {
      
      //If the State is Maharashtra
      if (msg.text.toString().toLowerCase().indexOf(maharashtra.toLowerCase() || maharashtra.toUpperCase()) === 0) {

        getMaharashtraDetails(msg, maharashtra);
    } 

    if (msg.text.toString().toLowerCase().indexOf(TamilNadu.toLowerCase() || TamilNadu.toUpperCase()) === 0) {

      getTamilNaduDetails(msg, TamilNadu);
  } 

  
          
      });

    async function getMaharashtraDetails (msg, state) {
      
    let results = responseArray.filter(obj => obj.statecode == state);
    console.log("######################\n\n\n")
    console.log(results);
      
    let activeCasesValue = results.map(a => a.active);
    let confirmedCasesValue = results.map(a => a.confirmed);
    console.log(s);

     var value = "Confirmed cases : " + confirmedCasesValue + " \nActive cases : " + activeCasesValue;
      bot.sendMessage(msg.chat.id, "Maharashtra \n\n" + value);
      
    }


    async function getTamilNaduDetails (msg, state) {
      
      let results = responseArray.filter(obj => obj.statecode == state);
      console.log("######################\n\n\n")
      console.log(results);
        
      let activeCasesValue = results.map(a => a.active);
      let confirmedCasesValue = results.map(a => a.confirmed);
      console.log(s);
  
       var value = "Confirmed cases : " + confirmedCasesValue + " \nActive cases : " + activeCasesValue;
        bot.sendMessage(msg.chat.id, "TamilNadu \n\n" + value);
        
      }

var app = express();

app.get('/', function (req, res) {
  res.json({ version: packageInfo.version });
});

var server = app.listen(5000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Web server started at http://%s:%s', host, port);
});