// Dependency modules
const express = require("express");
const path = require("path");
const fs = require("fs");

// Create an express application by calling express()
const app = express();
// Use port 8080 to connect locally. Use process.env.PORT to listen to the port that Heroku is using
const PORT = process.env.PORT || 8080;

// Middleware
// Use express to parse the incoming data to json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Use express erve your static files so they can be used in html files and routing
app.use(express.static("public")); 
app.use(express.static("db")); 


// Express routing using get (read) method for HTML routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/notes.html"));
});

// Express routing using get (read) method for API routes
app.get("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname + "/db/db.json"), "utf8", (err, data) => {
        if (err) throw err;
        return res.json(JSON.parse(data));
    });
});

// Express routing using post (create) method for API routes
app.post("/api/notes", (req, res) => {
    let newNote = req.body;
    console.log(newNote)

    fs.readFile(path.join(__dirname + "/db/db.json"), "utf8", (err, data) => {
        let noteArray = JSON.parse(data);
        noteArray.push(newNote);
        console.log(noteArray);
        if (err) throw err;

        fs.writeFile(path.join(__dirname + "/db/db.json"), JSON.stringify(noteArray), (err) => {
            if (err) throw err;

        });
    })
    return res.json(null);
});


app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});