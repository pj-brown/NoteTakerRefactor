// Import MySQL connection.
const connection = require("./connection.js");

// ORM class for SQL statement functions.
class ORM {
  constructor(connection){
    this.connection = connection;
  }

getNotes() {
  const queryString = `SELECT * FROM note`;
  // return statement allows to use promises (in controller)
  // this.connection.query <- query the database passing the queryString defined above
  return this.connection.query(queryString)
}

create(title, body) {
  const queryString = `INSERT INTO note (title, text) VALUES (?, ?)`;
  return this.connection.query(queryString, [title, body])
}

remove(id) {
  const queryString = `DELETE FROM note WHERE id=?`;
  return this.connection.query(queryString, [id])
}

module.exports = new ORM(connection);