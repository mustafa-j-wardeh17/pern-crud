import React, { Fragment } from "react";
import "./App.css";

//components

import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";

function App() {
  return (
    <Fragment>
      <div className="p-12">
        <InputTodo />
        <ListTodos />
      </div>s
    </Fragment>
  );
}

export default App;