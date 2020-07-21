const express = require('express');
const router = express.Router();
const cat = require("../models/cat.js");

//1)
router.get("/api/cats", (req, res) => {
  //2)
  cat.selectAll()
  //5)
  .then(results => res.json(results))
  .catch(err => res.json(err))

  // this.connection.query('SELECT * FROM  cats')
  //   .then(results => res.json(results))
});

// utilizing the express router object to declare a post route on /api/cats
// req and res are fed their values via express
router.post("/api/cats", (req, res) => {
  // reference the cat model and invoke the .create() method and we pass in 2 arguments
  cat.create(["name", 'hungry'], [req.body.name, req.body.hungry])
  .then(result => res.json({ id: result.insertId }))
  .catch(err => res.json(err))
});

router.put("/api/cats/:id", (req, res) => {
  const { hungry } = req.body;
  const { id } = req.params;

  cat.update({ hungry }, { id })
    .then((results) => {
      if(results.affectedRows === 0) {
       return res.json({ statusCode: 404 })
      }
      res.json({ statusCode: 200 })
    })
    .catch(err => res.json(err))
});

// TODO: Create a delete route that references cat.delete()
router.delete('/api/cats/:id', (req, res) => {
  cat.remove("id", req.params.id)
  .then((results) => {
    if(results.affectedRows === 0) {
     return res.json({ statusCode: 404 })
    }
    res.json({ statusCode: 200 })
  })
  .catch(err => res.json(err))
})

// Export routes for server.js to use.
module.exports = router;
