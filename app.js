//External Node-modules for the project
const express=require('express');
const bodyParser=require('body-parser');
const request=require('request');
//Native Node-modules
const https = require('https');

//App-gateway
var app=express();

//Using External Modules/packages
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
//GET route-handler for the home page
app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

//POST route-handler for the home page
app.post("/",function(req,res){
  var first_name=req.body.Fname;
  var last_name=req.body.Lname;
  var email=req.body.email;
  console.log(first_name+" "+last_name+" "+email);
  var data={
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: first_name,
          LNAME: last_name
        }
      }
    ]
  }
  const url="https://us14.api.mailchimp.com/3.0/lists/8781cdf887";
  const options={
    method:"POST",
    auth:"angela1:6847bdf3c522726958ffecd20aec17ed-us14"
  }
  var jsonData=JSON.stringify(data);
  const request= https.request(url,options,function(response){
    if(response.statusCode === 200){
      res.sendFile(__dirname+"/success.html");
    }else{
      res.sendFile(__dirname+"/failure.html");
    }
response.on("data",function(data){
console.log(JSON.parse(data));
});
  });
  request.write(jsonData);
  request.end();
});

app.post("/failure",function(req,res){
  res.redirect("/");
})
//Running on local host
app.listen(3000,function(){
  console.log("Weather App is Running");
});

// API key
// 6847bdf3c522726958ffecd20aec17ed-us14

// list id
 // 8781cdf887
