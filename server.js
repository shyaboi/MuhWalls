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
const favicon = require('serve-favicon');

app.use(favicon('./favicon.ico'));

const mongoDB = `mongodb+srv://shyaboi:${donus}@cluster0.zqw64.azure.mongodb.net/donu?retryWrites=true&w=majority`;
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
//Import the mongoose module
var mongoose = require("mongoose");

//Set up default mongoose connection
mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB Popped!"))
  .catch((err) => {
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
  upboats:Number,
  downboats:Number
});

app.use(express.static(path.join(__dirname, "img")));
app.use("/fileupload", express.static("img"));
app.use("/wallpapers", express.static("img"));
app.use("/donus", express.static("img"));
app.use("/upload", express.static("img"));
app.use("/img", express.static("img"));

app.use(express.static("public/views/layouts"));

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "./public"));
app.use(express.static(__dirname + "/public/"));
app.use(express.static(__dirname + "/public/css"));

app.get("/css/styles.css", function (req, res) {
  res.send("css/styles.css");
  res.end();
});

var arrayOfFiles = fs.readdirSync("./img");

app.get("/wallpapers", (req, res) => {
  const getAll = () => {
    MongoClient.connect(
      mongoDB,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (err, db) {
        if (err) throw err;
        var dbo = db.db("donu");
        var mysort = { upboats: -1 };
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
            res.render(`home`, {
              fileName: fileName,
            });
          });
      }
    );
  };
  getAll();
  // console.log(ok)
});


app.get("/wallpapers/topbad", (req, res) => {
  const getAll = () => {
    MongoClient.connect(
      mongoDB,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (err, db) {
        if (err) throw err;
        var dbo = db.db("donu");
        var mysort = { downboats: -1 };
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
            res.render(`home`, {
              fileName: fileName,
            });
          });
      }
    );
  };
  getAll();
  // console.log(ok)
});




app.get("/wallpapers/date", (req, res) => {
  const getAll = () => {
    MongoClient.connect(
      mongoDB,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (err, db) {
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
              fileName: fileName,
            });
          });
      }
    );
  };
  getAll();
  // console.log(ok)
});
app.get("/wallpapers/daterev", (req, res) => {
  const getAll = () => {
    MongoClient.connect(
      mongoDB,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (err, db) {
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
              fileName: fileName,
            });
          });
      }
    );
  };
  getAll();
  // console.log(ok)
});

app.get("/wallpapers/tall", (req, res) => {
  const getAll = () => {
    MongoClient.connect(
      mongoDB,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (err, db) {
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
              fileName: fileName,
            });
          });
      }
    );
  };
  getAll();
  // console.log(ok)
});

app.get("/wallpapers/small", (req, res) => {
  const getAll = () => {
    MongoClient.connect(
      mongoDB,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (err, db) {
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
              fileName: fileName,
            });
          });
      }
    );
  };
  getAll();
  // console.log(ok)
});
var bodyParser = require('body-parser'); 
const { json } = require("body-parser");
app.use(bodyParser.json()); // to support JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies
app.post("/like", (req, res) => { 
  const okis = req.body.name

  const okys = okis
    
    res.json(okys + " upvoted") ;   
    // console.log(okys)
    let q = {name:okys}

    MongoClient.connect(
      mongoDB,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (err, db) {
        if (err) throw err;
        var dbo = db.db("donu");
        dbo.collection("Wallpapers").updateOne(q, { $inc: { upboats:1} }, function (err, res) {
          if (err) throw err;
          console.log("\x1b[36m", "1 document inserted");
        });
        
      });
    db.close();

  })

app.get("/wallpapers/16:9", (req, res) => {
  const getAll = () => {
    MongoClient.connect(
      mongoDB,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (err, db) {
        if (err) throw err;
        var dbo = db.db("donu");
        var voteSort = { upboats: -1 };
        dbo
          .collection("Wallpapers")
          .find({ aspectRatio: "16:9" })
          .sort(voteSort)
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
              fileName: fileName,
            });
          });
      }
    );
  };
  getAll();
  // console.log(ok)
});

