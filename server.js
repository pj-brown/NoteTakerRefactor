// Dependency modules
var express = require("express");
var path = require("path");
var fs = require("fs");

// Create an express application by calling express()
var app = express();
// Use port 8080 to connect
var PORT = 8080;

// Middleware
// Use express to parse the incoming data to json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Express routing using get (read) method for HTML routes
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname + "/public/notes.html"));
});

// Express routing using get (read) method for API routes
app.get("/api/notes", function(req, res){})

// Express routing using post (create) method for API routes
app.post("/api/notes", function(req, res){})

app.listen(PORT, function(){
    console.log("Server is listening on PORT" , PORT);
});