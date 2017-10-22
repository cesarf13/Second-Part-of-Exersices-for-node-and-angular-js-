// Load mongoose package
var mongoose = require('mongoose');
var todos = require('./routes/todos');
app.use('/todos', todos);
// Connect to MongoDB and create/use database called todoAppTest
mongoose.connect('mongodb://localhost:27017/todoAppTest');
// Create a schema
var TodoSchema = new mongoose.Schema({
  name: String,
  completed: Boolean,
  note: String,
  updated_at: { type: Date, default: Date.now },
});
// Create a model based on the schema
var Todo = mongoose.model('Todo', TodoSchema);


Todo.create({name: 'Create something with Mongoose', completed: true, note: 'this is one'}, function(err, todo){
  if(err) console.log(err);
  else console.log(todo);
}); 

// Create a todo in memory
var todo = new Todo({name: 'Master NodeJS', completed: false, note: 'Getting there...'});
// Save it to database
todo.save(function(err){
  if(err)
    console.log(err);
  else
    console.log(todo);
});

Todo.find(function (err, todos) {
  if (err) return console.error(err);
  console.log(todos)
});
app.use(function (req, res, next) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log('Client IP:', ip);
  next();
});
app.use('/todos/:id', function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});
app.get('/todos/:id', function (req, res, next) {
  Todo.findById(req.params.id, function(err, todo){
    if(err) res.send(err);
    res.json(todo);
  });
});