app.get("/wallpapers/UltraWide", (req, res) => {
  const getAll = () => {
    MongoClient.connect(
      mongoDB,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (err, db) {
        if (err) throw err;
        var dbo = db.db("donu");
        var voteSort = { upboats:-1 };
        dbo
          .collection("Wallpapers")
          .find({ aspectRatio: "UltraWide" })
          .sort(voteSort)
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
              fileName: fileName,
            });
          });
      }
    );
  };
  getAll();
  // console.log(ok)
});

app.get("/wallpapers/1080P", (req, res) => {
  const getAll = () => {
    MongoClient.connect(
      mongoDB,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (err, db) {
        if (err) throw err;
        var dbo = db.db("donu");
        var voteSort = { upboats: -1 };
        dbo
          .collection("Wallpapers")
          .find({ height: 1080, width: 1920 })
          .sort(voteSort)
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
              fileName: fileName,
            });
          });
      }
    );
  };
  getAll();
  // console.log(ok)
});

app.get("/wallpapers/4k", (req, res) => {
  const getAll = () => {
    MongoClient.connect(
      mongoDB,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (err, db) {
        if (err) throw err;
        var dbo = db.db("donu");
        var voteSort = { upboats: -1 };
        dbo
          .collection("Wallpapers")
          .find({ height: 2160, width: 3840 })
          .sort(voteSort)
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
              fileName: fileName,
            });
          });
      }
    );
  };
  getAll();
  // console.log(ok)
});

app.get("/wallpapers/1440P", (req, res) => {
  const getAll = () => {
    MongoClient.connect(
      mongoDB,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (err, db) {
        if (err) throw err;
        var dbo = db.db("donu");
        var voteSort = { upboats: -1 };
        dbo
          .collection("Wallpapers")
          .find({ height: 1440, width: 2560 })
          .sort(voteSort)
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
              fileName: fileName,
            });
          });
      }
    );
  };
  getAll();
  // console.log(ok)
});



// app.post(`/like`, (req, res) => {
//   var form = new formidable.IncomingForm();
//   form.parse(req, function (err, fields, files) {
//     const likeName = JSON.stringify(fields.like)
//     const ln = likeName.slice(1, -1);
//     let q = {name:ln}
//     console.log(q)
//     MongoClient.connect(
//       mongoDB,
//       { useNewUrlParser: true, useUnifiedTopology: true },
//       function (err, db) {
//         if (err) throw err;
//         var dbo = db.db("donu");
//         dbo.collection("Wallpapers").updateOne(q, { $inc: { upboats:1} }, function (err, res) {
//           if (err) throw err;
//           console.log("\x1b[36m", "1 document inserted");
//         });
        
//       });
//     }
//     );
//     db.close();
        
//  })

 app.post(`/wallpapers/dlike`, (req, res) => {
  const okis = req.body.name

  const okys = okis
    
    res.json(okys + " upvoted") ;   
    // console.log(okys)
    let q = {name:okys}

    MongoClient.connect(
      mongoDB,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (err, db) {
        if (err) throw err;
        var dbo = db.db("donu");
        dbo.collection("Wallpapers").updateOne(q, { $inc: { downboats:1} }, function (err, res) {
          if (err) throw err;
          console.log("\x1b[36m", "1 document inserted");
        });
        
      });
    db.close();
 })

   



app.post("/wallpapers/search", (req, res) => {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    let searchRaw = fields.search;
    var searchCleaned = searchRaw.replace(/[ ,]+/g, ",");
    res.redirect(`/search+${[searchCleaned]}`);
  });
});

