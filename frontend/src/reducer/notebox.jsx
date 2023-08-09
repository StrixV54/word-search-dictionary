import actions from "./actions.jsx";

const initialState = {
  noteList: [],
};

const reducerNote = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_ITEM:
      return {
        noteList: [
          ...state.noteList,
          {
            id: action.id,
            text: action.text,
            time: action.time,
          },
        ],
      };
    case actions.REMOVE_ITEM: {
      return {
        noteList: [
          ...state.noteList.filter((todoItem) => todoItem.id !== action.id),
        ],
      };
    }
    case actions.FETCH_ITEMS: {
      return { noteList: [...action.newList] };
    }
    default:
      return state;
  }
};

export default reducerNote;
