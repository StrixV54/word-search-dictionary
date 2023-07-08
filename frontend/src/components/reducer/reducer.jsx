import { actions } from "./actions.jsx";

const initialStateTab = {
  TabList: [],
};

const reducerTab = (state, action) => {
  switch (action.type) {
    case actions.ADD_ITEM:
      const currentTimestamp = getCurrentTime;
      const inputValue = state;
      return [
          ...state,
          {
            id: uuid(),
            text: inputValue,
            time: currentTimestamp,
          },
        ];
    case actions.ADD_TAB:
      return {
        todoList: [
          ...state.todoList,
          {
            id: new Date().valueOf(),
            label: action.
            completed: false,
          },
        ],
      };
    case actions.REMOVE_ITEM: {
      const filteredTodoItem = state.todoList.filter(
        (todoItem) => todoItem.id !== action.todoItemId
      );
      return { todoList: filteredTodoItem };
    }
    case actions.REMOVE_TAB: {
      const filteredTodoItem = state.todoList.filter(
        (todoItem) => todoItem.id !== action.todoItemId
      );
      return { todoList: filteredTodoItem };
    }
    case actions.TOGGLE_TAB: {
      const updatedTodoList = state.todoList.map((todoItem) =>
        todoItem.id === action.todoItemId
          ? { ...todoItem, completed: !todoItem.completed }
          : todoItem
      );
      return { todoList: updatedTodoList };
    }
    default:
      return state;
  }
};
const initialStateNote = {
  NoteList: [],
};

const reducerNote = (state, action) => {
  switch (action.type) {
    case actions.ADD_ITEM:
      return {
        todoList: [
          ...state.todoList,
          {
            id: new Date().valueOf(),
            label: action.todoItemLabel,
            completed: false,
          },
        ],
      };
    case actions.ADD_TAB:
      return {
        todoList: [
          ...state.todoList,
          {
            id: new Date().valueOf(),
            label: action.todoItemLabel,
            completed: false,
          },
        ],
      };
    case actions.REMOVE_ITEM: {
      const filteredTodoItem = state.todoList.filter(
        (todoItem) => todoItem.id !== action.todoItemId
      );
      return { todoList: filteredTodoItem };
    }
    case actions.REMOVE_TAB: {
      const filteredTodoItem = state.todoList.filter(
        (todoItem) => todoItem.id !== action.todoItemId
      );
      return { todoList: filteredTodoItem };
    }
    case actions.TOGGLE_TAB: {
      const updatedTodoList = state.todoList.map((todoItem) =>
        todoItem.id === action.todoItemId
          ? { ...todoItem, completed: !todoItem.completed }
          : todoItem
      );
      return { todoList: updatedTodoList };
    }
    default:
      return state;
  }
};

export { initialState, reducer };
