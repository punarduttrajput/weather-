const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}))



app.post("/", function(req, res) {

  const apiKey = "30812ebad7cf44a03176145a84c70a51";
  const longitude = req.body.lat1;
  const lattitude = req.body.lon1;

  const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lattitude + "&lon=" + longitude + "&appid=" + apiKey;

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const hexData = JSON.parse(data);

      const lon = hexData.coord.lon;
      const lat = hexData.coord.lat;
      const con = hexData.sys.country;
      const timeZone = hexData.timezone;
      const icon = hexData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      console.log(lon);
      console.log(lat);
      console.log(con);
      console.log(timeZone);
      console.log(imageURL);
      res.writeHead(200, {'Content-Type':'text/html'});
      res.write('<h3>The country code is: '+con+' at longitude: '+lon+' and lattitude '+lat+' and Time Zone is:'+timeZone+'</h3>');
      res.write("<img src="+imageURL+">")
      res.send();
    })

  })

})

app.use(express.static(__dirname));

app.get("/", function(req, res) {

  res.sendFile(__dirname + "/index.html")
})


app.listen(3000, function() {
  console.log("Server is running on port 3000");
})
