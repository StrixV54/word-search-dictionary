import actions from "./actions.jsx";

const user = JSON.parse(localStorage.getItem("user"));
// console.log(user);

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const reducerAuth = (state = initialState, action) => {
  switch (action.type) {
    case actions.AUTHENTICATED: {
      return { ...state, user: action.user, isSuccess: true };
    }
    case actions.NOTAUTHENTICATED: {
      return { ...state, user: null, isSuccess: false };
    }
    case actions.AUTHERROR: {
      return { ...state, isError: true, message: action.message };
    }
    case actions.RESET: {
      return {
        ...state,
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: "",
      };
    }
    case actions.RESETUSER: {
      return { ...state, user: null };
    }
    default:
      return state;
  }
};

export default reducerAuth;
