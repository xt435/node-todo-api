var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');


var {mongoos} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());

// app.post('/todos', (req, res) => {
//   console.log(req.body);
// });

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  var id = req.param.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.find().then((todos) => {
    if (!todos) {
      return res.status(404).send();
    }
    res.send({todos});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};

// var newUser = new User({
//   email: '  xt435@nyu.edu '
// });

// var newTodo = new Todo({
//   text: 'Walk my dog',
//   completed: true,
//   completedAt: 6
// });

// var newTodo = new Todo({
//
// });

// newUser.save().then((doc) => {
//   // console.log('Saved todo', doc);
//   console.log(JSON.stringify(doc, undefined, 2));
// }, (e) => {
//   console.log('Unable to save user');
// });
