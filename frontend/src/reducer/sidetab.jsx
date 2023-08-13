import actions from "./actions.jsx";

const initialState = {
  tabList: [],
  activeTab: null,
  isActiveDeleted: false,
  isLoading: false,
};

const reducerTab = (state = initialState, action) => {
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
    case actions.ISACTIVEDELETED: {
      return { ...state, isActiveDeleted: true };
    }
    case actions.FETCH_TABS: {
      return { ...state, tabList: [...action.newList] };
    }
    case actions.RESETACTIVE: {
      return { ...state, isActiveDeleted: false };
    }
    case actions.ISLOADING: {
      return { ...state, isLoading: true };
    }
    case actions.ISLOADED: {
      return { ...state, isLoading: false };
    }
    default:
      return state;
  }
};

export default reducerTab;
