const { response } = require("express");
const express = require("express");
const https = require("https");

const app = express();

app.get('/', function(req,res){

var url = "https://api.openweathermap.org/data/2.5/weather?lat=12.81&lon=80.04&appid=eca6f565fe0912a3f23dd00c0884b0f9&units=metric";

https.get(url, function(res2){
console.log(res.statusCode);

res2.on("data", function(data){
    const weatherData = JSON.parse(data);
    const temp = weatherData.main.temp;
    console.log(temp);

    const icon = weatherData.weather[0].icon;
    const Making_imgUrl_for_icon = "https://openweathermap.org/img/wn/"+ icon +"@2x.png";

    res.write("<h1>The temp is my city is " + temp +"</h1>");
    res.write("<img src="+Making_imgUrl_for_icon+">");
    res.send();
})

})

})


app.listen(3000, function(){
console.log("Server is running on port 3000");
})