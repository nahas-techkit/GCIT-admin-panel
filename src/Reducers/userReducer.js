export function userReducer(state, action) {
    switch (action.type) {
      case "LOGIN":
        return { ...state, loading: true, error: "" };
      case "LOGIN_SUCCESS":
        return {
          ...state,
          loading: false,
          user: action.payload,
          error: "",
        };
      case "LOGIN_ERROR":
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  }