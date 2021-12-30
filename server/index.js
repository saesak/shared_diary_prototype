//node js backend server

// just do node index.js to start the server 

const express = require("express");
const path = require('path'); //imports path nodejs library which is naturally included

const PORT = 4444;

const app = express();

app.use(express.static(path.resolve(__dirname, '../build'))); //this forces it to use the built static webpage from npm run build 

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});