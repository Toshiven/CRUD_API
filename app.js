const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = process.env.port || 5000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

//mySQL
const pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : '',
  database        : 'crud'
});

//Get all members
app.get('', (req, res) => {
  pool.getConnection((err, connection) => {
    if(err) throw err
    console.log(`connected as id ${connection.threadId}`);

    //query
    connection.query('SELECT * from members', (err, rows) =>{
      connection.release(); //return the connection to pool

      if(!err){
        res.send(rows);
      } else {
        console.log(err);
      }
    })
  })
});

// Listen on environment port or 5000
app.listen(port, () => console.log(`listen on port ${port}`));