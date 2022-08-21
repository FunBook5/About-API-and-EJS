// jshint: eversion6

// New things in css file - gradient , last-child , input-checked , input[sq bracket for being specific], sudo selector

const express = require('express');
const bodyParser = require('body-parser');
const { localsName } = require('ejs');

const app = express();

app.set('view engine', 'ejs');// This is for ejs, this placement of this line is important.
                              // We also have to create Views folder and index1.ejs file there.
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

var items = ["Buy Ice-cream"]; //Code written later to provide global scope to array items.

app.get('/',function(req,res){

   //res.send("hello");
   // Anything inside this get function will be executed on server side.

   var today = new Date();
   //var todayDay = today.getDay();

   // We can use switch statements for each day like usual, but we are going to try new way using js.

   var options = {
    weekday: "long",
    day : "numeric",
    month : "long"
   };

   var todayDay = today.toLocaleDateString("hi-IN",options);

   

   res.render("index1",{dayToday : todayDay, newitems1 : items}); // this is for ejs.



   // console.log doesn't work in this function as we are inside server here.

   // if only one thing to send, can be sent directly into res.send().
   // But if multiple things, res.write() all things and then at last send an empty res.send();

   // for sending html page it is res.sendFile(__dirname+"index.html");

})

app.post("/",function(req,res){

    const var1 = req.body.newitem;
    //console.log(var1);
    items.push(var1);

    res.redirect("/"); //Sends the program into app.get again.

})

app.listen(3000,function(req,res){
     
     console.log("Server is running on port 3000");


})



//Try to use let and const only, avoid var as it is global whenever declared.