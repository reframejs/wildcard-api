// Proto DB is a small module that persists a JavaScript object to disk.
// This persisted object acts as a simple database for quick prototyping.
// You should eventually replace Proto DB with a proper database.
const proto = require('@brillout/proto-db');

const data = proto.load(__dirname+'/data.json');

module.exports = {getTodos, createTodo};

async function getTodos() {
  return data.todos;
}

async function createTodo(text) {
  const id = proto.getUUID();
  const todo = {id, text};
  data.todos.push(todo);
  await data._save();
  return todo;
}
