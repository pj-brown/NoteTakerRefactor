// Import MySQL connection.
const connection = require("../config/connection.js");

// ORM class for all our SQL statement functions.
class ORM {
  constructor(connection){
    this.connection = connection;
  }

  // Helper function for SQL syntax.
  // Let's say we want to pass 3 values into the mySQL query.
  // In order to write the query, we need 3 question marks.
  // This helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
  // ["?", "?", "?"].join(', ') => "?, ?, ?";
  printQuestionMarks(numberOfValues){
    const questionMarks = [];

    for (var i = 0; i < numberOfValues; i++) {
      questionMarks.push("?");
    }

    return questionMarks.join(', ');
  }

  selectAll(table) {
    // SELECT * FROM cats
    const queryString = 'SELECT * FROM  ??';
    // 4)
    // database call where we pass in a sql query
    // returning a promise
    return this.connection.query(queryString, [table])
  }

  create(table, columns, values) {
    // `INSERT INTO ?? "name", "hungry" VALUES ?, ? 
  
    const queryString = `INSERT INTO ?? (${columns.join(', ')}) VALUES (${this.printQuestionMarks(values.length)})`;

    console.log(queryString);

    // if we do not include a return statement before the .then in cats controller we can not use a promise
    // 
    return this.connection.query(queryString, [table, ...values]) // '...' spread operator - spreads the contents in the values array inside the overall array to the values feeding question marks.
    // use spread operator to avoid nested arrays
  }


  // Method that will allow us to remove a row from the table
  remove(table, objColVals, value){
    var queryString = `DELETE FROM ?? WHERE ?? = ?`
    console.log(queryString);
    return this.connection.query(queryString, [table, objColVals, value])
  }
};

// Export the orm object for the model (cat.js).
module.exports = new ORM(connection);

const test = new ORM(connection);