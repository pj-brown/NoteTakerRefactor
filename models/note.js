const orm = require("../config/orm.js");

class Note {
  // Read method
  getNotes() {
    return orm.getNotes()
  }
  // Create method
  // note.create in controller feeds the columns and the req.body name and hungry feeds the values parameter
  create(title, body) {
    return orm.create(title, body)
  }

  // Remove method that references orm.remove
  remove(id){
    return orm.remove(id);
  }
};

module.exports = new Note();
