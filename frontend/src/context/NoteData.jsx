// import { createContext, useEffect, useState, useReducer } from "react";
// import { initialState, reducer } from "../components/reducer/reducer.jsx";
// import { actions} from "../components/reducer/actions.jsx";

// const NoteContext = createContext();

// const getCurrentTime = () => {
//   new Date().toLocaleString(undefined, {
//     hour: "2-digit",
//     minute: "2-digit",
//     day: "numeric",
//     month: "numeric",
//     year: "numeric",
//     hour12: true,
//   });
// };

// const NoteProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   useEffect(() => {
//     const data = JSON.parse(localStorage.getItem("TabsData"));
//     if (data) {
//       const noteTab = data[0]?.text;
//       toggleTab(noteTab);
//       const data1 = JSON.parse(localStorage.getItem(noteTab));
//       if (data1) setNoteData(data1);
//     }
//   }, []);

//   useEffect(() => {
//     if (noteTab.length !== 0) {
//       if (activeTab) localStorage.setItem(activeTab, JSON.stringify(noteData));
//       localStorage.setItem("TabsData", JSON.stringify(noteTab));
//     }
//   }, [noteTab, noteData]);

//   const value = {
//     todoList: state.todoList,
//     addTodoItem: (itemLabel) => {
//       dispatch({ type: actions.ADD_TODO_ITEM, todoItemLabel });
//     },
//     removeTodoItem: (itemId) => {
//       dispatch({ type: actions.REMOVE_TODO_ITEM, todoItemId });
//     }
//   };

//   return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
// };

// export { NoteContext, NoteProvider };