app.get(`/wallpapers/search+:searchwords`, (req, res) => {
  let sw = req.params.searchwords;
  // console.log(sw)
  let swSplit = sw.substr(1);
  let swLower = swSplit.toLowerCase()
  // console.log(swSplit)
  let searchAr = swLower.replace(/[ ,]+/g, ",");
  // console.log(searchAr)
  let searchArr = searchAr.split(",");
  const searchArrayClone = searchArr.map((thing) => {
    thing + "s";
    return thing;
  });
  console.log(searchArrayClone);
  // res.write(`${searchArr}`)
  const getAll = () => {
    // console.log(searchArr)
    MongoClient.connect(
      mongoDB,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (err, db) {
        if (err) throw err;
        var dbo = db.db("donu");
        var keySearch = { name: 1 };
        // ------------------------------------------ search array raw params
        let ar1 = searchArrayClone[0], ar2 = searchArrayClone[1],ar3 = searchArrayClone[2],ar4 = searchArrayClone[3],ar5 = searchArrayClone[4],ar6 = searchArrayClone[5],ar7 = searchArrayClone[6],ar8 = searchArrayClone[7],ar9 = searchArrayClone[8],ar10 = searchArrayClone[9];
        // ------------------------------------------ search array raw params




        // ---------------------------------------------------------search check and slice
        if (ar2 === undefined || ar2 === null) {
          console.log("free search fields sp2")
        }else{
        const last2 = ar2.length - 1;
        const charChex2= ar2.charAt(last2)
        console.log(charChex2)
      if (charChex2 === "s") {var sl2 = ar2.slice(0, -1); console.log(sl2)}
      }

        if (ar3 === undefined || ar3 === null) {
          console.log("free search fields sp3")
        }else{
        const last3 = ar3.length - 1;
        const charChex3= ar3.charAt(last3)
        console.log(charChex3); if (charChex3 === "s") {var sl3 = ar3.slice(0, -1); console.log(sl3)}}

        if (ar4 === undefined || ar4 === null) {
          console.log("free search fields sp4")
        }else{
        const last4 = ar4.length - 1;
        const charChex4= ar4.charAt(last4)
        console.log(charChex4); if (charChex4 === "s") {var sl4 = ar4.slice(0, -1); console.log(sl4)}}

        if (ar5 === undefined || ar5 === null) {
          console.log("free search fields sp5")
        }else{
        const last5 = ar5.length - 1;
        const charChex5= ar5.charAt(last5)
        console.log(charChex5); if (charChex5 === "s") {var sl5 = ar5.slice(0, -1); console.log(sl5)}}

        if (ar6 === undefined || ar6 === null) {
          console.log("free search fields sp6")
        }else{
        const last6 = ar6.length - 1;
        const charChex6= ar6.charAt(last6)
        console.log(charChex6); if (charChex6 === "s") {var sl6 = ar6.slice(0, -1); console.log(sl6)}}

        if (ar7 === undefined || ar7 === null) {
          console.log("free search fields sp7")
        }else{
        const last7 = ar7.length - 1;
        const charChex7= ar7.charAt(last7)
        console.log(charChex7); if (charChex7 === "s") {var sl7 = ar7.slice(0, -1); console.log(sl7)}}

        if (ar8 === undefined || ar8 === null) {
          console.log("free search fields sp8")
        }else{
        const last8 = ar8.length - 1;
        const charChex8= ar8.charAt(last8)
        console.log(charChex8); if (charChex8 === "s") {var sl8 = ar8.slice(0, -1); console.log(sl8)}}

        if (ar9 === undefined || ar9 === null) {
          console.log("free search fields sp9")
        }else{
        const last3 = ar9.length - 1;
        const charChex9= ar9.charAt(last9)
        console.log(charChex9); if (charChex9 === "s") {var sl9 = ar9.slice(0, -1); console.log(sl9)}}

        if (ar10 === undefined || ar10 === null) {
          console.log("free search fields sp10")
        }else{
        const last10 = ar10.length - 1;
        const charChex10= ar10.charAt(last10)
        console.log(charChex10); if (charChex10s === "s") {var sl10s = ar10s.slice(0, -1); console.log(sl10s)}}

        // ---------------------------------------------------------s check and slice

        dbo
          .collection("Wallpapers")
          .find({
            keywords: {
              $in: [
                ar1,ar1 + "s" || "S",ar1.slice(0, -1),
                ar2,ar2 + "s" || "S",sl2,
                ar3,ar3 + "s" || "S",
                ar4,ar4 + "s" || "S",
                ar5,ar5 + "s" || "S",
                ar6,ar6 + "s" || "S",
                ar7,ar7 + "s" || "S",
                ar8,ar8 + "s" || "S",
                ar9,ar9 + "s" || "S",
                ar10, ar10 + "s" || "S"
              ],
            },
          })
          .sort(keySearch)
          .toArray(function (err, result) {
            if (err) throw err;
            // for (let i = 0; i < result.length; i++) {
            //   const all = result[i];
            // console.log("\x1b[35m", element.name);
            // var getAl = all.name
            // console.log(result);
            const results = result.map((wall) => {
              return wall;
            });

            const fileName = results;
            // }
            db.close();
            res.render("home", {
              fileName: fileName,
            });
          });
      }
    );
  };
  getAll();
});

