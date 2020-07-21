const orm = require("../config/orm.js");

class Note {
  selectAll() {
    //3)
    return orm.selectAll("notes")
  }
  // CREATE METHOD
  // note.create in controller feeds the columns and the req.body name and hungry feeds the values parameter
  create(columns, values) {
    return orm.create("notes", columns, values)
  }
  update(objColVals, condition) {
    return orm.update("notes", objColVals, condition)
  }
  // TODO: create a remove method that references orm.delete
  remove(objColVals, value){
    return orm.remove("notes,", objColVals, value);
  }
};

module.exports = new Note();
