//Part 1 

//jshint eversion: 6

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
   extended: true
}));

app.get('/', function (req, res) {
   res.sendFile(__dirname + "/signup.html");
});

app.listen(3000, function () {
   console.log("Server is running on Port 3000");
});

//Part 2

app.post('/', function (req, res) {

   var firstName = req.body.firstName;
   var lastName = req.body.lastName;
   var email = req.body.email;

   data = {
      members: [{
         email_address: email,
         status: "subscribed",
         merge: {
            FNAME: firstName,
            LNAME: lastName
         }
      }]
   }

   const jsonData = JSON.stringify(data); // a function used to turn js to JSON.

// Part 3

   const url = "https://us13.api.mailchimp.com/3.0/lists/f36294c24f";
   const options = {
      method : "POST",
      auth : "Abhinav1:3820f7f4f45c1e34356878f3ccf562d1-us13"
   }

   const request1 = https.request(url,options,function(response){    // https.get for getting data from sites and https.post to post data on websites to it.
      
      if(response.statusCode === 200){    // This is added later. To display success and failure pages.
         res.sendFile(__dirname + "success.html");   // use res.redirect to go from faiure page to signup again.
      }

      response.on(data,function(data){          
         console.log(JSON.parse(data));         // We made the request and even wrote function to convert the data
      })                                        // we get into object using parse, but we did not send our data that
   });                                          // we stringified. We send it using write function.

   request1.write(jsonData);
   request1.end();

  // console.log(firstName, lastName, email);
})




// Required for post in js file-- body-parser,app.post,app.use
// Required for post in html file-- action,name for variables,method

// Above things are not required for get.

// import express from "express" --  doesn't work, you have to require only

// for using static files - like images in your computer - on the server we use app.use - static

// Audience ID - f36294c24f
// API Key - 3820f7f4f45c1e34356878f3ccf562d1-us13


//parse() is used to convert String to Object. JSON. stringify() is used to convert Object to String.

// while deploying app to heroku, you have to change port 3000 to process.env.PORT , rest of things are displayed beautifily in heroku documentation.