app.get("/wallpapers/img+:keyword?", function (req, res) {
  let keyParam = req.params.keyword;

  const getAll = () => {
    MongoClient.connect(
      mongoDB,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (err, db) {
        keyP = keyParam.substr(1);
        if (err) throw err;
        var dbo = db.db("donu");
        var keySearch = { upboats: -1 };
        dbo
          .collection("Wallpapers")
          .find({
            $or: [{ keywords: keyP }, { newName: keyP }, { aspectRatio: keyP }],
          })
          .sort(keySearch)
          .toArray(function (err, result) {
            if (err) throw err;
            // for (let i = 0; i < result.length; i++) {
            //   const all = result[i];
            // console.log("\x1b[35m", element.name);
            // var getAl = all.name
            // console.log(result);
            const results = result.map((wall) => {
              return wall;
            });

            const fileName = results;
            // }
            db.close();
            res.render("home", {
              fileName: fileName,
            });
          });
      }
    );
  };
  getAll();
});

router.get(["/wallpapers/", "/wallpapers//*"], function (req, res, next) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/upload", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write('<link rel="stylesheet" href="/style.css">');

  res.write(
    '<form action="fileupload" id="upladContainer" method="post" enctype="multipart/form-data">'
  );
  res.write('<input type="file" name="filetoupload" id="fileChooseButt"><br>');
  res.write(
    `what do you call this wallpaper?<input type="text" name="newName"  id="nameInput" value="" /> <br>`
  );
  res.write(
    `input keywords<textarea type="text" name="keywords" id="keyBox" value=""></textarea> <br>`
  );
  res.write('<input type="submit" id="upladButt" value="Uplad"></input>');
  res.write("</form>");
  return res.end();
});

app.get("/wallpapers/piclike", (req, res) => {
  // console.log(req.query.name)
  const wallVoteName = req.query.name

  MongoClient.connect(
    mongoDB,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err, db) {
      if (err) throw err;
      var dbo = db.db("donu");
      var mysort = { upboats: -1 };
      dbo
        .collection("Wallpapers")
        .find({name:wallVoteName})
        .sort(mysort)
        .toArray(function (err, result) {
          if (err) throw err;
          // const results = result.map((wall) => {
          //   return wall;
          // });
          const upvotes = result[0].upboats
          console.log(result[0].upboats)
  res.json(upvotes);
});
})})

app.get("/wallpapers/picdLike", (req, res) => {
  // console.log(req.query.name)
  const wallVoteName = req.query.name

  MongoClient.connect(
    mongoDB,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err, db) {
      if (err) throw err;
      var dbo = db.db("donu");
      var mysort = { downboats: -1 };
      dbo
        .collection("Wallpapers")
        .find({name:wallVoteName})
        .sort(mysort)
        .toArray(function (err, result) {
          if (err) throw err;
          // const results = result.map((wall) => {
          //   return wall;
          // });
          const upvotes = result[0].downboats
          console.log(result[0].downboats)
  res.json(upvotes);
});
})})

