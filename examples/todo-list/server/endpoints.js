const {endpoints} = require('@wildcard-api/server');
const db = require('../db');

endpoints.getTodos = async function() {
  const todos = await db.getTodos();
  return todos;
};

endpoints.createTodo = async function(text) {
  if( !text ){
    return;
  }
  const todo = await db.createTodo(text);
  return todo;
};
