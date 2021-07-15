const express = require('express');
const ejs=require("ejs");
const app=express();

const https = require('https');

const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));
app.set("view engine","ejs");

var ips=["13.233.60.196"];

app.get("/",function(req,res){
  const ip=ips[ips.length-1];
  console.log(ip);
  const api_key = 'at_U0q8vuN8kCD5WNrsNjwgiDJjdGqKO';
  const api_url = 'https://geo.ipify.org/api/v1?';

  const url = api_url + 'apiKey=' + api_key + '&ipAddress=' + ip;

  https.get(url,function(response){
    response.on("data",function(data){

      const ipAddressData = JSON.parse(data);
      const country = ipAddressData.location.country;
      const region  = ipAddressData.location.region;
      const city  = ipAddressData.location.city;
      const postalCode = ipAddressData.location.postalCode;
      const timezone  = ipAddressData.location.timezone;
      const lat  = ipAddressData.location.lat;
      const lng  = ipAddressData.location.lng;


      res.render("home",{
        latitude:lat,
        longitude:lng,
        ip:ip,
        country:country,
        region:region,
        city:city,
        timezone:timezone,
        postalCode:postalCode
      });

    });

  });

});

app.post("/",function(req,res){
  const ip = req.body.inputIpAddress;
  // console.log(ip);
  ips.push(ip);

  res.redirect("/");

});

// at_U0q8vuN8kCD5WNrsNjwgiDJjdGqKO

app.listen(process.env.PORT||3000,function(req,res){
  console.log("server is running at port 3000");
});
