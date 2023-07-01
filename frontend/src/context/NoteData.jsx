import { createContext, useEffect, useState } from "react";

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
  // useEffect(() => {
  //   localStorage.setItem("WordNotes", JSON.stringify(wordNotes));
  // }, [wordNotes]);

  return (
    <NoteContext.Provider
      value={[activeTab, setActiveTab, noteTab, setNoteTab, noteData]}
    >
      {children}
    </NoteContext.Provider>
  );
};

export { SwitchContext, SwitchProvider };
