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
        res.json(JSON.parse(data));
    });
});

// Express routing using post (create) method for API routes
app.post("/api/notes", (req, res) => {
    // assign the post request body as a variable newNote
    let newNote = req.body;
    // read the file with fs.readFile with utf-8 encoding and callback function to throw an error and return the data of db.json
    // use path.join to merge the absolute path to the main directory of server.js (__dirname) and the local path segment to db.json
    fs.readFile(path.join(__dirname + "/db/db.json"), "utf8", (err, data) => {
        // assign the parsed data as a variable noteArray
        let noteArray = JSON.parse(data);
        // assigns the the value of the request object key 'id' as the index position of the new note in the noteArray array
        req.body.id = noteArray.length;
        // 
        noteArray.push(newNote);
        console.log(noteArray);
        if (err) throw err;
        // second need to write to the file
        fs.writeFile(path.join(__dirname + "/db/db.json"), JSON.stringify(noteArray), (err) => {
            if (err) throw err;
        });
    })
    return res.json(null);
});

app.delete("/api/notes/:id", (req, res) => {
    // req.params.id will be equal to the note delete button clicked on, stored in a variable selectedNote
    let selectedNote = req.params.id;
    fs.readFile(path.join(__dirname + "/db/db.json"), "utf8", (err, data) => {
        console.log(selectedNote);
        let noteArray = JSON.parse(data);
        noteArray.splice(selectedNote, 1);

        if (err) throw err;
        fs.writeFile(path.join(__dirname + "/db/db.json"), JSON.stringify(noteArray), (err) => {
            if (err) throw err;
            console.table(noteArray)
        });
    })
});





app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});