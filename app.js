import express from "express";
import db from "./db/db";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = 5000 || process.env.PORT;

app.get("/api/v1/todos", (req, res) =>
  res.status(200).send({
    success: "true",
    message: "Todos recieved nicely",
    todos: db
  })
);

app.get("/api/v1/todos/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  const todo = db.find(todo => todo.id === id);
  if (todo) {
    return res.status(200).send({
      success: "true",
      message: "succes message",
      todo
    });
  } else {
    return res.status(404).send({
      success: "false",
      message: "nahh"
    });
  }
});

app.post("/api/v1/todos", (req, res) => {
  if (!req.body.title || !req.body.description) {
    return res.status(404).send({
      success: "false",
      message: "required t and d"
    });
  } else {
    const todo = {
      id: db[db.length - 1].id + 1,
      title: req.body.title,
      description: req.body.description
    };
    db.push(todo);
    return res.status(200).send({
      success: "true",
      message: "todo added",
      added
    });
  }
});

// app.delete("/api/v1/todos/:id", (req, res) => {

//  db.map((todo, index) => {
//    if (todo.id === id) {

//    }
//  })
// })

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