app.get("/wallpapers/toobig", (req, res) => {
  res.write(`<script> var player =  iframe.getElementById('player');
  player.mute();</script><h1>File too big, please limit files to less than 5mb</h1> <br><video loop class= width="auto" height="auto" poster="https://y.yarn.co/423fbe7f-0628-4dac-80fe-5c93979346e9_screenshot.jpg" autoplay="autoplay">
  <source id="" class="realsource" src="https://y.yarn.co/423fbe7f-0628-4dac-80fe-5c93979346e9.mp4?1596238325334" type="video/mp4">
</video><br> <h1><a href="/upload">Back to uploads page.</a></h1>`);
  return res.end();
});

app.listen(exPORT);
console.log("Server Started on " + exPORT);

app.get("*", (rq, rs) => {
  rs.send(
    `<h1 id=404 style="color:red">${rq.url}  doesnt exist; <br> 404 son</h1>`
  );
});

var counter = 0;
app
  .post("/wallpapers/upload/fileupload", function (req, res) {
    // date stamp var
    //  console.log(req);

    if (req.url == "/wallpapers/upload/fileupload") {
      var d = new Date();
      const y = d.getFullYear();
      var m = d.getMonth() + 1;
      let dd = d.getDate();
      let h = d.getHours();
      let mm = d.getMinutes();
      let s = d.getSeconds();

      if (m < 10) {
        m = "" + 0 + m;
      }
      if (dd < 10) {
        dd = "" + 0 + dd;
      }
      if (h < 10) {
        h = "" + 0 + h;
      }
      if (mm < 10) {
        mm = "" + 0 + mm;
      }
      if (s < 10) {
        s = "" + 0 + s;
      }
      const time = h + ":" + mm + ";" + s;
      var form = new formidable.IncomingForm();
      form.parse(req, function (err, fields, files) {
        const fileSize = form._fileSize;
        counter++;
        if (fileSize > 5242880) {
          // console.log("big");
          res.redirect("/toobig");
        } else {
          var oldpath = files.filetoupload.path;
          // console.log(oldpath);

          var newpath =
            "./img/" +
            "Walls" +
            counter +
            files.filetoupload.name.replace(/ |,|([()])|/g, "");
          // console.log(newpath);
          let nam = fields.newName.toLowerCase();
          let kW = fields.keywords.toLowerCase();
          
          fs.copyFile(oldpath, newpath, function (err) {
            path.dirname("./img/");
            if (err) throw err;
            var newSlice = newpath.slice(5);
            var Model = mongoose.model("picModel", picModel);
            var dinus = newSlice.slice(1);
            // Create an instance of model Model
            var sizeOf = require("image-size");
            var dimensions = sizeOf("./img" + newSlice);
            // console.log(dimensions.width, dimensions.height);
            let aR = dimensions.width / dimensions.height;
            let aRR = Math.round(100 * aR) / 100;
            keySpace = kW.replace(/[ ,]+/g, ",");
            let keyArr = keySpace.split(",");
            // console.log(keyArr)
            if (aRR === 1.78) {
              aRR = "16:9";
            }
            if (aRR >= 2.3) {
              aRR = "UltraWide";
            }
            var mongoModle = new Model({
              name: dinus,
              newName: nam,
              link: newSlice,
              date: y + "/" + m + "/" + dd + "|" + time,
              width: dimensions.width,
              height: dimensions.height,
              aspectRatio: aRR,
              keywords: keyArr,
              id: counter,
              upboats:0,
              downboats:0,
            });
            MongoClient.connect(
              mongoDB,
              { useNewUrlParser: true, useUnifiedTopology: true },
              function (err, db) {
                if (err) throw err;
                var dbo = db.db("donu");
                var myobj = mongoModle;
                dbo
                  .collection("Wallpapers")
                  .insertOne(myobj, function (err, res) {
                    if (err) throw err;
                    console.log("\x1b[36m", "1 document inserted");
                    db.close();
                  });
              }
            );
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
<a href="/wallpapers/">homepage</a> 
soon mate!</h2> <div id="newSlice">
<img id="upPic" src=${newSlice}><a href=${newSlice}>${dinus}</a></img><br>Resolution: ${
                  dimensions.width + "x" + dimensions.height
                }
</body>
</html>
`
            );

            res.end();
          });
        }
      });
    }
  })
  .listen(PORT);

console.log("Server Started on " + PORT);
