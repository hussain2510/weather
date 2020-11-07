const express=require("express");
const http=require("https");
const bodyParser=require("body-parser");
const app=express();
app.get("/",function(req,res)
  {
    res.sendFile(__dirname+"/index.html");

});
app.use(bodyParser.urlencoded({extended:true}));
app.post("/",function(request,res)
{
  var cityName=request.body.cityName;
  http.get("https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=f199e5c5aa71bc812bc19d7b3ad00865&units=metric",function(response)
  {
    console.log(response.statusCode);
    response.on("data",function(data)
  {
    console.log(data);      /* data in hex code*/
    const dataRecieved=JSON.parse(data);    /* converting data in javascript object*/
    console.log(dataRecieved);             /* printing the whole data recieved as javascript object*/
    const temp=dataRecieved.main.temp;
    const weatherDescription=dataRecieved.weather[0].description;
    console.log(weatherDescription);
    /*res.send("<h1>Todays Temperature:</h1><"+temp+"<br><p>Weather description:</p>"+weatherDescription);    we can only use one send because this is end of of that file*/
    res.write("<p>The weather is currently "+weatherDescription+"</p>");/*res.write is used to create multuiple lines*/
    res.write("<h1>The tempr in "+ cityName+ " is "+temp+"degree celcius</h1>");

    /* for icon inside weather*/

    const icon=dataRecieved.weather[0].icon;
    const imgUrl="http://openweathermap.org/img/wn/" +icon+ "@2x.png";
    res.write("<img src="+imgUrl+">");
    res.send();
  })
  });
});

app.listen(3000,function(){console.log("server is running at port 3000");});
