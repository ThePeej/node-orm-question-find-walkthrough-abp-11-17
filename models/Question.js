const db = require("../config/db")

class Question{
  static CreateTable() {
    return new Promise(function(resolve){
      const sql = `CREATE TABLE questions (
        id INTEGER PRIMARY KEY,
        content TEXT
      )`

      db.run(sql, function(){
        resolve("questions table created")
      })
    })
  }

  constructor(content){
    this.content = content
  }

  insert(){
    const self = this
    const sql = `INSERT INTO questions (content) VALUES (?)`
    return new Promise(function(resolve){
      db.run(sql, [self.content], function(err, result){
        self.id = this.lastID
        resolve(self)
      })
    })
  }

  static Find(id){
    const sql = `SELECT * FROM questions WHERE id = ? LIMIT 1`

    console.log(`Querying for user id ${id}...`)

    return new Promise(function(resolve){
      db.get(sql, [id], function(err, resultRow){
        console.log(`...found ${JSON.stringify(resultRow)}!`)

        const question = new Question(resultRow.question)
        question.id = resultRow.id

        resolve(question)
      })
    })
  }

}

module.exports = Question;
