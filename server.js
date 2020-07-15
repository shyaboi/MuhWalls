var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var express = require('express')
var app = express()
var router = express.Router();
const {MongoClient} = require('mongodb');
var PORT = process.env.port || 4000;
const homePORT = process.env.PORT || 3000
const exPORT = process.env.PORT || 8080
require('dotenv').config();
const donus = process.env.MONGO_THING


async function main(){
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */
  const uri = `mongodb+srv://shyaboi:${donus}@wallpapercluster.zqw64.mongodb.net/test?retryWrites=true&w=majority`;


  const client = new MongoClient(uri);

  try {
      // Connect to the MongoDB cluster
      await client.connect();
      async function listDatabases(client){
        databasesList = await client.db().admin().listDatabases();
     
        console.log("Databases:");
        databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    };
     
      // Make the appropriate DB calls
      await  listDatabases(client);

  } catch (e) {
      console.error(e);
  } finally {
      await client.close();
  }
}

main().catch(console.error);
// app.use(express.static(path.join(__dirname, 'build')))
app.use(express.static(path.join(__dirname, 'img')))
app.use('/fileupload', express.static('img'))
app.use(express.static(__dirname + '/public'));
const testFolder = 'img';

fs.readdir(testFolder, (err, files) => {
 
    console.log(files);
  
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

router.get(['/', '//*'], function(req, res, next) {
  res.sendFile(path.join(__dirname, 'index.html'));
 });
// app.get('/', (req, res) => {
//   res.redirect('http://localhost:'+homePORT)
// })


app.get('/upload', (req, res) => {
 res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
  res.write('<input type="file" name="filetoupload"><br>');
  res.write('<input type="submit">dangus</input>');
  res.write('</form>');
  return res.end();
})

app.get('/donus', (req,res) =>{
  res.send('bigoofs')
});


app.listen(exPORT)
console.log("Server Started on " + exPORT)


  
  // const arrayOfFiles = fs.readdirSync("../FileServer/img")
  // var fs = require('fs');



let counter = 0
app.post("/fileupload", function (req, res) {
    // date stamp var
    var date = new Date(Date.now())
      //  console.log(req);
      
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      counter++
      var oldpath = files.filetoupload.path;
      console.log(oldpath);
      var newpath = "../FileServer/img/"+'Walls' + counter + files.filetoupload.name;
      // console.log(newpath);
      fs.rename(oldpath, newpath, function (err) {
        path.dirname("FileServer/img/")
        if (err) throw err;
        var newSlice = newpath.slice(17);
        console.log(newSlice)
        res.write(`
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel='stylesheet' href='/style.css' />
</head>
<body>
<h1><a href="/">home</a></h1>` + `<h2>Your wallpaper has been uploaded, it will show up on the 
<a href="https://dinguswallpapermassiv.herokuapp.com/">homepage</a> 
in yonks mate!</h2> <div id="newSlice">
<img src=${newSlice}><a href=${newSlice}>lank</a></img>
</body>
</html>
`);

        
        res.end();
      });
    });
    
    
  } else {
    
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(PORT);




console.log("Server Started on " + PORT);
