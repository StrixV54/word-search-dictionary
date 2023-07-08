import { createContext, useEffect, useState } from "react";
import { initialState, reducer } from "../components/reducer/reducer.jsx";
import { initialState, reducer } from "../components/reducer/actions.jsx";

const NoteContext = createContext();

const getCurrentTime = () => {
  new Date().toLocaleString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour12: true,
  });
};

const NoteProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const value = {
    todoList: state.todoList,
    addTodoItem: (todoItemLabel) => {
      dispatch({ type: actions.ADD_TODO_ITEM, todoItemLabel });
    },
    removeTodoItem: (todoItemId) => {
      dispatch({ type: actions.REMOVE_TODO_ITEM, todoItemId });
    },
    markAsCompleted: (todoItemId) => {
      dispatch({ type: actions.TOGGLE_COMPLETED, todoItemId });
    },
  };

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
};

export { SwitchContext, SwitchProvider };
