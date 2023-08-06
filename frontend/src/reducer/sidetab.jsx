import actions from "./actions.jsx";

const initialStateTab = {
  tabList: [],
  activeTab: null,
};

const reducerTab = (state = initialStateTab, action) => {
  switch (action.type) {
    case actions.ADD_TAB: {
      const data = { id: action.id, tabname: action.text, time: action.time };
      return { ...state, tabList: [...state.tabList, data] };
    }
    case actions.REMOVE_TAB: {
      return {
        ...state,
        tabList: [
          ...state.tabList.filter((todoItem) => todoItem.id !== action.id),
        ],
      };
    }
    case actions.ACTIVE_TAB: {
      return { ...state, activeTab: action.text };
    }
    case actions.FETCH_TABS: {
      return { ...state, tabList: [...action.newList] };
    }
    default:
      return state;
  }
};

export default reducerTab;
