//node js backend server

// just do node index.js to start the server 

const express = require("express");
const path = require("path")
var mysql = require('mysql');
const buffer = require("buffer")

//sql
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "MySQLPass1515?",
  database: "shared_diary"
});
con.connect(function(err) {
  if (err) throw err;
  console.log("SQL DB Connected!");
});



//express settings
const PORT = 4444;
const app = express();
app.use(express.static(path.resolve(__dirname, '../build'))); //this forces it to use the built static webpage from npm run build 
app.use(express.json())


//post method
app.post("/save", (req, res) => {
  var msg = req.body


  //convert canvas to blob
  var blob = new buffer.Blob([JSON.stringify(msg.canvas)], {
    type: 'application/json'
  })
  
  var sqlQuery = 'INSERT INTO `entries` SET ?;'
  var values = {
    title: msg.title, 
    date: msg.date, 
    canvas: blob, 
    text: msg.text
  }
  console.log(values)

  con.query(sqlQuery, values, function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows)

    if (!err) {
      res.sendStatus(200);
    }
  })

  
  console.log('got message')
});

//get method
app.get("/retrieve", (req, res) => {

  var sqlQuery = 'Select title, date from entries'
  
  con.query(sqlQuery, function (err, result, fields) {
    if (err) throw err;
    
    var selected = JSON.stringify(result)

    res.send(selected)
  })

  console.log('sent entry list')
})

//initialize server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});