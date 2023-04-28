export function sponserReducer(state, action) {
    switch (action.type) {
      case "SPONSER_REQUEST":
        return { ...state, loading: true, error: "" };
      case "SPONSER_SUCCESS":
        return {
          ...state,
          loading: false,
          sponser: action.payload,
          error: "",
        };
      case "SPONSER_ERROR":
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  }