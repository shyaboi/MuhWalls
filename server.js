var http = require("http");
var formidable = require("formidable");
var fs = require("fs");
var path = require("path");
var express = require("express");
var app = express();
var router = express.Router();
const { MongoClient } = require("mongodb");
var PORT = process.env.port || 4000;
const exPORT = process.env.PORT || 8080;
require("dotenv").config();
const donus = process.env.MONGO_THING;
var fs = require("fs");
 


exports.arrayOfFiles = arrayOfFiles;
const mongoDB = `mongodb+srv://shyaboi:${donus}@cluster0.zqw64.azure.mongodb.net/donu?retryWrites=true&w=majority`;
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
//Import the mongoose module
var mongoose = require("mongoose");

//Set up default mongoose connection
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('DB Popped!'))
.catch(err => {
console.log(err);
});

//Get the default connection
var db = mongoose.connection;
var Schema = mongoose.Schema;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));


var picModel = new Schema({
  name: String,
  newName: String,
  link: String,
  date: String,
  width: Number,
  height: Number,
  aspectRatio: String,
  keywords: Array,
  id: Number,
});

// Save the new model instance, passing a callback

app.use(express.static(path.join(__dirname, "img")));
app.use("/fileupload", express.static("img"));
app.use("/donus", express.static("img"));
app.use("/upload", express.static("img"));
app.use("/img", express.static("img"));


app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "./public"));
app.use(express.static(__dirname + "/public/css"));

app.get("/css/styles.css", function (req, res) {
  res.send("css/styles.css");
  res.end();
});

var arrayOfFiles = fs.readdirSync("./img");

app.get("/", (req, res) => {
  const getAll = () => {
    MongoClient.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
      if (err) throw err;
      var dbo = db.db("donu");
      var mysort = { name: 1 };
      dbo
        .collection("Wallpapers")
        .find({})
        .sort(mysort)
        .toArray(function (err, result) {
          if (err) throw err;
          // for (let i = 0; i < result.length; i++) {
          //   const all = result[i];
          // console.log("\x1b[35m", element.name);
          // var getAl = all.name
          // console.log(getAl)
          const results = result.map((wall) => {
            return wall;
          });

          const fileName = results;
          // }
          db.close();
          res.render("home", { 
            fileName: fileName
           });
        });
    })
  };
  getAll();
  // console.log(ok)

});

app.get("/date", (req, res) => {
  const getAll = () => {
    MongoClient.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
      if (err) throw err;
      var dbo = db.db("donu");
      var dateSort = { date: 1 };
      dbo
        .collection("Wallpapers")
        .find({})
        .sort(dateSort)
        .toArray(function (err, result) {
          if (err) throw err;
          // for (let i = 0; i < result.length; i++) {
          //   const all = result[i];
          // console.log("\x1b[35m", element.name);
          // var getAl = all.name
          // console.log(getAl)
          const results = result.map((wall) => {
            return wall;
          });

          const fileName = results;
          // }
          db.close();
          res.render("home", { 
            fileName: fileName
           });
        });
    })
  };
  getAll();
  // console.log(ok)

})
app.get("/daterev", (req, res) => {
  const getAll = () => {
    MongoClient.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
      if (err) throw err;
      var dbo = db.db("donu");
      var dateSort = { date: -1 };
      dbo
        .collection("Wallpapers")
        .find({})
        .sort(dateSort)
        .toArray(function (err, result) {
          if (err) throw err;
          // for (let i = 0; i < result.length; i++) {
          //   const all = result[i];
          // console.log("\x1b[35m", element.name);
          // var getAl = all.name
          // console.log(getAl)
          const results = result.map((wall) => {
            return wall;
          });

          const fileName = results;
          // }
          db.close();
          res.render("home", { 
            fileName: fileName
           });
        });
    });
  };
  getAll();
  // console.log(ok)

});

app.get("/tall", (req, res) => {
  const getAll = () => {
    MongoClient.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
      if (err) throw err;
      var dbo = db.db("donu");
      var dateSort = { height: -1 };
      dbo
        .collection("Wallpapers")
        .find({})
        .sort(dateSort)
        .toArray(function (err, result) {
          if (err) throw err;
          // for (let i = 0; i < result.length; i++) {
          //   const all = result[i];
          // console.log("\x1b[35m", element.name);
          // var getAl = all.name
          // console.log(getAl)
          const results = result.map((wall) => {
            return wall;
          });

          const fileName = results;
          // }
          db.close();
          res.render("home", { 
            fileName: fileName
           });
        });
    });
  };
  getAll();
  // console.log(ok)

});

