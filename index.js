var express = require('express');
var packageInfo = require('./package.json');

const axios = require('axios');

var token = "1269749304:AAHYGGnKCKlsp9EGn-J_4uMQk32rZtjOqQ0"
//process.env.token.toString();


let responseArray;

var states = ['TN', "MH", "KA", "RJ", "AP", "AR", "AS", "BR", "CG", "GA", "GJ", "HR", "HP", "JH", "KL", "MP", "MN",
 "ML", "MZ", "NL", "OD", "PB", "RJ", "SK", "TS", "TR", "UP", "UK", "WB", "AN", "CH", "DD", "DL", "JK", "LA", "LD", "PY" 

 ];

 var help = "Welcome to the Covid Tracker Bot. The bot helps you to retrieve live stats of each state affected by the deadly virus in India. Enter the state code to view covid stats." + 
 "\n\n" + "Eg : ( TN, KA, MH, KL, UP etc ) \n\n\n" + "Bot developed by Sivan.\n" +
 "http://www.twitter.com/sivansundar \nhttp://www.github.com/sivansundar ";

 var stateValue;

 //Initial run when the project is deployed.
 getJSONData();
 
 //Pull JSON data every 1 hour
 const interval = setInterval(() => {
   console.log('Job Executed!');
   getJSONData();
 }, 3600000);
 
 
 
 
 async function getJSONData() {
 
 axios.get('https://api.covid19india.org/data.json')
   .then(response => {
   
    responseArray = response.data.statewise;
    console.log("Get function executed");
   
   })
   .catch(error => {
     console.log(error);
   });
 
 }
 


var Bot = require('node-telegram-bot-api'),
    bot = new Bot(token, { polling: true });

    console.log('bot server started...');

    bot.on('message', (msg) => {

    if(msg.text.toString() == "/help") {
      bot.sendMessage(msg.chat.id, help.toString());

    }
    else {
      
    
     for(var i = 0 ; states.length ; i++) {
      if(msg.text.toString() == states[i].toString()) {
        console.log("Position is : " + i);
        stateValue = states[i].toString();
       
        break;
      }
    }

    getDetails(msg, stateValue)   
    } 
          
      });

      


    async function getDetails (msg, state) {
      
      let results = responseArray.filter(obj => obj.statecode == state);
      console.log("######################\n\n\n")
      console.log(results);
        
  
      let val = formatDetails(results)
     
        bot.sendMessage(msg.chat.id, val.toString());
        
      }
  
      function formatDetails(results) {
        let stateName = results.map(a => a.state);
        let activeCasesValue = results.map(a => a.active);
        let confirmedCasesValue = results.map(a => a.confirmed);
        let deathsValue = results.map(a => a.deaths);
        let deltaconfirmedValue = results.map(a => a.deltaconfirmed);
        let deltadeathsValue = results.map(a => a.deltadeaths);
        let deltarecoveredValue = results.map(a =>  a.deltarecovered);
        let lastupdatedtimeValue = results.map(a => a.lastupdatedtime);
        let recovered = results.map(a => a.recovered);

        let value = stateName + "\n\n"+"Active cases : " + activeCasesValue + "\n"
        + "Confirmed Cases : " + confirmedCasesValue + " ( " + deltaconfirmedValue + " ⭡ )" + "\n"
        + "Death Value : " + deathsValue + " ( " + deltadeathsValue + " ⭡ )" + "\n"
        + "Recovered Value : " + recovered + " ( " + deltarecoveredValue + " ⭡ )\n\n"
        + "Last updated : " + lastupdatedtimeValue;

        return value;
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