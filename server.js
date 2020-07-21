const express = require("express");

const PORT = process.env.PORT || 8080;

const app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import routes and give the server access to them.
const apiRoutes = require("./controllers/notesController.js");
const htmlRoutes = require("./controllers/htmlController.js");

app.use(apiRoutes);
app.use(htmlRoutes);

app.listen(PORT, function() {
  console.log("Server now listening at localhost:" + PORT);
});