app.get("/small", (req, res) => {
  const getAll = () => {
    MongoClient.connect(mongoDB,{ useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
      if (err) throw err;
      var dbo = db.db("donu");
      var dateSort = { height: 1 };
      dbo
        .collection("Wallpapers")
        .find({})
        .sort(dateSort)
        .toArray(function (err, result) {
          if (err) throw err;
          // for (let i = 0; i < result.length; i++) {
          //   const all = result[i];
          // console.log("\x1b[35m", element.name);
          // var getAl = all.name
          // console.log(getAl)
          const results = result.map((wall) => {
            return wall;
          });

          const fileName = results;
          // }
          db.close();
          res.render("home", { 
            fileName: fileName
           });
        });
    });
  };
  getAll();
  // console.log(ok)

});

app.get("/16:9", (req, res) => {
  const getAll = () => {
    MongoClient.connect(mongoDB,{ useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
      if (err) throw err;
      var dbo = db.db("donu");
      var heightSort =  { name: 1 };
      dbo
        .collection("Wallpapers")
        .find({aspectRatio: "16:9"})
        .sort(heightSort)
        .toArray(function (err, result) {
          if (err) throw err;
          // for (let i = 0; i < result.length; i++) {
          //   const all = result[i];
          // console.log("\x1b[35m", element.name);
          // var getAl = all.name
          // console.log(getAl)
          const results = result.map((wall) => {
            return wall;
          });

          const fileName = results;
          // }
          db.close();
          res.render("home", { 
            fileName: fileName
           });
        });
    });
  };
  getAll();
  // console.log(ok)

});

app.get("/UltraWide", (req, res) => {
  const getAll = () => {
    MongoClient.connect(mongoDB,{ useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
      if (err) throw err;
      var dbo = db.db("donu");
      var heightSort =  { name: 1 };
      dbo
        .collection("Wallpapers")
        .find({aspectRatio: "UltraWide"})
        .sort(heightSort)
        .toArray(function (err, result) {
          if (err) throw err;
          // for (let i = 0; i < result.length; i++) {
          //   const all = result[i];
          // console.log("\x1b[35m", element.name);
          // var getAl = all.name
          // console.log(getAl)
          const results = result.map((wall) => {
            return wall;
          });

          const fileName = results;
          // }
          db.close();
          res.render("home", { 
            fileName: fileName
           });
        });
    });
  };
  getAll();
  // console.log(ok)

});

app.get("/1080P", (req, res) => {
  const getAll = () => {
    MongoClient.connect(mongoDB,{ useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
      if (err) throw err;
      var dbo = db.db("donu");
      var heightSort =  { name: 1 };
      dbo
        .collection("Wallpapers")
        .find({height: 1080, width: 1920})
        .sort(heightSort)
        .toArray(function (err, result) {
          if (err) throw err;
          // for (let i = 0; i < result.length; i++) {
          //   const all = result[i];
          // console.log("\x1b[35m", element.name);
          // var getAl = all.name
          // console.log(getAl)
          const results = result.map((wall) => {
            return wall;
          });

          const fileName = results;
          // }
          db.close();
          res.render("home", { 
            fileName: fileName
           });
        });
    });
  };
  getAll();
  // console.log(ok)

});

app.get("/4k", (req, res) => {
  const getAll = () => {
    MongoClient.connect(mongoDB,{ useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
      if (err) throw err;
      var dbo = db.db("donu");
      var heightSort =  { name: 1 };
      dbo
        .collection("Wallpapers")
        .find({height: 2160, width: 3840})
        .sort(heightSort)
        .toArray(function (err, result) {
          if (err) throw err;
          // for (let i = 0; i < result.length; i++) {
          //   const all = result[i];
          // console.log("\x1b[35m", element.name);
          // var getAl = all.name
          // console.log(getAl)
          const results = result.map((wall) => {
            return wall;
          });

          const fileName = results;
          // }
          db.close();
          res.render("home", { 
            fileName: fileName
           });
        });
    });
  };
  getAll();
  // console.log(ok)

});


app.get("/1440P", (req, res) => {
  const getAll = () => {
    MongoClient.connect(mongoDB,{ useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
      if (err) throw err;
      var dbo = db.db("donu");
      var heightSort =  { name: 1 };
      dbo
        .collection("Wallpapers")
        .find({height: 1440, width: 2560})
        .sort(heightSort)
        .toArray(function (err, result) {
          if (err) throw err;
          // for (let i = 0; i < result.length; i++) {
          //   const all = result[i];
          // console.log("\x1b[35m", element.name);
          // var getAl = all.name
          // console.log(getAl)
          const results = result.map((wall) => {
            return wall;
          });

          const fileName = results;
          // }
          db.close();
          res.render("home", { 
            fileName: fileName
           });
        });
    });
  };
  getAll();
  // console.log(ok)

});


