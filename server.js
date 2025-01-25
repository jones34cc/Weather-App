const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res)
{
    res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res)
{
    

    var query=req.body.city_name;
    var apikey="3e8c03c21a2528ded87d64425765a8f1"
    var unit="metric";
    https.get("https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit,function(response){
        

        response.on("data",function(data)
    {
        const weatherdata=JSON.parse(data);
        const tempreature=weatherdata.main.temp;
        const weatherdescription=weatherdata.weather[0].description;
        const icon=weatherdata.weather[0].icon;
        const imgurl="https://openweathermap.org/img/wn/"+icon+"@2x.png";

        res.write("<p>The current weather will be "+weatherdescription+"</p>");
        res.write("<h1>The current Tempreature in "+query+" is "+tempreature+" :)</h1>");
        res.write("<img src="+imgurl+">");
        
        res.send();
    })
    });
})



app.listen(3000,function(){
    console.log("Server is listening on port 3000.");
})