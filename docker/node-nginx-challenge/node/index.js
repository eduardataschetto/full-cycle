const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}
const mysql = require('mysql')
var random_name = require('node-random-name');
const connection = mysql.createConnection(config)

connection.query(`CREATE TABLE IF NOT EXISTS people(id int not null auto_increment, name varchar(255), primary key(id))`);

getPeople = () =>{
  return new Promise((resolve, reject)=>{
      connection.query('SELECT * FROM people LIMIT 100',  (error, elements)=>{
          if(error){
              return reject(error);
          }
          return resolve(elements);
      });
  });
};

insertPerson = () =>{
  return new Promise((resolve, reject)=>{
      connection.query(`INSERT INTO people(name) VALUES (?)`, random_name(), (error, elements)=>{
          if(error){
              return reject(error);
          }
          return resolve(elements);
      });
  });
};


app.get('/', async (req, res) => {
  await insertPerson() 
  const results = await getPeople() 

    let table = '<table>';
      table += '<tr><th>#</th><th>Name</th></tr>';
      for(let people of results) {      
        table += `<tr><td>${people.id}</td><td>${people.name}</td></tr>`;
      }
  
      table += '</table>';    
      res.send('<h1>Full Cycle Rocks!</h1>' + table);
})

app.listen(port, () => {
    console.log('running at port ' + port)
})