app.get('/img/:keyword', function (req, res) {
  let keyParam = req.params.keyword
  
  const getAll = () => {
    MongoClient.connect(mongoDB,{ useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
      // console.log(keyParam)
      if (err) throw err;
      var dbo = db.db("donu");
      var  keySearch =  { name: 1 };
      dbo
        .collection("Wallpapers")
        .find({
          keywords: keyParam
        })
        .sort(keySearch)
        .toArray(function (err, result) {
          if (err) throw err;
          // for (let i = 0; i < result.length; i++) {
          //   const all = result[i];
          // console.log("\x1b[35m", element.name);
          // var getAl = all.name
          console.log(result)
          const results = result.map((wall) => {
            return wall;
          });

          const fileName = results;
          // }
          db.close();
          res.render("home", { 
            fileName: fileName
           });
        });
    });
  };
  getAll();
});


router.get(["/", "//*"], function (req, res, next) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/upload", (req, res) => {

  res.writeHead(200, { "Content-Type": "text/html" });
  res.write('<link rel="stylesheet" href="/style.css">');

  res.write(
    '<form action="fileupload" id="upladContainer" method="post" enctype="multipart/form-data">'
  );
  res.write('<input type="file" name="filetoupload" id="fileChooseButt"><br>');
  res.write(`what do you call this wallpaper?<input type="text" name="newName"  id="nameInput" value="" /> <br>`)
  res.write(`input keywords<textarea type="text" name="keywords" id="keyBox" value=""></textarea> <br>`)
  res.write('<input type="submit" id="upladButt" value="Uplad"></input>');
  res.write("</form>");
  return res.end();
});

app.get("/donus", (req, res) => {
  res.json(`${arrayOfFiles}`);
});

app.listen(exPORT);
console.log("Server Started on " + exPORT);

app.get("*", (rq, rs)=> {rs.send(`<h1 id=404 style="color:red">${rq.url}  doesnt exist; <br> 404 son</h1>`)})

var counter = 0;
app
  .post("/upload/fileupload", function (req, res) {
    // date stamp var
    //  console.log(req);
    
    if (req.url == "/upload/fileupload") {
      var d = new Date();
      const y = d.getFullYear()
      var m = d.getMonth()+1
      let dd = d.getDate()
      let h = d.getHours()
      let mm = d.getMinutes()
      let s = d.getSeconds()
      
      if (m<10 ) {
        m=""+0+m
      }
      if (dd<10 ) {
        dd=""+0+dd
      } 
      if (h<10 ) {
        h=""+0+h
      }
      if (mm<10 ) {
        mm=""+0+mm
      }
      if (s<10 ) {
        s=""+0+s
      }
      const time = h +":"+ mm+";" + s
      var form = new formidable.IncomingForm();
      form.uploadDir='tmp';
      form.parse(req, function (err, fields, files) {
        counter++;
        var oldpath = files.filetoupload.path
        console.log(oldpath);
        var newpath = "./img/" + "Walls" + counter + files.filetoupload.name.replace(/ |,|([()])|/g, "");;
        // console.log(newpath);
        let nam = fields.newName
        let kW = fields.keywords
        fs.rename(oldpath, newpath, function (err) {
          path.dirname("./img/");
          if (err) throw err;
          var newSlice = newpath.slice(5);
          var Model = mongoose.model("picModel", picModel);
          var dinus = newSlice.slice(1);
          // Create an instance of model Model
          var sizeOf = require('image-size');
          var dimensions = sizeOf('./img'+newSlice);
          console.log(dimensions.width, dimensions.height);
          let aR =  dimensions.width / dimensions.height 
          let aRR = Math.round(100*aR)/100
          keySpace = kW.replace(/\s/g, '');
          let keyArr = keySpace.split(',');
          // console.log(keyArr)
          if (aRR === 1.78){
            aRR = "16:9"
          }
          if (aRR >= 2.3){
            aRR = "UltraWide"
          }
          var mongoModle = new Model({
            name: dinus,
            newName: nam,
            link: newSlice,
            date: y+"/"+m+"/"+dd+"|"+time,
            width: dimensions.width,
            height: dimensions.height,
            aspectRatio: aRR,
            keywords: keyArr,
            id: counter,
          });
          MongoClient.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("donu");
            var myobj = mongoModle;
            dbo.collection("Wallpapers").insertOne(myobj, function (err, res) {
              if (err) throw err;
              console.log("\x1b[36m", "1 document inserted");
              db.close();
            });
          });
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
soon mate!</h2> <div id="newSlice">
<img id="upPic" src=${newSlice}><a href=${newSlice}>${dinus}</a></img><br>Resolution: ${dimensions.width+"x"+dimensions.height}
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
