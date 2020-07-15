var http = require("http");
var formidable = require("formidable");
var fs = require("fs");
var path = require("path");
var express = require("express");
var app = express();
var router = express.Router();
const { MongoClient } = require("mongodb");
var PORT = process.env.port || 4000;
const homePORT = process.env.PORT || 3000;
const exPORT = process.env.PORT || 8080;
require("dotenv").config();
const donus = process.env.MONGO_THING;
// const uri = `mongodb+srv://shyaboi:${donus}@wallpapercluster.zqw64.mongodb.net/test?retryWrites=true&w=majority`;
const mongoDB = `mongodb+srv://shyaboi:${donus}@wallpapercluster.zqw64.mongodb.net/doonus?retryWrites=true&w=majority`;

//Import the mongoose module
var mongoose = require("mongoose");

//Set up default mongoose connection
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));
var Schema = mongoose.Schema;

var fileArray = new Schema({
  bank:Array
});



var picModel = new Schema({
  name: String,
  link: String,
  id: Number
});

// Save the new model instance, passing a callback
// app.use(express.static(path.join(__dirname, 'build')))
app.use(express.static(path.join(__dirname, "img")));
app.use("/fileupload", express.static("img"));
app.use(express.static(__dirname + "/public"));
const testFolder = "img";

// fs.readdir(testFolder, (err, files) => {
//   var SomeModel = mongoose.model("fileArray", fileArray);
//   // Create an instance of model SomeModel
//   var awesome_instance = new SomeModel({
//     bank: files,
//   });
//   awesome_instance.update();
//   // console.log(files);
// });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

router.get(["/", "//*"], function (req, res, next) {
  res.sendFile(path.join(__dirname, "index.html"));
});
// app.get('/', (req, res) => {
//   res.redirect('http://localhost:'+homePORT)
// })

app.get("/upload", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write('<link rel="stylesheet" href="style.css">');

  res.write(
    '<form action="fileupload" id="upladContainer" method="post" enctype="multipart/form-data">'
  );
  res.write(
    '<input type="file" name="filetoupload" id="fileChooseButt"><br>'
  );
  res.write('<input type="submit" id="upladButt" value="Uplad"></input>');
  res.write("</form>");

  return res.end();
});

app.get("/donus", (req, res) => {
  res.send("bigoofs");
});

app.listen(exPORT);
console.log("Server Started on " + exPORT);

// const arrayOfFiles = fs.readdirSync("../FileServer/img")
// var fs = require('fs');

var counter = 0;
app
  .post("/fileupload", function (req, res) {
    // date stamp var
    var date = new Date(Date.now());
    //  console.log(req);

    if (req.url == "/fileupload") {
      var form = new formidable.IncomingForm();
      form.parse(req, function (err, fields, files) {
        counter++;
        var oldpath = files.filetoupload.path;
        console.log(oldpath);
        var newpath = "./img/" + "Walls" + counter + files.filetoupload.name;
        // console.log(newpath);
        fs.rename(oldpath, newpath, function (err) {
          path.dirname("./img/");
          if (err) throw err;
          var newSlice = newpath.slice(5);
          console.log(newSlice);
          var SomeModel = mongoose.model("picModel", picModel);
          var dinus = newSlice.slice(1);
          console.log(dinus);
          // Create an instance of model SomeModel
          var awesome_instance = new SomeModel({
            name: dinus,
            link: newSlice,
            id:counter
          });
          var bynus = mongoose.model("fileArray", fileArray);

        

          bynus.update(
            {$push:{bank:newSlice}}, 
            function(err, res){
            console.log('bank updated')
          });
          awesome_instance.save();
          res.write(
            `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel='stylesheet' href='/style.css' />
</head>
<body>
<h1><a href="/">home</a></h1>` +
              `<h2>Your wallpaper has been uploaded, it will show up on the 
<a href="https://dinguswallpapermassiv.herokuapp.com/">homepage</a> 
in yonks mate!</h2> <div id="newSlice">
<img src=${newSlice}><a href=${newSlice}>${dinus}+${counter}</a></img>
</body>
</html>
`
          );

          res.end();
        });
      });
    }
  })
  .listen(PORT);

console.log("Server Started on " + PORT);
