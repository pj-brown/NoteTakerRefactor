// Dependency modules
const express = require("express");
const path = require("path");
const fs = require("fs");

// Create an express application by calling express()
const app = express();
// Use port 8080 to connect
const PORT = 8080;

// Middleware
// Use express to parse the incoming data to json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public")); // very important to serve your static files (css & js) from the public directory


// Express routing using get (read) method for HTML routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/notes.html"));
});

// Express routing using get (read) method for API routes
app.get("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname + "/db/db.json"),  "utf8", (err, data) => {
        if (err) throw err;
        return res.json(JSON.parse(data));
    });
});

// Express routing using post (create) method for API routes
app.post("/api/notes", (req, res) => {
    fs.writeFile(path.join(__dirname + "/db/db.json"), "utf8", JSON.stringify(data), err => {
        if (err) throw err;
    });
});

app.listen(PORT, function(){
    console.log("Server is listening on PORT" , PORT);
});