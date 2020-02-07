import React, {useState} from 'react';

// We use Wildcard API (https://github.com/reframejs/wildcard-api) to access
// the backend's database.
import {endpoints} from '@wildcard-api/client';

export default {
  route: '/', view: TodoList,
  title: 'My Todo List',
  addInitialProps,
};

async function addInitialProps({isNodejs}) {
  const initialTodos = await endpoints.getTodos();
  return {initialTodos};
}

function TodoList({initialTodos}) {
  const [todos, setTodos] = useState(initialTodos);

  return (
    <>
      To-dos:
      <ul>
        { todos.map(todo =>
          <li key={todo.id}>
            {todo.text}
          </li>
        ) }
        <li>
          <NewTodo setTodos={setTodos}/>
        </li>
      </ul>
    </>
  );
}

function NewTodo({setTodos}) {
  const [text, setText] = useState('');

  return (
    <form onSubmit={createTodo}>
      <input type="text" onChange={ev => setText(ev.target.value)} value={text} autoFocus/>
      {' '}
      <button type="submit">New To-do</button>
    </form>
  );

  async function createTodo(ev) {
    ev.preventDefault();
    if( !text ) {
      return;
    }
    setText('');
    await endpoints.createTodo(text);
    const todos = await endpoints.getTodos();
    setTodos(todos);
  }
}
